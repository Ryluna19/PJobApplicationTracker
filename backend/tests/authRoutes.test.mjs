import { createRequire } from "node:module";
import {
beforeEach,
describe,
expect,
it,
vi
} from "vitest";
import request from "supertest";

const require = createRequire(import.meta.url);

process.env.JWT_SECRET = "job-tracker-test-secret";

const createApp = require("../app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Simula o PostgreSQL para que os testes não usem o banco real.
function createFakePool() {
return {
query: vi.fn()
};
}

let app;
let fakePool;

// Cada teste começa com uma aplicação e banco falso novos.
beforeEach(() => {
fakePool = createFakePool();
app = createApp(fakePool);
});

describe("POST /register", () => {
it("returns 400 when the name is empty", async () => {
const response = await request(app)
.post("/register")
.send({
name: "",
email: "[ryan@example.com](mailto:ryan@example.com)",
password: "senha-segura-123"
});


    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Nome é obrigatório."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the name is longer than 100 characters", async () => {
    const response = await request(app)
        .post("/register")
        .send({
            name: "a".repeat(101),
            email: "ryan@example.com",
            password: "senha-segura-123"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Nome deve ter no máximo 100 caracteres."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the e-mail is invalid", async () => {
    const response = await request(app)
        .post("/register")
        .send({
            name: "Ryan",
            email: "email-invalido",
            password: "senha-segura-123"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Informe um e-mail válido."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the password is too short", async () => {
    const response = await request(app)
        .post("/register")
        .send({
            name: "Ryan",
            email: "ryan@example.com",
            password: "1234567"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "A senha deve ter pelo menos 8 caracteres."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("creates a user when the data is valid", async () => {
    fakePool.query.mockResolvedValueOnce({
        rows: [
            {
                id: 1,
                name: "Ryan",
                email: "ryan@example.com"
            }
        ]
    });

    const response = await request(app)
        .post("/register")
        .send({
            name: "Ryan",
            email: "ryan@example.com",
            password: "senha-segura-123"
        });

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
        id: 1,
        name: "Ryan",
        email: "ryan@example.com"
    });

    expect(fakePool.query).toHaveBeenCalledTimes(1);

    expect(fakePool.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO users"),
        [
            "Ryan",
            "ryan@example.com",
            expect.any(String)
        ]
    );
});

it("returns 409 when the e-mail already exists", async () => {
    const duplicateEmailError = new Error(
        "duplicate key value violates unique constraint"
    );

    duplicateEmailError.code = "23505";

    fakePool.query.mockRejectedValueOnce(duplicateEmailError);

    const response = await request(app)
        .post("/register")
        .send({
            name: "Ryan",
            email: "ryan@example.com",
            password: "senha-segura-123"
        });

    expect(response.status).toBe(409);

    expect(response.body).toEqual({
        error: "Já existe uma conta com este e-mail."
    });
});


});

describe("POST /login", () => {
it("returns 400 when the e-mail is invalid", async () => {
const response = await request(app)
.post("/login")
.send({
email: "email-invalido",
password: "senha-segura-123"
});


    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Informe um e-mail válido."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the password is missing", async () => {
    const response = await request(app)
        .post("/login")
        .send({
            email: "ryan@example.com",
            password: ""
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Senha é obrigatória."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 401 when the user does not exist", async () => {
    fakePool.query.mockResolvedValueOnce({
        rows: []
    });

    const response = await request(app)
        .post("/login")
        .send({
            email: "ryan@example.com",
            password: "senha-segura-123"
        });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
        error: "E-mail ou senha inválidos."
    });

    expect(fakePool.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["ryan@example.com"]
    );
});

it("returns 401 when the password is incorrect", async () => {
    const correctPasswordHash = await bcrypt.hash(
        "senha-correta-123",
        10
    );

    fakePool.query.mockResolvedValueOnce({
        rows: [
            {
                id: 1,
                name: "Ryan",
                email: "ryan@example.com",
                password: correctPasswordHash
            }
        ]
    });

    const response = await request(app)
        .post("/login")
        .send({
            email: "ryan@example.com",
            password: "senha-errada-123"
        });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
        error: "E-mail ou senha inválidos."
    });
});

it("returns a valid token when credentials are correct", async () => {
    const password = "senha-segura-123";
    const passwordHash = await bcrypt.hash(password, 10);

    fakePool.query.mockResolvedValueOnce({
        rows: [
            {
                id: 1,
                name: "Ryan",
                email: "ryan@example.com",
                password: passwordHash
            }
        ]
    });

    const response = await request(app)
        .post("/login")
        .send({
            email: "ryan@example.com",
            password
        });

    expect(response.status).toBe(200);

    expect(response.body.token).toEqual(expect.any(String));

    const decodedToken = jwt.verify(
        response.body.token,
        process.env.JWT_SECRET
    );

    expect(decodedToken).toMatchObject({
        userId: 1
    });
});


});
