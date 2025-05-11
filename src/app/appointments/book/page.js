'use client'
import { useState, useEffect } from 'react'
import styles from '../Appointments.module.css'

export default function BookAppointment() {
    const [form, setForm] = useState({
        user_id: '', // Added user_id field
        doctor_id: '',
        appointment_type: '', // Changed from 'type' to match backend
        appointment_date: '', // Changed from 'date' to match backend
        appointment_time: '', // Changed from 'time' to match backend
        location: '' // Added location field
    })
    const [doctors, setDoctors] = useState([])
    const [appointmentTypes, setAppointmentTypes] = useState([
        'General Checkup',
        'Consultation',
        'Follow-up',
        'Vaccination',
        'Specialist Referral'
    ])

    const [locations, setLocations] = useState([
        'Main Hospital',
        'Downtown Clinic',
        'North Branch',
        'South Branch',
        'Telehealth'
    ])

    useEffect(() => {
        // Set doctors (you may replace with fetch later)
        setDoctors([
            { doctor_id: '1', name: 'Dr. Smith', specialization: 'General Medicine' },
            { doctor_id: '2', name: 'Dr. Johnson', specialization: 'Cardiology' },
            { doctor_id: '3', name: 'Dr. Williams', specialization: 'Pediatrics' }
        ])

        // Fetch logged-in user to get user_id
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/auth/login')
                const data = await res.json()

                if (res.ok && data.user?.user_id) {
                    setForm(prev => ({ ...prev, user_id: 1 }))
                } else {
                    console.error('User not logged in or missing user_id')
                }
            } catch (error) {
                console.error('Failed to fetch user info:', error)
            }
        }

        fetchUser()
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
                    <label htmlFor="appointment_type">Appointment Type</label>
                    <select
                        id="appointment_type"
                        value={form.appointment_type}
                        onChange={e => setForm({ ...form, appointment_type: e.target.value })}
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
                        <label htmlFor="appointment_date">Date</label>
                        <input
                            id="appointment_date"
                            type="date"
                            value={form.appointment_date}
                            onChange={e => setForm({ ...form, appointment_date: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="appointment_time">Time</label>
                        <input
                            id="appointment_time"
                            type="time"
                            value={form.appointment_time}
                            onChange={e => setForm({ ...form, appointment_time: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <select
                        id="location"
                        value={form.location}
                        onChange={e => setForm({ ...form, location: e.target.value })}
                        required
                    >
                        <option value="">Select location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <button className={styles.appointmentButton} type="submit">
                    Book Appointment
                </button>
            </form>
        </div>
    )
}