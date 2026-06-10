import { useState } from "react";

function JobForm({ onCreate }) {
    // Estados do formulário
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");
    const [applicationDate, setApplicationDate] = useState("");

    return (
        <div className="job-form">
            <h2>Novo Job</h2>

            <input
                value={company}
                placeholder="Empresa"
                onChange={(e) => setCompany(e.target.value)}
            />

            <input
                value={role}
                placeholder="Cargo"
                onChange={(e) => setRole(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">
                    Selecione um status
                </option>

                <option value="Applied">
                    Applied
                </option>

                <option value="Interview">
                    Interview
                </option>

                <option value="Offer">
                    Offer
                </option>

                <option value="Rejected">
                    Rejected
                </option>
            </select>
            <input
                type="date"
                value={applicationDate}
                onChange={(e) =>
                    setApplicationDate(e.target.value)
                }
            />

            <button
                onClick={() => {
                    if (!company || !role || !status) {
                        return;
                    }

                    onCreate(company, role, status, applicationDate);

                    setCompany("");
                    setRole("");
                    setStatus("");
                    setApplicationDate("");
                }}
            >
                Criar Job
            </button>
        </div>
    );
}

export default JobForm;