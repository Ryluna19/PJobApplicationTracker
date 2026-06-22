import { createRequire } from "node:module";
import {
afterEach,
beforeEach,
describe,
expect,
it,
vi
} from "vitest";
import request from "supertest";

// Permite importar arquivos CommonJS dentro deste arquivo de teste ESM.
const require = createRequire(import.meta.url);

// Chave usada somente para criar JWTs válidos durante os testes.
process.env.JWT_SECRET = "job-tracker-test-secret";

const createApp = require("../app");
const jwt = require("jsonwebtoken");

// Simula o pool do PostgreSQL sem acessar o banco real.
function createFakePool() {
return {
query: vi.fn()
};
}

// Cria um token para representar um usuário autenticado.
function createToken(userId = 1) {
return jwt.sign(
{ userId },
process.env.JWT_SECRET,
{ expiresIn: "1h" }
);
}

let app;
let fakePool;

beforeEach(() => {
fakePool = createFakePool();
app = createApp(fakePool);


// Evita que erros simulados de banco poluam o terminal dos testes.
vi.spyOn(console, "error").mockImplementation(() => {});


});

afterEach(() => {
vi.restoreAllMocks();
});

describe("GET /jobs", () => {
it("returns 401 when no token is provided", async () => {
const response = await request(app)
.get("/jobs");


    expect(response.status).toBe(401);
    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 401 when the token is malformed", async () => {
    const response = await request(app)
        .get("/jobs")
        .set("Authorization", "Bearer");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
        error: "Token mal formatado"
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 401 when the token is invalid", async () => {
    const response = await request(app)
        .get("/jobs")
        .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns only the jobs from the authenticated user", async () => {
    const token = createToken(7);

    const jobs = [
        {
            id: 1,
            company: "OpenAI",
            role: "Junior Developer",
            status: "Applied",
            application_date: "2026-06-22",
            user_id: 7
        }
    ];

    fakePool.query.mockResolvedValueOnce({
        rows: jobs
    });

    const response = await request(app)
        .get("/jobs")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(jobs);

    // A busca deve usar o userId extraído do JWT.
    expect(fakePool.query).toHaveBeenCalledWith(
        "SELECT * FROM jobs WHERE user_id = $1 ORDER BY id ASC",
        [7]
    );
});

it("returns 500 when the database query fails", async () => {
    const token = createToken(7);

    fakePool.query.mockRejectedValueOnce(
        new Error("Database connection failed")
    );

    const response = await request(app)
        .get("/jobs")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
        error: "Erro ao buscar candidaturas."
    });
});


});

