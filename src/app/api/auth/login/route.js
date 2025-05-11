import { db } from '../../../../../lib/db'
import { NextResponse } from 'next/server'

let sessionUser = null // Temporary in-memory session (for dev only)

// POST: Authenticate user
export async function POST(req) {
    try {
        const { email, password } = await req.json()

        const [rows] = await db.execute(
            'SELECT * FROM users WHERE email = ? AND password_hash = ?',
            [email, password]
        )

        const user = rows[0]

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
        }

        // Simulate session (in-memory for demo only)
        sessionUser = user

        const { password_hash, ...safeUser } = user
        return NextResponse.json({ success: true, user: safeUser })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}

// GET: Return logged-in user info (demo only)
export async function GET() {
    if (!sessionUser) {
        return NextResponse.json({ error: 'Not logged in' }, { status: 401 })
    }

    const { password_hash, ...safeUser } = sessionUser
    return NextResponse.json({ user: safeUser })
}
