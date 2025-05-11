import {db} from '../../../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const { user_id, doctor_id, appointment_type, appointment_date, appointment_time, location } = await req.json()
    const [rows] = await db.execute(
        `INSERT INTO appointments (user_id, doctor_id, appointment_type, appointment_date, appointment_time, location)
    VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, doctor_id, appointment_type, appointment_date, appointment_time, location]
    )
    return NextResponse.json({ success: true, appointmentId: rows.insertId })
}
