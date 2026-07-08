import React from "react";
import { createRoot } from "react-dom/client";
import {
  BedDouble,
  Building2,
  CalendarClock,
  DoorOpen,
  Globe2,
  KeyRound,
  MessageSquareText,
  Palette,
  ShieldCheck,
  Stethoscope,
  UserRoundPlus,
  UsersRound
} from "lucide-react";
import { AI_REVIEW_DISCLAIMER, PERMISSION_NAMES, ROLE_NAMES } from "@hospital/shared";
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

      <section className="auth-grid" aria-label="Authentication">
        <form className="auth-panel">
          <div className="section-title">
            <KeyRound aria-hidden="true" size={20} />
            <h2>Email Login</h2>
          </div>
          <label>
            Email
            <input type="email" autoComplete="email" placeholder="doctor@examplehospital.com" />
          </label>
          <label>
            Password
            <input type="password" autoComplete="current-password" minLength={12} />
          </label>
          <button type="button">Sign in</button>
        </form>

        <form className="auth-panel">
          <div className="section-title">
            <MessageSquareText aria-hidden="true" size={20} />
            <h2>Mobile OTP</h2>
          </div>
          <label>
            Mobile number
            <input type="tel" autoComplete="tel" placeholder="+15551234567" />
          </label>
          <label>
            One-time code
            <input inputMode="numeric" maxLength={6} />
          </label>
          <button type="button">Verify OTP</button>
        </form>
      </section>

      <section className="tenant-band" aria-label="Tenant setup">
        <div className="section-title">
          <Building2 aria-hidden="true" size={20} />
          <h2>Hospital Tenant Setup</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <Globe2 aria-hidden="true" size={18} />
            <span>Domain mapping</span>
          </div>
          <div>
            <Palette aria-hidden="true" size={18} />
            <span>Branding controls</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Tenant-isolated records</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Role permissions">
        <div className="section-title">
          <ShieldCheck aria-hidden="true" size={20} />
          <h2>Role-Based Access</h2>
        </div>
        <div className="permission-list">
          {PERMISSION_NAMES.slice(0, 8).map((permission) => (
            <span key={permission}>{permission.replaceAll("_", " ")}</span>
          ))}
        </div>
      </section>

      <section className="tenant-band" aria-label="Hospital management">
        <div className="section-title">
          <Building2 aria-hidden="true" size={20} />
          <h2>Hospital Management</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <Stethoscope aria-hidden="true" size={18} />
            <span>Departments</span>
          </div>
          <div>
            <DoorOpen aria-hidden="true" size={18} />
            <span>Rooms</span>
          </div>
          <div>
            <BedDouble aria-hidden="true" size={18} />
            <span>Beds</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Staff management">
        <div className="section-title">
          <UsersRound aria-hidden="true" size={20} />
          <h2>Staff Management</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <UsersRound aria-hidden="true" size={18} />
            <span>Staff profiles</span>
          </div>
          <div>
            <CalendarClock aria-hidden="true" size={18} />
            <span>Doctor schedules</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Employment status</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Patient management">
        <div className="section-title">
          <UserRoundPlus aria-hidden="true" size={20} />
          <h2>Patient Management</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <UserRoundPlus aria-hidden="true" size={18} />
            <span>Registration</span>
          </div>
          <div>
            <Stethoscope aria-hidden="true" size={18} />
            <span>Medical history</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Consent records</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Appointment system">
        <div className="section-title">
          <CalendarClock aria-hidden="true" size={20} />
          <h2>Appointment System</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <CalendarClock aria-hidden="true" size={18} />
            <span>Calendar booking</span>
          </div>
          <div>
            <UsersRound aria-hidden="true" size={18} />
            <span>Queue management</span>
          </div>
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Reminders</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Reception dashboard">
        <div className="section-title">
          <UsersRound aria-hidden="true" size={20} />
          <h2>Reception Dashboard</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <UsersRound aria-hidden="true" size={18} />
            <span>Walk-ins</span>
          </div>
          <div>
            <CalendarClock aria-hidden="true" size={18} />
            <span>Upcoming appointments</span>
          </div>
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Queue status</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Doctor dashboard">
        <div className="section-title">
          <Stethoscope aria-hidden="true" size={20} />
          <h2>Doctor Dashboard</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <CalendarClock aria-hidden="true" size={18} />
            <span>Today's appointments</span>
          </div>
          <div>
            <Stethoscope aria-hidden="true" size={18} />
            <span>Pending documentation</span>
          </div>
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Follow-ups</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Nurse dashboard">
        <div className="section-title">
          <Stethoscope aria-hidden="true" size={20} />
          <h2>Nurse Dashboard</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Shift handover</span>
          </div>
          <div>
            <CalendarClock aria-hidden="true" size={18} />
            <span>Medication schedules</span>
          </div>
          <div>
            <Stethoscope aria-hidden="true" size={18} />
            <span>Vital signs</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Laboratory module">
        <div className="section-title">
          <Stethoscope aria-hidden="true" size={20} />
          <h2>Laboratory Module</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <Stethoscope aria-hidden="true" size={18} />
            <span>Test orders</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Sample tracking</span>
          </div>
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Plain-language summaries</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Pharmacy module">
        <div className="section-title">
          <ShieldCheck aria-hidden="true" size={20} />
          <h2>Pharmacy Module</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <Stethoscope aria-hidden="true" size={18} />
            <span>Prescriptions</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Stock and expiry</span>
          </div>
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Interaction warnings</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Billing module">
        <div className="section-title">
          <ShieldCheck aria-hidden="true" size={20} />
          <h2>Billing Module</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Invoices</span>
          </div>
          <div>
            <Stethoscope aria-hidden="true" size={18} />
            <span>GST and discounts</span>
          </div>
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Payments</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Insurance module">
        <div className="section-title">
          <ShieldCheck aria-hidden="true" size={20} />
          <h2>Insurance Module</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Verification</span>
          </div>
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Claim preparation</span>
          </div>
          <div>
            <DoorOpen aria-hidden="true" size={18} />
            <span>Document uploads</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="Notification system">
        <div className="section-title">
          <MessageSquareText aria-hidden="true" size={20} />
          <h2>Notification System</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Email and SMS</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Push notifications</span>
          </div>
          <div>
            <Palette aria-hidden="true" size={18} />
            <span>Templates</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="AI Reception Agent">
        <div className="section-title">
          <MessageSquareText aria-hidden="true" size={20} />
          <h2>AI Reception Agent</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <CalendarClock aria-hidden="true" size={18} />
            <span>Appointment drafts</span>
          </div>
          <div>
            <UsersRound aria-hidden="true" size={18} />
            <span>Queue estimates</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Reviewed responses</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="AI Doctor Agent">
        <div className="section-title">
          <Stethoscope aria-hidden="true" size={20} />
          <h2>AI Doctor Agent</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <Stethoscope aria-hidden="true" size={18} />
            <span>Clinical drafts</span>
          </div>
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Differential suggestions</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Clinician review</span>
          </div>
        </div>
      </section>

      <section className="tenant-band" aria-label="AI Nurse Agent">
        <div className="section-title">
          <Stethoscope aria-hidden="true" size={20} />
          <h2>AI Nurse Agent</h2>
        </div>
        <div className="tenant-actions">
          <div>
            <MessageSquareText aria-hidden="true" size={18} />
            <span>Handover drafts</span>
          </div>
          <div>
            <CalendarClock aria-hidden="true" size={18} />
            <span>Medication schedules</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" size={18} />
            <span>Nurse review</span>
          </div>
        </div>
      </section>

      <footer>{AI_REVIEW_DISCLAIMER}</footer>
    </main>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
