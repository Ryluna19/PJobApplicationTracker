require("dotenv").config();

const auth = require("./middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("./database/db");
const express = require("express");
const app = express();
app.use(express.json());

/* HEALTH CHECK */
app.get("/", (req, res) => {
    res.send("API rodando 🚀");
});

const cors = require("cors");

app.use(cors());
app.use(express.json());

/* CREATE */
app.post("/jobs", auth, async (req, res) => {
    try {
        console.log(req.body);
        const {
            company,
            role,
            status,
            application_date
        } = req.body;
        const userId = req.user.userId;

        const result = await pool.query(
            `INSERT INTO jobs (company, role, status, application_date, user_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [company, role, status, application_date, userId]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar job");
    }
});

/* READ */
app.get("/jobs", auth, async (req, res) => {
    const userId = req.user.userId;

    const result = await pool.query(
        "SELECT * FROM jobs WHERE user_id = $1 ORDER BY id ASC",
        [userId]
    );

    res.json(result.rows);
});

/* UPDATE */
app.put("/jobs/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.user.userId;

        const result = await pool.query(
            `UPDATE jobs
             SET status = $1
             WHERE id = $2 AND user_id = $3
             RETURNING *`,
            [status, id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Job não encontrado");
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atualizar job");
    }
});

/* DELETE */
app.delete("/jobs/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const result = await pool.query(
            "DELETE FROM jobs WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Job não encontrado");
        }

        res.send("Job removido");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao deletar job");
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Preencha nome, email e senha."
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            error: "A senha precisa ter pelo menos 6 caracteres."
        });
    }

    try {
        const userExists = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(409).json({
                error: "Este email já está cadastrado."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, hashedPassword]
        );

        return res.status(201).json({
            message: "Conta criada com sucesso."
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro interno ao criar conta."
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Preencha email e senha."
        });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Email ou senha inválidos."
            });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Email ou senha inválidos."
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Login realizado com sucesso.",
            token
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Erro interno ao realizar login."
        });
    }
});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});