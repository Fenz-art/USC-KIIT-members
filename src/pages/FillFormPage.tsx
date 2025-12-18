import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFileUpload } from '../hooks/useFileUpload'
import { api } from '../lib/api'
import type { Domain } from '../types/member'

const domains: Domain[] = ['RPA & AI', 'Web Dev', 'App Dev', 'Design']

export function FillFormPage() {
  const navigate = useNavigate()
  const { upload, uploading, error: uploadError } = useFileUpload()

  const [name, setName] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [instagramUrl, setInstagramUrl] = useState('')
  const [domain, setDomain] = useState<Domain | ''>('')
  const [isLead, setIsLead] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setSubmitSuccess(false)

    if (!name || !domain) {
      setSubmitError('Please fill in your name and select a domain.')
      return
    }

    try {
      setSubmitting(true)

      let imageUrl = profileImageUrl
      if (!imageUrl) {
        if (!file) {
          setSubmitError('Please upload a profile photo.')
          setSubmitting(false)
          return
        }
        imageUrl = await upload(file)
        setProfileImageUrl(imageUrl)
      }

      await api('/api/members', {
        method: 'POST',
        body: JSON.stringify({
          name,
          linkedinUrl: linkedinUrl || undefined,
          githubUrl: githubUrl || undefined,
          instagramUrl: instagramUrl || undefined,
          domain,
          isLead,
          profileImageUrl: imageUrl,
        }),
      })

      setSubmitSuccess(true)
      setTimeout(() => {
        navigate('/members')
      }, 1200)
    } catch (err: any) {
      setSubmitError(err?.message ?? 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-50">Tell us about you</h1>
          <p className="mt-2 text-sm text-slate-400">
            Fill this form to join the USC KIIT members list. Your profile will appear publicly once approved by the admin.
          </p>
        </header>

        <form
          className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">
              Name<span className="text-red-400"> *</span>
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-uscGold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-100">
                LinkedIn URL
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-uscGold"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-100">
                GitHub URL
              </label>
              <input
                type="url"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-uscGold"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">
              Instagram URL
            </label>
            <input
              type="url"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-uscGold"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-100">
                Domain<span className="text-red-400"> *</span>
              </label>
              <select
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-uscGold"
                value={domain}
                onChange={(e) => setDomain(e.target.value as Domain | '')}
                required
              >
                <option value="">Select domain</option>
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                id="isLead"
                type="checkbox"
                checked={isLead}
                onChange={(e) => setIsLead(e.target.checked)}
                className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-uscGold focus:ring-uscGold"
              />
              <label htmlFor="isLead" className="text-sm text-slate-100">
                I&apos;m a lead for this domain
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-100">
              Profile photo<span className="text-red-400"> *</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0]
                setFile(f ?? null)
                setProfileImageUrl('')
              }}
              className="text-sm text-slate-200 file:mr-4 file:rounded-lg file:border-0 file:bg-uscGold file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-slate-950 hover:file:bg-amber-300"
            />
            <p className="text-xs text-slate-500">
              Max 5MB. We&apos;ll crop it to a square avatar around your face.
            </p>
            {(uploading || profileImageUrl) && (
              <p className="text-xs text-slate-300">
                {uploading ? 'Uploading image...' : 'Image uploaded.'}
              </p>
            )}
            {uploadError && (
              <p className="text-xs text-red-400">Upload error: {uploadError}</p>
            )}
          </div>

          {submitError && (
            <p className="text-sm text-red-400">{submitError}</p>
          )}
          {submitSuccess && (
            <p className="text-sm text-emerald-400">
              Submitted! You&apos;ll be redirected to the members page once approved.
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              disabled={submitting || uploading}
              className="rounded-full bg-uscGold px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-uscGold/30 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
            <p className="text-xs text-slate-500">
              Approved profiles will appear on the public Members page.
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}






