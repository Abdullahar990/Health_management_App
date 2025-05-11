'use client';

import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await fetch('/api/admin/doctors');
            if (!response.ok) throw new Error('Failed to fetch doctors');
            const data = await response.json();
            setDoctors(data); // ✅ use data directly
        } catch (error) {
            console.error('Error fetching doctors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/doctors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Failed to add doctor');

            // Reset form and refresh doctor list
            setFormData({ name: '', specialty: '', email: '', phone: '' });
            setShowForm(false);
            fetchDoctors();
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    return (
        <div>
            <h1 className={styles.pageTitle}>Manage Doctors</h1>

            <button
                className={styles.submitButton}
                style={{ marginBottom: '20px' }}
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? 'Cancel' : 'Add New Doctor'}
            </button>

            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="specialty">specialty</label>
                        <input
                            type="text"
                            id="specialty"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Add Doctor</button>
                </form>
            )}

            {loading ? (
                <p>Loading doctors...</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>specialty</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.doctor_id}>
                                <td>{doctor.doctor_id}</td>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialty}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.phone}</td>
                                <td>
                                    <button className={`${styles.actionButton} ${styles.editButton}`}>
                                        Edit
                                    </button>
                                    <button className={`${styles.actionButton} ${styles.deleteButton}`}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
