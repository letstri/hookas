import { cn } from '@/lib/cn'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fd-background to-fd-muted">
      <div className={cn(
        'container mx-auto px-4 py-16 sm:px-6 lg:px-8',
        'flex flex-col lg:flex-row items-center gap-12',
      )}
      >
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-fd-foreground mb-6">
            Hookas
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-fd-muted-foreground max-w-2xl mb-8">
            The hook registry for
            {' '}
            <span className="font-semibold text-fd-foreground">shadcn/ui CLI</span>
            .
          </p>
          <div className="flex gap-4">
            <a
              href="/docs"
              className="inline-block px-6 py-3 rounded-lg bg-fd-primary text-white font-semibold shadow hover:bg-fd-primary/90 transition"
            >
              Get Started
            </a>
            <a
              href="https://github.com/letstri/hookas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg border border-fd-primary text-fd-primary font-semibold hover:bg-fd-primary/10 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
