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
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
            [name, email, hashedPassword]
        );

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao registrar usuário");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(400).send("Usuário não encontrado");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send("Senha incorreta");
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erro no login");
    }
});



app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});