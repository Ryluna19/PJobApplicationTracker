const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister(req, res, next) {
    const { name, email, password } = req.body;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({ error: "Nome é obrigatório." });
    }

    if (name.trim().length > 100) {
        return res.status(400).json({ error: "Nome deve ter no máximo 100 caracteres." });
    }

    if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
        return res.status(400).json({ error: "Informe um e-mail válido." });
    }

    if (typeof password !== "string" || password.length < 8) {
        return res.status(400).json({
            error: "A senha deve ter pelo menos 8 caracteres."
        });
    }

    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();

    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;

    if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
        return res.status(400).json({ error: "Informe um e-mail válido." });
    }

    if (typeof password !== "string" || !password) {
        return res.status(400).json({ error: "Senha é obrigatória." });
    }

    req.body.email = email.trim().toLowerCase();

    next();
}

module.exports = {
    validateRegister,
    validateLogin
};