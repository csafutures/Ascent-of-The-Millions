"use client";
import { useState, FormEvent } from "react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ""


export default function Section1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch(`${APP_URL}/author/send-message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Your message has been sent successfully!'
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container">
        {/*Begin Page Header*/}
        <div className="row">
          <div className="col-12 archive-header text-center pt-3 pb-3 mb-5">
            <h1 className="mb-3">Contact Us</h1>
            <p className="archive-intro">We have a dedicated support center for all of your support needs. We usually get back to you within 12-24 hours.</p>
          </div>
        </div>
        {/*End Page Header*/}
        <article className="mb-5">
          <div className="row">
            <div className="col-md-6 pe-lg-5">
              <h4 className="spanborder">
                <span>Contact details</span>
              </h4>
              <p>
                If you have any questions, feel free to reach out to us using the contact information below or by filling out the contact form. We're here to help and look forward to hearing from you!
              </p>
              <div className="sidebar-widget widget-about">
                <p>
                  <i className="icon-map" /> USA
                </p>
                <p>
                  <i className="icon-paper-plane" /> info@theascentofthemillions.org
                </p>
                <p>
                  <i className="icon-phone" /> +250-787-468-002
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <h4 className="spanborder">
                <span>Get in touch</span>
              </h4>
              <p>
                Use the form below to send us a message and we will get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="form-contact">
                {submitStatus.type && (
                  <div className={`alert alert-${submitStatus.type === 'success' ? 'success' : 'danger'} mb-4`}>
                    {submitStatus.message}
                  </div>
                )}
                <p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <textarea
                    name="message"
                    cols={40}
                    rows={10}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  <button
                    type="submit"
                    className="submit-btn btn btn-success"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </p>
              </form>
            </div>
          </div>
        </article>
        {/*entry-content*/}
      </div>
      {/*container*/}
    </>
  );
}
