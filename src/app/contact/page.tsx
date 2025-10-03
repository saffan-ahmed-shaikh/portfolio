"use client";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Icon from "../../components/Icon";

type ContactValues = { fullname: string; email: string; message: string };

const ContactSchema = Yup.object().shape({
  fullname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  message: Yup.string().min(10, "Too short").required("Required"),
});

export default function ContactPage() {
  async function handleSubmit(
    values: ContactValues,
    { setSubmitting, resetForm }: FormikHelpers<ContactValues>
  ) {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to send");
      resetForm();
      alert("Message sent — I'll get back to you soon.");
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <article className="contact" data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.584061248181!2d72.946660!3d19.038686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6e8e1e11e1f%3A0x5e108d3e1a830a0f!2s19.038686%2C%2072.946660!5e0!3m2!1sen!2sin!4v1685554062352!5m2!1sen!2sin"
            width="600"
            height="450"
            loading="lazy"
            style={{ border: 0 }}
            allowFullScreen
          />
        </figure>
      </section>

      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        <Formik
          initialValues={{ fullname: "", email: "", message: "" }}
          validationSchema={ContactSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }: { isSubmitting: boolean }) => (
            <Form className="form" data-form>
              <div className="input-wrapper">
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <Field
                    name="fullname"
                    type="text"
                    className="form-input"
                    placeholder="Full name"
                    data-form-input
                  />
                  <ErrorMessage
                    name="fullname"
                    render={(msg) => (
                      <span
                        style={{
                          color: "red",
                          display: "inline-block",
                          margin: "4px 8px",
                          fontSize: 12,
                        }}
                      >
                        {msg}
                      </span>
                    )}
                  />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <Field
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="Email address"
                    data-form-input
                  />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <span
                        style={{
                          color: "red",
                          display: "inline-block",
                          margin: "4px 8px",
                          fontSize: 12,
                        }}
                      >
                        {msg}
                      </span>
                    )}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 25 }}>
                <Field
                  as="textarea"
                  name="message"
                  className="form-input"
                  placeholder="Your Message"
                  data-form-input
                />
                <ErrorMessage
                  name="message"
                  render={(msg) => (
                    <span
                      style={{
                        color: "red",
                        display: "inline-block",
                        margin: "4px 8px", // preserve previous spacing below textarea
                        fontSize: 12,
                      }}
                    >
                      {msg}
                    </span>
                  )}
                />
              </div>

              <button
                className="form-btn"
                type="submit"
                disabled={isSubmitting}
                data-form-btn
              >
                <Icon name="paper-plane" />
                <span>Send Message</span>
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </article>
  );
}
