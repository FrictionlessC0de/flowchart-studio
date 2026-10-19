export type Kind =
  | "terminator"
  | "io"
  | "process"
  | "decision"
  | "predefined"
  | "preparation"
  | "storage"
  | "manual"
  | "display"
  | "connector"
  | "offpage";

export function Shape({ kind, x, y, w: w0, h: h0 }: { kind: Kind; x: number; y: number; w?: number | undefined; h?: number | undefined }) {
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

export const legend: { kind: Kind; name: string }[] = [
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

export type Definition = {
  slug: string;
  kind: Kind | null;
  name: string;
  definition: string;
  example: string;
  sampleLabel: string;
};

export const definitions: Definition[] = [
  {
    slug: "terminator",
    kind: "terminator",
    name: "Terminator (Start / End)",
    definition: "A rounded rectangle that marks where the flow begins and where it ends. Every flowchart has at least one Start and one End terminator — nothing may enter a Start and nothing may leave an End.",
    example: "\u201CStart\u201D opens the withdrawal; \u201CEnd\u201D closes it after the receipt.",
    sampleLabel: "Start",
  },
  {
    slug: "io",
    kind: "io",
    name: "Input / Output",
    definition: "A parallelogram for data entering or leaving the process — reading a value in, or sending a result out. It is the bridge between the program and the outside world.",
    example: "The machine dispenses cash to the user.",
    sampleLabel: "Dispense cash",
  },
  {
    slug: "process",
    kind: "process",
    name: "Process",
    definition: "A plain rectangle for an action or calculation that changes data: a sum, a comparison, a deduction. One entry, one exit — the workhorse of every chart.",
    example: "The account balance is reduced by the withdrawn amount.",
    sampleLabel: "Deduct amount",
  },
  {
    slug: "decision",
    kind: "decision",
    name: "Decision",
    definition: "A diamond that asks a yes/no question and branches: exactly one entry, two (or more) exits, each labelled with its answer, e.g. Yes / No.",
    example: "\u201CPIN valid?\u201D splits the flow into success and retry paths.",
    sampleLabel: "PIN valid?",
  },
  {
    slug: "flow-line",
    kind: null,
    name: "Flow Line",
    definition: "The arrowed line that carries the flow between symbols. Its arrowhead shows the direction of execution; the chart is always read following these arrows.",
    example: "Arrows connect every step, including the loop back to re-enter the PIN.",
    sampleLabel: "",
  },
  {
    slug: "connector",
    kind: "connector",
    name: "Connector (On-page)",
    definition: "A small labelled circle that breaks a line when the chart would otherwise double back. The same label appearing twice means the flow jumps between them — on the same page.",
    example: "Circle \u201CA\u201D hops the flow from the bottom of the page to the right column.",
    sampleLabel: "A",
  },
  {
    slug: "offpage",
    kind: "offpage",
    name: "Connector (Off-page)",
    definition: "A pentagon-shaped connector whose matching labels link the end of one page to the start of another — used when a chart outgrows a single sheet.",
    example: "The receipt printing continues on \u201Cpage 2\u201D of the chart.",
    sampleLabel: "p.2",
  },
  {
    slug: "predefined",
    kind: "predefined",
    name: "Predefined Process / Subroutine",
    definition: "A rectangle with double vertical side bars representing a named subroutine or library call whose steps are drawn (or documented) elsewhere. It keeps complex charts readable.",
    example: "\u201CVerifyPIN()\u201D is a reusable routine that checks the code.",
    sampleLabel: "VerifyPIN()",
  },
  {
    slug: "preparation",
    kind: "preparation",
    name: "Preparation",
    definition: "A hexagon for initialisation — setting counters, opening files, configuring values — done before the main work of the process begins.",
    example: "The session is initialised and the attempt counter set to 0.",
    sampleLabel: "Init session",
  },
  {
    slug: "storage",
    kind: "storage",
    name: "Data / Storage",
    definition: "A cylinder (or open-ended rectangle) representing stored data that the flow reads from or writes to — a database, a file, or a table.",
    example: "The subroutine reads the account record from the accounts database.",
    sampleLabel: "Accounts DB",
  },
  {
    slug: "manual",
    kind: "manual",
    name: "Manual Input",
    definition: "A trapezoid with its slanted top indicating data typed or entered by hand — a keypad, keyboard or form — rather than read automatically.",
    example: "The customer types their PIN on the ATM keypad.",
    sampleLabel: "Enter PIN",
  },
  {
    slug: "display",
    kind: "display",
    name: "Display",
    definition: "A screen-like shape showing information presented to a person in real time — on a monitor, panel or indicator — as opposed to printed or stored output.",
    example: "The screen shows \u201CInvalid PIN\u201D and later the new balance.",
    sampleLabel: "Show balance",
  },
];
