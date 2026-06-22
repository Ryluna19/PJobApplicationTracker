const express = require("express");
const auth = require("../middleware/auth");
const pool = require("../database/db");
const {
    validateJobId,
    validateCreateJob,
    validateJobStatus
} = require("../middleware/validateJob");

const router = express.Router();

router.post("/jobs", auth, validateCreateJob, async (req, res) => {
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
        res.status(500).json({ error: "Erro ao criar candidatura." });
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
        res.status(500).json({ error: "Erro ao buscar candidaturas." });
    }
});

router.put("/jobs/:id", auth, validateJobId, validateJobStatus, async (req, res) => {
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
            return res.status(404).json({
                error: "Candidatura não encontrada."
            });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar candidatura." });
    }
});

router.delete("/jobs/:id", auth, validateJobId, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const result = await pool.query(
            `DELETE FROM jobs
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Candidatura não encontrada."
            });
        }

        res.json({ message: "Candidatura removida com sucesso." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao excluir candidatura." });
    }
});

module.exports = router;