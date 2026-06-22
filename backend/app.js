const express = require("express");
const cors = require("cors");

const defaultPool = require("./database/db");
const createAuthRoutes = require("./routes/authRoutes");
const createJobRoutes = require("./routes/jobRoutes");

function createApp(pool = defaultPool) {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("API rodando");
    });

    app.use(createAuthRoutes(pool));
    app.use(createJobRoutes(pool));

    return app;
}

module.exports = createApp;