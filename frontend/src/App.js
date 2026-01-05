import React, { useState } from "react";

function App() {
  // 🔹 Backend health
  const [backendStatus, setBackendStatus] = useState("UNKNOWN");
  const [backendMessage, setBackendMessage] = useState("");

  // 🔹 Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");

  // 🔹 Health check
  const checkBackend = async () => {
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setBackendStatus(data.status);
      setBackendMessage(data.message);
    } catch (error) {
      setBackendStatus("DOWN");
      setBackendMessage("Backend not reachable");
    }
  };

  // 🔹 Login API call
  const login = async () => {
    setLoginResult("Checking credentials...");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoginResult(`🟢 ${data.message} (Role: ${data.user.role})`);
      } else {
        setLoginResult(`🔴 ${data.message}`);
      }
    } catch (error) {
      setLoginResult("🔴 Backend not reachable");
    }
  };

  return (
    <div style={styles.page}>
      {/* HERO */}
      <header style={styles.hero}>
        <h1 style={styles.title}>🚀 React Application</h1>
        <p style={styles.subtitle}>
          Enterprise-grade frontend deployment on AWS
        </p>

        <div style={styles.badges}>
          <span style={styles.badge}>Production Ready</span>
          <span style={styles.badge}>Secure</span>
          <span style={styles.badge}>Scalable</span>
        </div>
      </header>

      {/* INFO CARDS */}
      <section style={styles.cards}>
        <div style={styles.card}>
          <h3>⚙️ Deployment Stack</h3>
          <ul>
            <li>React (Production Build)</li>
            <li>Cloudflare</li>
            <li>AWS EC2 (Ubuntu)</li>
            <li>Node.js</li>
          </ul>
        </div>

        <div style={styles.card}>
          <h3>🧠 Architecture</h3>
          <p>
            React handles UI static files. Node.js handles
            business logic for high performance and low
            runtime overhead.
          </p>
        </div>

        <div style={styles.card}>
          <h3>🔐 DevOps Best Practices</h3>
          <ul>
            <li>No Node.js in production</li>
            <li>Stateless frontend</li>
            <li>Easy CI/CD integration</li>
          </ul>
        </div>
      </section>

      {/* 🔐 LOGIN SECTION (ADDED) */}
      <section style={styles.login}>
        <h3>🔐 Login</h3>

        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Login
        </button>

        {loginResult && (
          <p style={{ marginTop: "15px" }}>{loginResult}</p>
        )}
      </section>

      {/* 🔗 BACKEND HEALTH */}
      <section style={styles.backend}>
        <h3>🔗 Backend Connection Status</h3>

        <button style={styles.button} onClick={checkBackend}>
          Check Backend
        </button>

        {backendMessage && (
          <div style={{ marginTop: "20px" }}>
            <p>
              <strong>Status:</strong>{" "}
              {backendStatus === "OK" ? "🟢 OK" : "🔴 DOWN"}
            </p>
            <p>
              <strong>Message:</strong> {backendMessage}
            </p>
          </div>
        )}
      </section>

      {/* STATUS */}
      <section style={styles.status}>
        <div>🟢 Server Status: <strong>RUNNING</strong></div>
        <div>📦 Build Mode: <strong>PRODUCTION</strong></div>
        <div>🌍 Region: <strong>ap-south-1</strong></div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>
          Deployed by <strong>Sohail DevOps Engineer</strong>
        </p>
        <p style={{ fontSize: "13px", color: "#94a3b8" }}>
          React • Node • AWS • Linux
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    color: "#e5e7eb",
    fontFamily: "Inter, Arial, sans-serif",
  },
  hero: {
    textAlign: "center",
    padding: "80px 20px 60px",
  },
  title: {
    fontSize: "52px",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "20px",
    color: "#94a3b8",
  },
  badges: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  badge: {
    background: "#0f172a",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #1e293b",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
    padding: "0 40px 60px",
    maxWidth: "1100px",
    margin: "auto",
  },
  card: {
    background: "#020617",
    padding: "25px",
    borderRadius: "14px",
  },
  login: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "30px",
    background: "#020617",
    borderRadius: "14px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    background: "#020617",
    color: "#e5e7eb",
  },
  button: {
    padding: "12px 24px",
    background: "#2563eb",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },
  backend: {
    textAlign: "center",
    margin: "60px auto",
    padding: "40px",
    maxWidth: "700px",
    background: "#020617",
    borderRadius: "16px",
  },
  status: {
    display: "flex",
    justifyContent: "space-around",
    padding: "25px",
  },
  footer: {
    textAlign: "center",
    padding: "40px 20px",
    borderTop: "1px solid #1e293b",
  },
};

export default App;

