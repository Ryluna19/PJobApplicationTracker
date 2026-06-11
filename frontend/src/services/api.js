// Configuração da API
const API_URL = "http://localhost:3000";

// Login
export async function loginUser(email, password) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await res.json();

    return data;
}
// Buscar jobs
export async function getJobs(token) {
    const res = await fetch(`${API_URL}/jobs`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}
// Criar job
export async function createJob(token, company, role, status, applicationDate) {
    const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            company,
            role,
            status,
            application_date: applicationDate
        })
    });

    return res.json();
}

export async function deleteJob(token, id) {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.text();
}
export async function updateJobStatus(token, id, status) {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    });

    return res.json();
}

export async function registerUser(name, email, password) {
    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || data.message || "Erro ao criar conta.");
    }

    return data;
}