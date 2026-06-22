BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO users (name, email, password)
VALUES (
    'Demo User',
    'demo@jobtracker.local',
    crypt('demo12345', gen_salt('bf', 10))
)
ON CONFLICT (email)
DO UPDATE SET
    name = EXCLUDED.name,
    password = EXCLUDED.password;

DELETE FROM jobs
WHERE user_id = (
    SELECT id
    FROM users
    WHERE email = 'demo@jobtracker.local'
);

INSERT INTO jobs (
    company,
    role,
    status,
    application_date,
    user_id
)
SELECT
    demo_jobs.company,
    demo_jobs.role,
    demo_jobs.status,
    demo_jobs.application_date,
    users.id
FROM users
CROSS JOIN (
    VALUES
        (
            'OpenAI',
            'Junior Developer',
            'Applied',
            DATE '2026-06-03'
        ),
        (
            'Tech Solutions',
            'Backend Intern',
            'Interview',
            DATE '2026-06-10'
        ),
        (
            'Data Corp',
            'Data Analyst Intern',
            'Offer',
            DATE '2026-06-15'
        ),
        (
            'Web Studio',
            'Frontend Developer',
            'Rejected',
            DATE '2026-06-18'
        )
) AS demo_jobs (
    company,
    role,
    status,
    application_date
)
WHERE users.email = 'demo@jobtracker.local';

COMMIT;