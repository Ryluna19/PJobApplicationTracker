import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import "./App.css";

import {
  loginUser,
  getJobs,
  createJob,
  deleteJob,
  updateJobStatus
} from "./services/api";

/* =====================================================
           MAIN APPLICATION COMPONENT
===================================================== */

function App() {
  //States
  const [jobs, setJobs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  // Carrega sessão Salva
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
  // Autenticação
  async function handleLogin(email, password) {
    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);

      setIsLoggedIn(true);

      const jobsData = await getJobs(data.token);

      setJobs(jobsData);

      alert("Login realizado com sucesso!");
    } else {
      alert("Email ou senha inválidos");
    }
  }
  //CRUD do Jobs
  async function handleGetJobs() {
    const token = localStorage.getItem("token");

    const data = await getJobs(token);

    setJobs(data);
  }

  async function handleCreateJob(company, role, status, applicationDate) {
    const token = localStorage.getItem("token");

    console.log({
      company,
      role,
      status,
      applicationDate
    });
    await createJob(
      token,
      company,
      role,
      status,
      applicationDate
    );

    setMessage("Job criado com sucesso!");
    setTimeout(() => {
      setMessage("");
    }, 3000);

    handleGetJobs();
  }

  async function handleDeleteJob(id) {
    const token = localStorage.getItem("token");

    await deleteJob(token, id);

    setMessage("Job deletado com sucesso!");
    setTimeout(() => {
      setMessage("");
    }, 3000);

    handleGetJobs();
  }

  async function handleUpdateJob(id, status) {
    const token = localStorage.getItem("token");

    await updateJobStatus(
      token,
      id,
      status
    );

    setMessage(`Status alterado para ${status}`);
    setTimeout(() => {
      setMessage("");
    }, 3000);

    handleGetJobs();
  }

  // Estatísticas do dashboard
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

  const filteredJobs = jobs.filter((job) => {

    const matchesCompany =
      job.company.toLowerCase().includes(
        search.toLowerCase()
      );

    const matchesStatus =
      statusFilter === "All" ||
      job.status === statusFilter;

    return matchesCompany && matchesStatus;
  });
  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title-login">Job Tracker</h1>

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
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>

          <JobForm onCreate={handleCreateJob} />
          <input
            type="text"
            placeholder="Buscar empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">Todos</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <div className="stats-container">

            <div className="stat-card">
              <h3>{totalJobs}</h3>
              <p>Total</p>
            </div>

            <div className="stat-card">
              <h3>{appliedJobs}</h3>
              <p>Applied</p>
            </div>

            <div className="stat-card">
              <h3>{interviewJobs}</h3>
              <p>Interview</p>
            </div>

            <div className="stat-card">
              <h3>{offerJobs}</h3>
              <p>Offer</p>
            </div>

            <div className="stat-card">
              <h3>{rejectedJobs}</h3>
              <p>Rejected</p>
            </div>

          </div>

          <hr />

          <JobList
            jobs={filteredJobs}
            onDelete={handleDeleteJob}
            onUpdate={handleUpdateJob}
          />
        </>
      )}
    </div>
  );

  function handleLogout() {
    localStorage.removeItem("token");

    setJobs([]);

    setIsLoggedIn(false);
  }
}

export default App;