export default function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  return <LoginForm searchParams={searchParams} />
}

async function LoginForm({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const query = await searchParams
  return (
    <main className="hq-login">
      <form action="/api/auth/login/" method="post">
        <h1>SYSRYB Admin</h1>
        <p>Sign in to manage products, news, and inquiries.</p>
        {query.error ? <p className="hq-form-err">{query.error}</p> : null}
        <label>
          Email
          <input name="email" type="email" autoComplete="username" required />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </main>
  )
}
