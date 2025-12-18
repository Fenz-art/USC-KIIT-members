const API_URL = import.meta.env.VITE_API_URL || ''

export async function api<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const url = typeof input === 'string' && input.startsWith('/') ? `${API_URL}${input}` : input
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Request failed')
  }

  return (await res.json()) as T
}






