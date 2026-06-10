const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: "Token ausente" });
    }

    // padrão: "Bearer token"
    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // { userId: ... }

        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}

module.exports = auth;