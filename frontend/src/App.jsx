import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import "./App.css";

import {
  loginUser,
  registerUser,
  getJobs,
  createJob,
  deleteJob,
  updateJobStatus
} from "./services/api";

const STATUS_OPTIONS = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected"
];

function App() {
  // States
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [showRegister, setShowRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Carrega sessão salva
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    async function loadJobs() {
      try {
        const jobsData = await getJobs(token);

        setJobs(jobsData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    }

    loadJobs();
  }, []);

  // Mensagens
  function showMessage(text) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  // Login
  async function handleLogin(email, password) {
    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);

        setIsLoggedIn(true);

        const jobsData = await getJobs(data.token);

        setJobs(jobsData);

        showMessage("Login realizado com sucesso!");
      } else {
        showMessage("Email ou senha inválidos.");
      }
    } catch (error) {
      console.error(error);
      showMessage("Erro ao realizar login.");
    }
  }

  // Cadastro
  async function handleRegister(name, email, password) {
    try {
      await registerUser(name, email, password);

      showMessage("Conta criada com sucesso! Faça login.");
      setShowRegister(false);
    } catch (error) {
      showMessage(error.message);
    }
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("token");

    setJobs([]);
    setIsLoggedIn(false);
    setSearch("");
    setStatusFilter("All");
    setShowRegister(false);
  }

  // Busca os jobs do usuário autenticado
  async function handleGetJobs() {
    const token = localStorage.getItem("token");

    const data = await getJobs(token);

    setJobs(data);
  }

  // CRUD dos jobs
  async function handleCreateJob(company, role, status, applicationDate) {
    const token = localStorage.getItem("token");

    await createJob(
      token,
      company,
      role,
      status,
      applicationDate
    );

    showMessage("Candidatura criada com sucesso!");

    handleGetJobs();
  }

  async function handleDeleteJob(id) {
    const token = localStorage.getItem("token");

    await deleteJob(token, id);

    showMessage("Candidatura deletada com sucesso!");

    handleGetJobs();
  }

  async function handleUpdateJob(id, status) {
    const token = localStorage.getItem("token");

    await updateJobStatus(
      token,
      id,
      status
    );

    showMessage(`Status alterado para ${status}`);

    handleGetJobs();
  }

  // Estatísticas
  const totalJobs = jobs.length;

  const appliedJobs = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewJobs = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerJobs = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejectedJobs = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  const interviewRate =
    totalJobs > 0
      ? Math.round(((interviewJobs + offerJobs) / totalJobs) * 100)
      : 0;

  // Filtros
  const filteredJobs = jobs.filter((job) => {
    const searchTerm = search.toLowerCase();

    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm) ||
      job.role.toLowerCase().includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="app-container">
      <div className="header">
        <div>
          <span className="eyebrow">
            Job application dashboard
          </span>

          <h1 className="title-login">
            Job Tracker
          </h1>

          {isLoggedIn && (
            <p className="subtitle">
              Manage your applications, track progress and update your hiring pipeline.
            </p>
          )}
        </div>

        {isLoggedIn && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {!isLoggedIn ? (
        <>
          {showRegister ? (
            <RegisterForm
              onRegister={handleRegister}
              onGoToLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              onGoToRegister={() => setShowRegister(true)}
            />
          )}
        </>
      ) : (
        <>
          <div className="stats-container">
            <button
              className={`stat-card total ${statusFilter === "All" ? "active" : ""}`}
              onClick={() => setStatusFilter("All")}
            >
              <span className="stat-label">Total</span>
              <span className="stat-value">{totalJobs}</span>
            </button>

            <button
              className={`stat-card applied ${statusFilter === "Applied" ? "active" : ""}`}
              onClick={() => setStatusFilter("Applied")}
            >
              <span className="stat-label">Applied</span>
              <span className="stat-value">{appliedJobs}</span>
            </button>

            <button
              className={`stat-card interview ${statusFilter === "Interview" ? "active" : ""}`}
              onClick={() => setStatusFilter("Interview")}
            >
              <span className="stat-label">Interview</span>
              <span className="stat-value">{interviewJobs}</span>
            </button>

            <button
              className={`stat-card offer ${statusFilter === "Offer" ? "active" : ""}`}
              onClick={() => setStatusFilter("Offer")}
            >
              <span className="stat-label">Offer</span>
              <span className="stat-value">{offerJobs}</span>
            </button>

            <button
              className={`stat-card rejected ${statusFilter === "Rejected" ? "active" : ""}`}
              onClick={() => setStatusFilter("Rejected")}
            >
              <span className="stat-label">Rejected</span>
              <span className="stat-value">{rejectedJobs}</span>
            </button>

            <div className="stat-card rate">
              <span className="stat-label">Interview Rate</span>
              <span className="stat-value">{interviewRate}%</span>
            </div>
          </div>

          <JobForm onCreate={handleCreateJob} />

          <div className="toolbar">
            <input
              type="text"
              placeholder="Buscar por empresa ou cargo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />

            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All statuses</option>

              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <p className="results-count">
            Exibindo {filteredJobs.length} de {totalJobs} candidaturas
          </p>

          <JobList
            jobs={filteredJobs}
            onDelete={handleDeleteJob}
            onUpdate={handleUpdateJob}
          />
        </>
      )}
    </div>
  );
}

export default App;