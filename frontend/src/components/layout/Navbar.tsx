import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-uscRed to-uscGold" />
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-100">USC KIIT</p>
            <p className="text-xs text-slate-400">Members Portal</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/members" className="text-slate-300 hover:text-white">
            Members
          </Link>
          <Link to="/admin" className="text-slate-300 hover:text-white">
            Admin
          </Link>
          <Link
            to="/apply"
            className="rounded-full bg-uscGold px-4 py-1.5 text-xs font-semibold text-slate-950 shadow hover:bg-amber-300"
          >
            Apply
          </Link>
        </nav>
      </div>
    </header>
  )
}





