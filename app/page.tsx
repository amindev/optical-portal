const sectionStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 20,
  boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
} as const;

const pill = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  marginRight: 8,
  marginBottom: 8,
} as const;

export default function Page() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <div style={{ ...sectionStyle, background: "#0f172a", color: "white", border: "none" }}>
        <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: "#cbd5e1" }}>
          Blackstone Eye Center
        </div>
        <h1 style={{ margin: "10px 0 12px", fontSize: 40, lineHeight: 1.1 }}>
          Optical Ordering Portal
        </h1>
        <p style={{ margin: 0, color: "#cbd5e1", maxWidth: 700, fontSize: 16 }}>
          Starter site for staff to reference approved Good / Best lens pairings and key ordering rules.
        </p>
        <div style={{ marginTop: 16 }}>
          <span style={{ ...pill, background: "#064e3b", color: "#d1fae5" }}>Good / Best only</span>
          <span style={{ ...pill, background: "#1e3a8a", color: "#dbeafe" }}>Plan-based workflow</span>
          <span style={{ ...pill, background: "#78350f", color: "#fef3c7" }}>Ordering guardrails</span>
        </div>
      </div>

      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: 20 }}>
        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0 }}>Hard Rules</h2>
          <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Use approved Good / Best pairings only.</li>
            <li>No high-tier lenses with low-tier AR pairings.</li>
            <li>EyeMed progressives are now Varilux only.</li>
            <li>Check before placing any order outside the sheet.</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0 }}>Quick Plan Notes</h2>
          <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
            <li>VSP: prioritize Crizal Rock and Prevencia when applicable.</li>
            <li>Davis and NVA can still use Kodak progressives as directed.</li>
            <li>For many photochromic jobs, gray is the standard color.</li>
            <li>Xperio UV is a preferred sunglass pairing.</li>
          </ul>
        </section>

        <section style={sectionStyle}>
          <h2 style={{ marginTop: 0 }}>What’s Next</h2>
          <p style={{ lineHeight: 1.7 }}>
            This starter site confirms deployment works. The next version can include searchable plan lookups,
            dropdown recommendations, retail pricing, and your full optical cheat sheet workflow.
          </p>
        </section>
      </div>
    </main>
  );
}