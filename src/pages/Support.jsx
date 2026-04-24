import React, { useState } from 'react'
import './Support.css'

export default function Support() {
  const [status, setStatus] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch("https://formspree.io/f/xzdkedqv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    })

    if (response.ok) {
      setStatus("SUCCESS")
      setFormData({
        name: "",
        subject: "",
        email: "",
        message: ""
      })
    } else {
      setStatus("ERROR")
    }
  }

  return (
    <div className="support page-transition">
      <section className="support-section section">
        <div className="container">
          <h1 className="page-title">Support / Contact</h1>

          <div className="support-content">
            {/* Contact Form */}
            <div className="contact-form-container">
              <h2 className="section-subtitle">Get in Touch</h2>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select a Subject</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Bug Report">Bug Report</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="General Question">General Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="form-textarea"
                  />
                </div>

                <button type="submit" className="btn submit-btn">
                  Send Message
                </button>

                {status === "SUCCESS" && (
                  <p className="success-message">
                    Thanks! We'll get back to you soon.
                  </p>
                )}

                {status === "ERROR" && (
                  <p className="error-message">
                    Oops! Something went wrong.
                  </p>
                )}
              </form>
            </div>

            {/* Information Section */}
            <div className="info-section">
              <h2 className="section-subtitle">Delivery Information</h2>
              <div className="info-content">
                <p>
                  Delivery times are typically 7-10 business days within Amarillo city limits due to waiting on shirts to be shipped to us.
                  So with every order please just have patience as we are working on your order.
                </p>
              </div>

              <h2 className="section-subtitle">Issues With Your Order?</h2>
              <div className="info-content">
                <p>
                  If there was any issues with your order such as wrong item, damaged item, or missing item please reach out to us so we can fix the issue as soon as possible.
                </p>
                <p>
                  Please use the contact form above or reach out directly at:
                </p>
                <p className="email-contact">
                  806threads@gmail.com
                </p>
              </div>

              <h2 className="section-subtitle">Define Defiance</h2>
              <div className="info-content">
                <p>
                  Now available!
                  Check out our <a href="/shop" className="info-link">Shop</a> page to see the latest designs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}