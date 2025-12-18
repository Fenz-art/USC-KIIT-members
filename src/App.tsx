import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Navbar } from './components/layout/Navbar'
import { LandingPage } from './pages/LandingPage'
import { FillFormPage } from './pages/FillFormPage'
import { MembersPage } from './pages/MembersPage'
import { AdminPage } from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<FillFormPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
