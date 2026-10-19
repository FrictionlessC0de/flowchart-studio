import { useEffect } from "react";
import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { definitions, Shape } from "@/components/flowchart";

export const Route = createFileRoute("/symbols")({
  head: () => ({
    meta: [
      { title: "Flowchart Symbol Definitions — All 12 Standard Symbols" },
      { name: "description", content: "Clear definitions of every standard flowchart symbol: terminator, input/output, process, decision, flow line, connectors, subroutine, preparation, storage, manual input and display — each shown with the ATM example." },
      { property: "og:title", content: "Flowchart Symbol Definitions" },
      { property: "og:description", content: "What each standard flowchart symbol means, with a real ATM withdrawal example for every one." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Symbols,
});

function Symbols() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <main className="min-h-screen fc-bg px-4 pb-12 pt-8 font-sans text-foreground sm:px-5 sm:pb-16 sm:pt-12">
      <header className="mx-auto mb-8 max-w-6xl sm:mb-10">
        <span className="fc-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs tracking-widest uppercase text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />Reference guide</span>
        <h1 className="fc-title mt-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Symbol Definitions</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">What each of the 12 standard flowchart symbols means — and where it appears in the ATM withdrawal chart.</p>
      </header>

      <div className="mx-auto max-w-6xl">
        <nav aria-label="Jump to a flowchart symbol" className="fc-panel mb-8 flex flex-wrap gap-2 rounded-3xl p-3 sm:p-4">
          {definitions.map((d) => (
            <Link
              key={d.slug}
              to="/symbols"
              hash={d.slug}
              className="fc-btn max-w-full rounded-full px-3 py-1.5 text-left text-xs font-medium"
              preload="intent"
            >
              {d.name}
            </Link>
          ))}
        </nav>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {definitions.map((d) => (
            <article key={d.slug} id={d.slug} className="fc-panel fc-grid flex min-w-0 scroll-mt-6 flex-col gap-4 rounded-3xl p-4 sm:scroll-mt-8 sm:p-6">
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <svg viewBox="0 0 220 120" className="w-24 h-14 shrink-0 fc">
                  {d.kind ? (
                    <g className="fc-node">
                      <Shape kind={d.kind} x={110} y={60} />
                      <text x={110} y={65} textAnchor="middle" className="fc-label">{d.sampleLabel}</text>
                    </g>
                  ) : (
                    <path d="M20 60 L180 60" className="fc-line" markerEnd="url(#sym-arrow)" />
                  )}
                </svg>
                <h2 className="min-w-0 text-lg font-semibold leading-tight sm:text-xl">{d.name}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{d.definition}</p>
              <p className="fc-chip mt-auto rounded-xl px-3 py-2 text-sm">
                <span className="text-primary font-semibold">In the ATM chart: </span>
                {d.example}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="fc-btn-main inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
            ▶ Watch the animated ATM flowchart
          </Link>
        </div>
      </div>

      <svg width="0" height="0" className="hidden">
        <defs>
          <marker id="sym-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" className="fc-arrow" />
          </marker>
        </defs>
      </svg>
    </main>
  );
}
