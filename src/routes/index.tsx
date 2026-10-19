import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Animated Flowchart Symbols — ATM Withdrawal Example" },
      { name: "description", content: "Live animated flowchart showing all standard symbols: terminator, I/O, process, decision, connectors, subroutine, preparation, storage, manual input and display." },
      { property: "og:title", content: "Animated Flowchart Symbols Example" },
      { property: "og:description", content: "Watch data flow through every standard flowchart symbol in an ATM withdrawal example." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Kind = "terminator" | "io" | "process" | "decision" | "predefined" | "preparation" | "storage" | "manual" | "display" | "connector" | "offpage";

function Shape({ kind, x, y, w: w0, h: h0 }: { kind: Kind; x: number; y: number; w?: number | undefined; h?: number | undefined }) {
  const w = w0 ?? 180, h = h0 ?? 64;
  const l = x - w / 2, r = x + w / 2, t = y - h / 2, b = y + h / 2;
  switch (kind) {
    case "terminator": return <rect x={l} y={t} width={w} height={h} rx={h / 2} />;
    case "process": return <rect x={l} y={t} width={w} height={h} rx={4} />;
    case "io": return <polygon points={`${l + 20},${t} ${r},${t} ${r - 20},${b} ${l},${b}`} />;
    case "decision": return <polygon points={`${x},${y - 50} ${x + 90},${y} ${x},${y + 50} ${x - 90},${y}`} />;
    case "predefined": return <g><rect x={l} y={t} width={w} height={h} rx={4} /><line x1={l + 14} y1={t} x2={l + 14} y2={b} /><line x1={r - 14} y1={t} x2={r - 14} y2={b} /></g>;
    case "preparation": return <polygon points={`${l + 22},${t} ${r - 22},${t} ${r},${y} ${r - 22},${b} ${l + 22},${b} ${l},${y}`} />;
    case "storage": return <g><path d={`M${l},${t + 10} A${w / 2},10 0 0 1 ${r},${t + 10} L${r},${b - 10} A${w / 2},10 0 0 1 ${l},${b - 10} Z`} /><path d={`M${l},${t + 10} A${w / 2},10 0 0 0 ${r},${t + 10}`} /></g>;
    case "manual": return <polygon points={`${l},${t + 16} ${r},${t} ${r},${b} ${l},${b}`} />;
    case "display": return <path d={`M${l},${y} L${l + 24},${t} L${r - 24},${t} Q${r + 8},${y} ${r - 24},${b} L${l + 24},${b} Z`} />;
    case "connector": return <circle cx={x} cy={y} r={26} />;
    case "offpage": return <polygon points={`${l},${t} ${r},${t} ${r},${b - 18} ${x},${b + 6} ${l},${b - 18}`} />;
  }
}

type N = { id: string; kind: Kind; x: number; y: number; label: string; w?: number; h?: number };
const L = 320, R = 820;
const nodes: N[] = [
  { id: "start", kind: "terminator", x: L, y: 60, label: "Start" },
  { id: "prep", kind: "preparation", x: L, y: 170, label: "Init session, tries = 0" },
  { id: "manual", kind: "manual", x: L, y: 280, label: "Enter PIN" },
  { id: "sub", kind: "predefined", x: L, y: 390, label: "VerifyPIN()" },
  { id: "db", kind: "storage", x: 580, y: 390, label: "Accounts DB", w: 150, h: 70 },
  { id: "decision", kind: "decision", x: L, y: 520, label: "PIN valid?" },
  { id: "error", kind: "display", x: 110, y: 520, label: "Invalid PIN", w: 150 },
  { id: "process", kind: "process", x: L, y: 660, label: "Deduct amount" },
  { id: "io", kind: "io", x: L, y: 770, label: "Dispense cash" },
  { id: "connA", kind: "connector", x: L, y: 880, label: "A" },
  { id: "connA2", kind: "connector", x: R, y: 60, label: "A" },
  { id: "display", kind: "display", x: R, y: 200, label: "Show balance" },
  { id: "offpage", kind: "offpage", x: R, y: 330, label: "Receipt → p.2", h: 70 },
  { id: "end", kind: "terminator", x: R, y: 460, label: "End" },
];

const edges: Record<string, string> = {
  e1: `M${L} 92 L${L} 138`,
  e2: `M${L} 202 L${L} 250`,
  e3: `M${L} 312 L${L} 358`,
  e4: `M${L + 90} 390 L505 390`,
  e6: `M${L} 422 L${L} 470`,
  e7: `M${L - 90} 520 L185 520`,
  e8: `M110 488 L110 285 L${L - 90} 285`,
  e9: `M${L} 570 L${L} 628`,
  e10: `M${L} 692 L${L} 738`,
  e11: `M${L} 802 L${L} 854`,
  e13: `M${R} 86 L${R} 168`,
  e14: `M${R} 232 L${R} 295`,
  e15: `M${R} 372 L${R} 428`,
};

const steps: { node: string; edge: string | null; text: string }[] = [
  { node: "start", edge: null, text: "Terminator — the flow begins." },
  { node: "prep", edge: "e1", text: "Preparation — set up variables before work starts." },
  { node: "manual", edge: "e2", text: "Manual Input — the user types a PIN on the keypad." },
  { node: "sub", edge: "e3", text: "Predefined Process — call the VerifyPIN subroutine." },
  { node: "db", edge: "e4", text: "Data / Storage — the subroutine reads the accounts database." },
  { node: "decision", edge: "e6", text: "Decision — is the PIN valid? (first try: No)" },
  { node: "error", edge: "e7", text: "Display — show 'Invalid PIN' on screen." },
  { node: "manual", edge: "e8", text: "Flow Line loops back — enter the PIN again." },
  { node: "sub", edge: "e3", text: "Predefined Process — verify again." },
  { node: "decision", edge: "e6", text: "Decision — this time: Yes." },
  { node: "process", edge: "e9", text: "Process — deduct the amount from the balance." },
  { node: "io", edge: "e10", text: "Input / Output — the machine outputs cash." },
  { node: "connA", edge: "e11", text: "On-page Connector A — jump elsewhere on this page." },
  { node: "connA2", edge: null, text: "Connector A — the flow resumes here." },
  { node: "display", edge: "e13", text: "Display — show the new balance." },
  { node: "offpage", edge: "e14", text: "Off-page Connector — continues on page 2 (receipt)." },
  { node: "end", edge: "e15", text: "Terminator — the flow ends." },
];

const legend: { kind: Kind; name: string }[] = [
  { kind: "terminator", name: "Terminator (Start/End)" },
  { kind: "io", name: "Input / Output" },
  { kind: "process", name: "Process" },
  { kind: "decision", name: "Decision" },
  { kind: "connector", name: "Connector (On-page)" },
  { kind: "offpage", name: "Connector (Off-page)" },
  { kind: "predefined", name: "Predefined Process" },
  { kind: "preparation", name: "Preparation" },
  { kind: "storage", name: "Data / Storage" },
  { kind: "manual", name: "Manual Input" },
  { kind: "display", name: "Display" },
];

function Index() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % steps.length), 1600);
    return () => clearTimeout(t);
  }, [step, playing]);

  const cur = steps[step]!;
  const visited = new Set(steps.slice(0, step + 1).map((s) => s.edge).filter(Boolean));
  const activeKind = nodes.find((n) => n.id === cur.node)!.kind;

  return (
    <main className="min-h-screen fc-bg px-4 py-8 font-sans text-foreground sm:px-5 sm:py-12">
      <header className="mx-auto mb-8 max-w-6xl sm:mb-10">
        <span className="fc-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-widest uppercase text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />Flowchart symbols in motion</span>
        <h1 className="fc-title mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">ATM Cash Withdrawal</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Follow the glowing token through all 12 standard flowchart symbols — one step at a time.</p>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">
        <section aria-label="Animated ATM flowchart; scroll horizontally on small screens" className="fc-panel fc-grid min-w-0 overflow-x-auto rounded-3xl p-3 sm:p-4 md:p-6">
          <svg viewBox="0 0 960 940" className="fc h-auto w-full min-w-155 md:min-w-0">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fc-arrow" />
              </marker>
              <marker id="arrowOn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" className="fc-arrow-on" />
              </marker>
            </defs>
            <rect x="660" y="290" width="290" height="230" rx="10" className="fc-page" />
            <text x="940" y="510" textAnchor="end" className="fc-small">page 2</text>
            <path d={`M505 410 L${L + 90} 410`} className="fc-line fc-dashed" markerEnd="url(#arrow)" />
            {Object.entries(edges).map(([id, d]) => {
              const on = visited.has(id);
              return <path key={id} d={d} className={`fc-line ${on ? "fc-line-on" : ""} ${id === "e4" ? "fc-dashed" : ""}`} markerEnd={on ? "url(#arrowOn)" : "url(#arrow)"} />;
            })}
            <text x={L + 12} y={600} className="fc-small">Yes</text>
            <text x={200} y={510} className="fc-small">No</text>
            {cur.edge && <circle key={step} r="7" className="fc-token" style={{ offsetPath: `path('${edges[cur.edge]}')` }} />}
            {nodes.map((n) => {
              const active = n.id === cur.node;
              return (
                <g key={n.id} className={`fc-node ${active ? "fc-node-on" : ""}`}>
                  <Shape kind={n.kind} x={n.x} y={n.y} w={n.w} h={n.h} />
                  <text x={n.x} y={n.y + 5} textAnchor="middle" className="fc-label">{n.label}</text>
                </g>
              );
            })}
          </svg>
        </section>

        <aside className="space-y-4">
          <div className="fc-panel rounded-3xl p-4 sm:p-6">
            <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-xs text-muted-foreground"><span>Step {step + 1} / {steps.length}</span><span className="text-primary">{legend.find((l) => l.kind === activeKind)?.name}</span></div>
            <div className="mt-3 h-1 rounded-full bg-secondary overflow-hidden"><div className="fc-progress h-full rounded-full" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
            <p key={step} className="mt-4 text-lg font-medium leading-snug fc-fade">{cur.text}</p>
            <div className="mt-4 grid min-w-0 grid-cols-2 gap-2 xl:grid-cols-4">
              <Btn label="Previous step" onClick={() => setStep((s) => (s - 1 + steps.length) % steps.length)}>◀</Btn>
              <Btn main onClick={() => setPlaying((p) => !p)}>{playing ? "Pause" : "Play"}</Btn>
              <Btn label="Next step" onClick={() => setStep((s) => (s + 1) % steps.length)}>▶</Btn>
              <Btn onClick={() => setStep(0)}>Reset</Btn>
            </div>
          </div>
          <div className="fc-panel rounded-3xl p-4 sm:p-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Legend</p>
            <ul className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
              <li className="flex min-w-0 items-center gap-3 text-sm">
                <svg viewBox="0 0 80 40" className="w-16 h-8 fc"><path d="M5 20 L70 20" className={`fc-line ${cur.edge ? "fc-line-on" : ""}`} markerEnd="url(#arrow)" /></svg>
                Flow Line
              </li>
              {legend.map((s) => (
                <li key={s.kind} className={`flex min-w-0 items-center gap-3 rounded-xl px-2 py-1 text-sm transition-colors ${s.kind === activeKind ? "bg-secondary text-primary font-semibold" : "text-muted-foreground"}`}>
                  <svg viewBox="0 0 220 120" className="w-16 h-8 fc">
                    <g className={`fc-node ${s.kind === activeKind ? "fc-node-on" : ""}`}><Shape kind={s.kind} x={110} y={60} /></g>
                  </svg>
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Btn({ children, onClick, main, label }: { children: ReactNode; onClick: () => void; main?: boolean; label?: string }) {
  return <button aria-label={label} onClick={onClick} className={`fc-btn flex min-w-0 w-full items-center justify-center whitespace-nowrap rounded-full px-2 py-2.5 text-xs sm:px-4 sm:text-sm ${main ? "fc-btn-main" : ""}`}>{children}</button>;
}
