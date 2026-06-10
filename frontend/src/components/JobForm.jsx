import { useState } from "react";

function JobForm({ onCreate }) {
    // Estados do formulário
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");
    const [applicationDate, setApplicationDate] = useState("");

    // Envia os dados do formulário para criação de uma nova candidatura
    function handleSubmit(e) {
        e.preventDefault();

        if (!company.trim() || !role.trim() || !applicationDate) {
            alert("Preencha empresa, cargo e data da candidatura.");
            return;
        }

        onCreate(
            company.trim(),
            role.trim(),
            status,
            applicationDate
        );

        setCompany("");
        setRole("");
        setStatus("Applied");
        setApplicationDate("");
    }

    return (
        <form className="job-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2>New Application</h2>
                <p>Add a new opportunity to your pipeline.</p>
            </div>

            <div className="form-grid">
                <input
                    value={company}
                    placeholder="Company"
                    onChange={(e) => setCompany(e.target.value)}
                />

                <input
                    value={role}
                    placeholder="Role"
                    onChange={(e) => setRole(e.target.value)}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <input
                    type="date"
                    value={applicationDate}
                    onChange={(e) =>
                        setApplicationDate(e.target.value)
                    }
                />
            </div>

            <button className="primary-btn" type="submit">
                Add Application
            </button>
        </form>
    );
}

export default JobForm;