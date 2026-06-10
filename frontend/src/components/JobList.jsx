// Opções de status
const STATUS_OPTIONS = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected"
];

// Formata data
function formatDate(dateValue) {
    if (!dateValue) {
        return "Sem data";
    }

    return new Date(dateValue).toLocaleDateString("pt-BR", {
        timeZone: "UTC"
    });
}

// Lista de candidaturas
function JobList({ jobs, onDelete, onUpdate }) {
    if (jobs.length === 0) {
        return (
            <div className="empty-state">
                <h2>Nenhuma candidatura encontrada</h2>
                <p>
                    Tente alterar os filtros ou adicione uma nova candidatura.
                </p>
            </div>
        );
    }

    return (
        <section className="job-section">
            <div className="section-header">
                <h2>Minhas Candidaturas</h2>
                <p>
                    Atualize o status e acompanhe seu processo seletivo.
                </p>
            </div>

            <div className="job-list">
                {jobs.map((job) => {
                    const statusClass = `status-${job.status.toLowerCase()}`;

                    return (
                        <div
                            className={`job-card ${statusClass}`}
                            key={job.id}
                        >
                            <span className={`status-badge ${statusClass}`}>
                                {job.status}
                            </span>

                            <h3>{job.company}</h3>

                            <p className="job-role">
                                Cargo: {job.role}
                            </p>

                            <p className="job-meta">
                                Data: {formatDate(job.application_date)}
                            </p>

                            <div className="job-actions">
                                <label>
                                    Status
                                    <select
                                        value={job.status}
                                        onChange={(e) =>
                                            onUpdate(job.id, e.target.value)
                                        }
                                    >
                                        {STATUS_OPTIONS.map((status) => (
                                            <option
                                                key={status}
                                                value={status}
                                            >
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </label>

                                <button
                                    className="delete-btn"
                                    onClick={() => {
                                        const confirmDelete = window.confirm(
                                            "Tem certeza que deseja excluir esta candidatura?"
                                        );

                                        if (confirmDelete) {
                                            onDelete(job.id);
                                        }
                                    }}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default JobList;