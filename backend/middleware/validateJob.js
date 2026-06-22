const VALID_STATUS = ["Applied", "Interview", "Offer", "Rejected"];

function isValidDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const date = new Date(`${value}T00:00:00.000Z`);

    return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value
    );
}

function validateJobId(req, res, next) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "ID da candidatura inválido." });
    }

    next();
}

function validateCreateJob(req, res, next) {
    const { company, role, status, application_date } = req.body;

    if (typeof company !== "string" || !company.trim()) {
        return res.status(400).json({ error: "Empresa é obrigatória." });
    }

    if (company.trim().length > 100) {
        return res.status(400).json({
            error: "Empresa deve ter no máximo 100 caracteres."
        });
    }

    if (typeof role !== "string" || !role.trim()) {
        return res.status(400).json({ error: "Cargo é obrigatório." });
    }

    if (role.trim().length > 100) {
        return res.status(400).json({
            error: "Cargo deve ter no máximo 100 caracteres."
        });
    }

    if (!VALID_STATUS.includes(status)) {
        return res.status(400).json({ error: "Status da candidatura inválido." });
    }

    if (!isValidDate(application_date)) {
        return res.status(400).json({
            error: "Informe uma data de candidatura válida."
        });
    }

    req.body.company = company.trim();
    req.body.role = role.trim();

    next();
}

function validateJobStatus(req, res, next) {
    const { status } = req.body;

    if (!VALID_STATUS.includes(status)) {
        return res.status(400).json({ error: "Status da candidatura inválido." });
    }

    next();
}

module.exports = {
    validateJobId,
    validateCreateJob,
    validateJobStatus
};