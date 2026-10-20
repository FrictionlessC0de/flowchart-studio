import { BookOpen } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="px-4 pb-6 pt-4 sm:px-5 sm:pb-8 sm:pt-6">
      <div className="fc-footer mx-auto flex max-w-6xl flex-col items-center gap-5 rounded-3xl px-5 py-7 text-center sm:flex-row sm:justify-between sm:gap-8 sm:px-8 sm:py-8 sm:text-left">
        <div className="flex items-center gap-3">
          <span className="fc-footer-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
            <BookOpen aria-hidden="true" size={21} />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Learning with purpose</p>
            <p className="fc-title mt-1 text-2xl font-bold tracking-tight">SOS SCHOOL</p>
          </div>
        </div>

        <div className="h-px w-full bg-border sm:h-10 sm:w-px" aria-hidden="true" />

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Instructor</p>
          <p className="mt-1 text-base font-semibold text-foreground sm:text-lg">A.N</p>
          <p className="mt-1 text-sm text-muted-foreground">Guiding the next generation of problem solvers.</p>
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-6xl text-center text-xs text-muted-foreground">
        Flowchart Animation Studio · Learn by following the flow
      </p>
    </footer>
  );
}
