"use client";
import React from 'react';
import styles from './page.module.css';
import { Calendar, Clock, CheckSquare, User, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Homepage = () => {
    const router = useRouter()
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <h1>NHM</h1>
                    <p>National Health Mission</p>
                </div>
                <div className={styles.auth}>
                    <button className={styles.loginBtn} onClick={()=>router.push('/auth/login')}>Login</button>
                    <button className={styles.registerBtn} onClick={()=>router.push('/auth/register')}>Register</button>
                    <button className={styles.loginBtn} onClick={()=>router.push('/dashboard')}>Dashboard</button>
                </div>
            </header>

            <main>
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h2>Streamlined Healthcare<br />Appointments & Bookings</h2>
                        <p>Schedule your medical appointments online with ease. The National Health Mission's digital solution for accessible healthcare.</p>
                        <button className={styles.ctaButton}>Book an Appointment</button>
                    </div>
                </section>

                <section className={styles.features}>
                    <h3>Why Choose Our Booking System?</h3>
                    <div className={styles.featureCards}>
                        <div className={styles.featureCard}>
                            <Calendar size={48} color="#1e88e5" />
                            <h4>Easy Scheduling</h4>
                            <p>Book appointments 24/7 at your convenience</p>
                        </div>
                        <div className={styles.featureCard}>
                            <Clock size={48} color="#1e88e5" />
                            <h4>Save Time</h4>
                            <p>No more waiting in lines or on hold</p>
                        </div>
                        <div className={styles.featureCard}>
                            <CheckSquare size={48} color="#1e88e5" />
                            <h4>Appointment Tracking</h4>
                            <p>Get reminders and manage all your bookings</p>
                        </div>
                    </div>
                </section>

                <section className={styles.howItWorks}>
                    <h3>How It Works</h3>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>1</div>
                            <h4>Register</h4>
                            <p>Create your account with basic details</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>2</div>
                            <h4>Find a Service</h4>
                            <p>Browse available healthcare services</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>3</div>
                            <h4>Book Appointment</h4>
                            <p>Select date and time that works for you</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.stepNumber}>4</div>
                            <h4>Get Confirmation</h4>
                            <p>Receive booking details via SMS and email</p>
                        </div>
                    </div>
                </section>

                <section className={styles.testimonials}>
                    <h3>What Our Users Say</h3>
                    <div className={styles.testimonialCards}>
                        <div className={styles.testimonialCard}>
                            <p>"The NHM booking system has made it so much easier for me to schedule regular check-ups for my family."</p>
                            <div className={styles.testimonialAuthor}>
                                <User size={20} />
                                <span>Priya Sharma</span>
                            </div>
                        </div>
                        <div className={styles.testimonialCard}>
                            <p>"I no longer have to wait in long queues to see my doctor. This system has saved me hours of waiting time."</p>
                            <div className={styles.testimonialAuthor}>
                                <User size={20} />
                                <span>Rahul Patel</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h4>National Health Mission</h4>
                        <p>Making healthcare accessible for all citizens</p>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Contact Us</h4>
                        <p><Phone size={16} /> Helpline: 1800-XXX-XXXX</p>
                        <p>Email: support@nhm.gov.in</p>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">About NHM</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p>© 2025 National Health Mission. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;