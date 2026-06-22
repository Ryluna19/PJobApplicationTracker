CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL CHECK (BTRIM(name) <> ''),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company VARCHAR(100) NOT NULL CHECK (BTRIM(company) <> ''),
    role VARCHAR(100) NOT NULL CHECK (BTRIM(role) <> ''),
    status VARCHAR(20) NOT NULL CHECK (
        status IN ('Applied', 'Interview', 'Offer', 'Rejected')
    ),
    application_date DATE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_jobs_user_id_id
ON jobs (user_id, id);