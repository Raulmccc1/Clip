export function Fallback({ error, resetErrorBoundary }) {
  const message =
    error?.message || "Something went wrong while rendering this page.";
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 dark:from-background dark:to-muted/20 text-foreground">
      <main className="mx-auto grid min-h-screen max-w-7xl place-items-center px-4">
        <section className="w-full max-w-xl rounded-2xl border bg-card/70 p-8 shadow-xl backdrop-blur ring-1 ring-border">
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/20">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 stroke-current"
                fill="none"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d="M10.59 13.41a2 2 0 0 1 0-2.82l3.18-3.18a2 2 0 1 1 2.83 2.83l-1.06 1.06"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.41 10.59a2 2 0 0 1 0 2.82l-3.18 3.18a2 2 0 1 1-2.83-2.83l1.06-1.06"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h1 className="text-lg font-semibold">Something broke</h1>
          </div>

          <p className="text-sm text-muted-foreground">
            The page failed to load due to an unexpected error; try again or
            navigate elsewhere while the issue is investigated.
          </p>

          <pre className="mt-4 max-h-40 overflow-auto rounded-lg bg-muted p-3 text-xs text-muted-foreground ring-1 ring-border">
            {message}
          </pre>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => resetErrorBoundary()}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm shadow-sm ring-1 ring-border hover:bg-accent/50"
            >
              Go to home
            </a>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    `Error: ${error?.name ?? "Unknown"}\nMessage: ${message}`
                  );
                } catch {}
              }}
              className="inline-flex items-center justify-center rounded-md border bg-background px-4 py-2 text-sm shadow-sm ring-1 ring-border hover:bg-accent/50"
            >
              Copy details
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
