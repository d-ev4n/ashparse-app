
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/auth'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon, Globe, Code2, History, KeyRound } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate()
  const { resolvedTheme, setTheme } = useTheme()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await registerUser(form)

      navigate('/login', {
        state: {
          message: 'Account created successfully. Please sign in.',
          username: form.username,
        },
      })
    } catch (err) {
      const data = err.response?.data

      const messages = data
        ? Object.values(data).flat().join(' ')
        : 'Unable to create account. Please try again.'

      setError(messages)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: Globe,
      title: 'Website data extraction',
      description: 'Extract useful information from websites.'
    },
    {
      icon: Code2,
      title: 'Custom CSS selectors',
      description: 'Choose exactly which data you want to collect.'
    },
    {
      icon: History,
      title: 'Scraping history',
      description: 'Access and manage your previous scraping activities.'
    },
    {
      icon: KeyRound,
      title: 'API key management',
      description: 'Connect your applications using secure API keys.'
    }
  ]

  return (
    <main className="relative min-h-screen bg-background text-foreground">

      {/* Theme toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        className="absolute right-6 top-6 z-10 rounded-lg border border-border p-2 text-muted-foreground transition hover:bg-muted"
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-20 lg:px-12">

        {/* Ashparse introduction */}
        <section className="mx-auto w-full max-w-xl">

          <div className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight">
              Ashparse<span className="text-muted-foreground">.</span>
            </h1>

            <p className="mt-3 text-sm font-medium tracking-widest text-muted-foreground uppercase">
              Web Intelligence
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium text-muted-foreground">
              YOUR WEB DATA WORKSPACE
            </p>

            <h2 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Turn websites into useful information.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              Ashparse is a web scraping platform that helps you extract,
              organize and manage website data. Collect the information
              you need using custom CSS selectors and access it through
              your workspace or API.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div key={feature.title} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
                    <Icon size={18} className="text-muted-foreground" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="mt-12 text-xs text-muted-foreground">
            Extract smarter. Organize better.
          </p>
        </section>

        {/* Register form */}
        <section className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-border bg-surface p-7 shadow-sm sm:p-9">

            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Create your account
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Start extracting useful data from websites.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username, Email and Password */}
              {[
                { name: 'username', label: 'Username', type: 'text' },
                { name: 'email', label: 'Email address', type: 'email' },
                { name: 'password', label: 'Password', type: 'password' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mb-2 block text-sm font-medium">
                    {field.label}
                  </label>

                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    minLength={field.name === 'password' ? 8 : undefined}
                    autoComplete={
                      field.name === 'password'
                        ? 'new-password'
                        : field.name
                    }
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-foreground"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}

              {/* Error message */}
              {error && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
                  {error}
                </p>
              )}

              {/* Register button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg border-2 border-neutral-700 bg-neutral-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Register'}
              </button>

            </form>

            <div className="my-7 border-t border-border" />

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-foreground underline underline-offset-4 hover:opacity-70"
              >
                Sign in
              </Link>
            </p>

          </div>
        </section>

      </div>
    </main>
  )
}
