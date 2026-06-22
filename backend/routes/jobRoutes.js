const express = require("express");

const auth = require("../middleware/auth");
const pool = require("../database/db");

const router = express.Router();

router.post("/jobs", auth, async (req, res) => {
    try {
        const { company, role, status, application_date } = req.body;
        const userId = req.user.userId;

        const result = await pool.query(
            `INSERT INTO jobs (company, role, status, application_date, user_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [company, role, status, application_date, userId]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao criar job");
    }
});

router.get("/jobs", auth, async (req, res) => {
    try {
        const userId = req.user.userId;

        const result = await pool.query(
            "SELECT * FROM jobs WHERE user_id = $1 ORDER BY id ASC",
            [userId]
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar jobs");
    }
});

router.put("/jobs/:id", auth, async (req, res) => {
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

router.delete("/jobs/:id", auth, async (req, res) => {
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

module.exports = router;