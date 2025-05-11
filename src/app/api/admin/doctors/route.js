import { db } from '../../../../../lib/db'
import { NextResponse } from 'next/server'

// GET: Fetch all doctors
export async function GET() {
    const [rows] = await db.execute("SELECT * FROM doctors")
    return NextResponse.json(rows)
}

// POST: Add a new doctor
export async function POST(req) {
    try {
        const { name, specialization, email, phone, available } = await req.json()
        const safeAvailable = available === '' ? null : available;
        await db.execute(
            'INSERT INTO doctors (name, specialization, email, phone, available) VALUES (?, ?, ?, ?, ?)',
            [name, specialization, email, phone, safeAvailable]
        )
        return NextResponse.json({ success: true, message: 'Doctor added successfully' })
    } catch (error) {
        console.error('Error adding doctor:', error)
        return NextResponse.json({ error: 'Failed to add doctor' }, { status: 500 })
    }
}
