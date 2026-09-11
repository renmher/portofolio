# Design Direction: Renaldy Imran Hermawan Portfolio
**Role:** Junior DevOps, Cloud Engineer, and IT Network Specialist  
**Dial:** ENERGY 2 / RHYTHM 2 / MOTION 1  

---

## 1. Identity & Persona
- **Audience:** Tech leads, engineering managers, DevOps recruiters, and technical collaborators.
- **Mood:** Professional, technical, structured, and intentional (not flashy or trend-stacked).
- **Core Motif:** Terminal / Infrastructure observability aesthetics paired with clean typography and real interactive simulators.

---

## 2. Dials (Antislop Standard)
- **ENERGY: 2 (Balanced)**  
  *Rationale:* Striking a balance between technical gravitas (deep slate and clean borders) and accessible clarity without screaming for attention like an agency landing page.
- **RHYTHM: 2 (Structured with Variation)**  
  *Rationale:* Alternates between narrative text, technical parameter tables, interactive pipeline simulators, and timeline views without relying on uniform copy-paste card grids.
- **MOTION: 1 (Calm & Purposeful)**  
  *Rationale:* Functional transitions only (status updates, tab switches, terminal output streaming, subtle hover borders). No distracting floating elements, ambient bouncing, or unnecessary page-load parallax.

---

## 3. Typography Stack & Rationale
- **Headings: `Outfit` (sans-serif, weights 600, 700, 800)**  
  *Rationale:* Modern geometric structure that provides crisp contrast against technical data without being overly playful.
- **Body: `Inter` (sans-serif, weights 400, 500, 600)**  
  *Rationale:* Highly legible at standard reading densities across dense technical descriptions and ATS-compatible CV formatting.
- **Code / Monospace: `JetBrains Mono` (monospace, weights 400, 500)**  
  *Rationale:* Tailored specifically for console output, Git logs, and YAML configuration snippets in the interactive simulators.

---

## 4. Color Palette & One-Line Rationales (R-31)
- **Primary Indigo (`#4F46E5` / Dark: `#6366F1`):**  
  *Rationale:* Represents reliable cloud infrastructure and stable deployment pipeline execution.
- **Accent Cyan (`#06B6D4` / Dark: `#22D3EE`):**  
  *Rationale:* Evokes real-time telemetry, network connectivity, and observability metrics (Grafana/Prometheus).
- **Background Deep (`#0B0F19` dark, `#F9FAFB` light):**  
  *Rationale:* Reduces visual eye strain during long technical code reviews while maintaining high WCAG AA contrast.
- **Surface Card (`#1E293B` with border `rgba(255,255,255,0.08)`):**  
  *Rationale:* Establishes a clear elevation hierarchy without using blurry floating glows.

---

## 5. Architectural & Interaction Guidelines
- **Focus Rings:** All focusable controls must maintain a distinct 2px `:focus-visible` ring for complete keyboard accessibility.
- **Dose Caps:** Glow effects are strictly limited to active simulator states (e.g., active running stage in pipeline); never applied to static cards or hero backgrounds.
- **Real Actions:** CTAs state their direct functional purpose; no decorative generic arrow appendages.
