import React from "react";
import { createRoot } from "react-dom/client";
import { ShieldCheck } from "lucide-react";
import { AI_REVIEW_DISCLAIMER, ROLE_NAMES } from "@hospital/shared";
import "./styles.css";

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Project setup</p>
          <h1>AI Hospital Assistant</h1>
        </div>
        <div className="status-pill">
          <ShieldCheck aria-hidden="true" size={18} />
          <span>Human review required</span>
        </div>
      </header>

      <section className="workspace">
        <div className="panel">
          <h2>Platform Modules</h2>
          <p>Authentication, tenancy, RBAC, hospital operations, clinical workflows, billing, insurance, analytics, and AI agents will be added iteratively.</p>
        </div>

        <div className="panel">
          <h2>Configured Roles</h2>
          <div className="role-grid">
            {ROLE_NAMES.map((role) => (
              <span key={role}>{role.replaceAll("_", " ")}</span>
            ))}
          </div>
        </div>
      </section>

      <footer>{AI_REVIEW_DISCLAIMER}</footer>
    </main>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
