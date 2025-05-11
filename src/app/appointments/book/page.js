'use client'
import { useState, useEffect } from 'react'
import styles from '../Appointments.module.css'

export default function BookAppointment() {
    const [form, setForm] = useState({
        user_id: '1', 
        doctor_id: '',
        appointment_type: '',
        appointment_date: '',
        appointment_time: '',
        location: 'Online',
    })
    const [doctors, setDoctors] = useState([])
    const [appointmentTypes, setAppointmentTypes] = useState([
        'General Checkup',
        'Consultation',
        'Follow-up',
        'Vaccination',
        'Specialist Referral'
    ])

    useEffect(() => {
        // In a real app, fetch doctors from API
        setDoctors([
            { doctor_id: '1', name: 'Dr. Smith', specialization: 'General Medicine' },
            { doctor_id: '2', name: 'Dr. Johnson', specialization: 'Cardiology' },
            { doctor_id: '3', name: 'Dr. Williams', specialization: 'Pediatrics' }
        ])
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/appointments/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            })

            if (response.ok) {
                window.location.href = '/confirmation/appointment-booked'
            }
        } catch (error) {
            console.error('Booking error:', error)
        }
    }

    return (
        <div className={styles.appointmentContainer}>
            <h1 className={styles.appointmentTitle}>Book an Appointment</h1>

            <form className={styles.appointmentForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="type">Appointment Type</label>
                    <select
                        id="type"
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                        required
                    >
                        <option value="">Select appointment type</option>
                        {appointmentTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="doctor">Select Doctor</label>
                    <select
                        id="doctor"
                        value={form.doctor_id}
                        onChange={e => setForm({ ...form, doctor_id: e.target.value })}
                        required
                    >
                        <option value="">Select doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.doctor_id} value={doctor.doctor_id}>
                                {doctor.name} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Date</label>
                        <input
                            id="date"
                            type="date"
                            value={form.date}
                            onChange={e => setForm({ ...form, date: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="time">Time</label>
                        <input
                            id="time"
                            type="time"
                            value={form.time}
                            onChange={e => setForm({ ...form, time: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <button className={styles.appointmentButton} type="submit">
                    Book Appointment
                </button>
            </form>
        </div>
    )
}