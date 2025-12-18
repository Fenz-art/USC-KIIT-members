import { useNavigate } from 'react-router-dom'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center">
        <section className="flex-1 space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-uscGold">
            Welcome to
          </p>
          <h1 className="text-4xl font-bold text-slate-50 md:text-5xl">
            USC KIIT
          </h1>
          <p className="max-w-xl text-sm text-slate-300 md:text-base">
            The University Student Chapter at KIIT celebrates builders, designers,
            and innovators across domains like RPA &amp; AI, Web, App, and Design.
            Join a community that learns by doing, ships real projects, and grows together.
          </p>
          <p className="max-w-xl text-sm text-slate-400">
            Tell us about yourself, your work, and where you want to contribute.
            We&apos;ll review your profile and showcase approved members on our public members page.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/apply')}
              className="rounded-full bg-uscGold px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-uscGold/30 hover:bg-amber-300"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={() => navigate('/members')}
              className="rounded-full border border-slate-700 px-6 py-2 text-sm font-semibold text-slate-100 hover:border-slate-500"
            >
              View Members
            </button>
          </div>
        </section>
        <section className="flex-1">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Domains
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-100">
              <li className="rounded-xl bg-slate-800/80 px-4 py-3">
                <p className="font-semibold">RPA &amp; AI</p>
                <p className="mt-1 text-xs text-slate-400">
                  Automation, intelligent agents, and AI-powered workflows.
                </p>
              </li>
              <li className="rounded-xl bg-slate-800/80 px-4 py-3">
                <p className="font-semibold">Web Dev</p>
                <p className="mt-1 text-xs text-slate-400">
                  Modern web experiences, from landing pages to dashboards.
                </p>
              </li>
              <li className="rounded-xl bg-slate-800/80 px-4 py-3">
                <p className="font-semibold">App Dev</p>
                <p className="mt-1 text-xs text-slate-400">
                  Mobile and desktop apps that bring ideas to life.
                </p>
              </li>
              <li className="rounded-xl bg-slate-800/80 px-4 py-3">
                <p className="font-semibold">Design</p>
                <p className="mt-1 text-xs text-slate-400">
                  Visual, product, and interaction design for delightful UX.
                </p>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}






