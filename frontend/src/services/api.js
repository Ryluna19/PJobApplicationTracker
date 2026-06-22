const API_URL = "http://localhost:3000";

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const message =
            typeof data === "object" && data !== null
                ? data.error || data.message
                : data;

        throw new Error(message || "Não foi possível concluir a operação.");
    }

    return data;
}

export function loginUser(email, password) {
    return request("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
}

export function registerUser(name, email, password) {
    return request("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });
}

export function getJobs(token) {
    return request("/jobs", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function createJob(token, company, role, status, applicationDate) {
    return request("/jobs", {
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
}

export function updateJobStatus(token, id, status) {
    return request(`/jobs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    });
}

export function deleteJob(token, id) {
    return request(`/jobs/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}