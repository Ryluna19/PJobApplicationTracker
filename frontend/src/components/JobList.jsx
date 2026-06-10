// Lista de jobs
function JobList({ jobs, onDelete, onUpdate }) {
    return (
        <div>
            <h2>Minhas Candidaturas</h2>

            {jobs.map((job) => (
                <div className="job-card" key={job.id}>
                    <h3>{job.company}</h3>

                    <p>Cargo: {job.role}</p>
                    <p>
                        Data: {
                            job.application_date
                                ? new Date(job.application_date)
                                    .toLocaleDateString("pt-BR")
                                : ""
                        }
                    </p>
                    <p className={`status ${job.status.toLowerCase()}`}>
                        Status: {job.status}
                    </p>

                    <button onClick={() => onUpdate(job.id, "Applied")}>
                        Applied
                    </button>

                    <button onClick={() => onUpdate(job.id, "Interview")}>
                        Interview
                    </button>

                    <button onClick={() => onUpdate(job.id, "Offer")}>
                        Offer
                    </button>

                    <button onClick={() => onUpdate(job.id, "Rejected")}>
                        Rejected
                    </button>

                    <button onClick={() => onDelete(job.id)}>
                        Excluir
                    </button>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default JobList;