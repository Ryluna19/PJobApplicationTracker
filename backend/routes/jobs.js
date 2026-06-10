
const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    res.json([
        { 
            company: "OpenAI",
            role: "Backend Intern"
        }]) 
});

module.exports = router;
