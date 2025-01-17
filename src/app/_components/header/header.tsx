import { useSession, signIn, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header>
      <nav>
        <p>
          {session ? (
            <>
              Signed in as {session?.user?.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            <>
              Not signed in <br />
              <button onClick={() => signIn()}>Sign in</button>
            </>
          )}
        </p>
      </nav>
    </header>
  )
}