describe("POST /jobs", () => {
it("returns 400 when the company is empty", async () => {
const token = createToken(7);


    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "",
            role: "Junior Developer",
            status: "Applied",
            application_date: "2026-06-22"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Empresa é obrigatória."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the company is longer than 100 characters", async () => {
    const token = createToken(7);

    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "A".repeat(101),
            role: "Junior Developer",
            status: "Applied",
            application_date: "2026-06-22"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Empresa deve ter no máximo 100 caracteres."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the role is empty", async () => {
    const token = createToken(7);

    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "OpenAI",
            role: "",
            status: "Applied",
            application_date: "2026-06-22"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Cargo é obrigatório."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the role is longer than 100 characters", async () => {
    const token = createToken(7);

    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "OpenAI",
            role: "A".repeat(101),
            status: "Applied",
            application_date: "2026-06-22"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Cargo deve ter no máximo 100 caracteres."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the job status is invalid", async () => {
    const token = createToken(7);

    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "OpenAI",
            role: "Junior Developer",
            status: "Pending",
            application_date: "2026-06-22"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Status da candidatura inválido."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the application date has an invalid format", async () => {
    const token = createToken(7);

    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "OpenAI",
            role: "Junior Developer",
            status: "Applied",
            application_date: "22-06-2026"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Informe uma data de candidatura válida."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the application date does not exist", async () => {
    const token = createToken(7);

    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "OpenAI",
            role: "Junior Developer",
            status: "Applied",
            application_date: "2026-02-30"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Informe uma data de candidatura válida."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("creates a job for the authenticated user", async () => {
    const token = createToken(7);

    const createdJob = {
        id: 10,
        company: "OpenAI",
        role: "Junior Developer",
        status: "Applied",
        application_date: "2026-06-22",
        user_id: 7
    };

    fakePool.query.mockResolvedValueOnce({
        rows: [createdJob]
    });

    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "OpenAI",
            role: "Junior Developer",
            status: "Applied",
            application_date: "2026-06-22"
        });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdJob);

    expect(fakePool.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO jobs"),
        [
            "OpenAI",
            "Junior Developer",
            "Applied",
            "2026-06-22",
            7
        ]
    );
});

it("returns 500 when the database fails while creating a job", async () => {
    const token = createToken(7);

    fakePool.query.mockRejectedValueOnce(
        new Error("Database connection failed")
    );

    const response = await request(app)
        .post("/jobs")
        .set("Authorization", `Bearer ${token}`)
        .send({
            company: "OpenAI",
            role: "Junior Developer",
            status: "Applied",
            application_date: "2026-06-22"
        });

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
        error: "Erro ao criar candidatura."
    });
});


});

describe("PUT /jobs/:id", () => {
it("returns 400 when the job id is invalid", async () => {
const token = createToken(7);


    const response = await request(app)
        .put("/jobs/invalid-id")
        .set("Authorization", `Bearer ${token}`)
        .send({
            status: "Interview"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "ID da candidatura inválido."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 400 when the job status is invalid", async () => {
    const token = createToken(7);

    const response = await request(app)
        .put("/jobs/10")
        .set("Authorization", `Bearer ${token}`)
        .send({
            status: "Pending"
        });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
        error: "Status da candidatura inválido."
    });

    expect(fakePool.query).not.toHaveBeenCalled();
});

it("returns 404 when the job is not available to the authenticated user", async () => {
    const token = createToken(7);

    fakePool.query.mockResolvedValueOnce({
        rows: []
    });

    const response = await request(app)
        .put("/jobs/10")
        .set("Authorization", `Bearer ${token}`)
        .send({
            status: "Interview"
        });

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
        error: "Candidatura não encontrada."
    });

    // A atualização deve filtrar pelo ID da vaga e pelo usuário autenticado.
    expect(fakePool.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE jobs"),
        ["Interview", 10, 7]
    );
});

it("updates the job status for the authenticated user", async () => {
    const token = createToken(7);

    const updatedJob = {
        id: 10,
        company: "OpenAI",
        role: "Junior Developer",
        status: "Interview",
        application_date: "2026-06-22",
        user_id: 7
    };

    fakePool.query.mockResolvedValueOnce({
        rows: [updatedJob]
    });

    const response = await request(app)
        .put("/jobs/10")
        .set("Authorization", `Bearer ${token}`)
        .send({
            status: "Interview"
        });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedJob);

    expect(fakePool.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE jobs"),
        ["Interview", 10, 7]
    );
});

it("returns 500 when the database fails while updating a job", async () => {
    const token = createToken(7);

    fakePool.query.mockRejectedValueOnce(
        new Error("Database connection failed")
    );

    const response = await request(app)
        .put("/jobs/10")
        .set("Authorization", `Bearer ${token}`)
        .send({
            status: "Interview"
        });

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
        error: "Erro ao atualizar candidatura."
    });
});


});

describe("DELETE /jobs/:id", () => {
it("returns 404 when the job is not available to the authenticated user", async () => {
const token = createToken(7);


    fakePool.query.mockResolvedValueOnce({
        rows: []
    });

    const response = await request(app)
        .delete("/jobs/10")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);

    expect(response.body).toEqual({
        error: "Candidatura não encontrada."
    });

    expect(fakePool.query).toHaveBeenCalledWith(
        expect.stringContaining("DELETE FROM jobs"),
        [10, 7]
    );
});

it("deletes a job that belongs to the authenticated user", async () => {
    const token = createToken(7);

    fakePool.query.mockResolvedValueOnce({
        rows: [
            {
                id: 10,
                user_id: 7
            }
        ]
    });

    const response = await request(app)
        .delete("/jobs/10")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
        message: "Candidatura removida com sucesso."
    });

    expect(fakePool.query).toHaveBeenCalledWith(
        expect.stringContaining("DELETE FROM jobs"),
        [10, 7]
    );
});

it("returns 500 when the database fails while deleting a job", async () => {
    const token = createToken(7);

    fakePool.query.mockRejectedValueOnce(
        new Error("Database connection failed")
    );

    const response = await request(app)
        .delete("/jobs/10")
        .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
        error: "Erro ao excluir candidatura."
    });
});


});
