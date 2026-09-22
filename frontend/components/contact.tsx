"use client"
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { backendUrl } from "@/lib/constants"
import { toast } from "sonner";
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'


export function ContactSection() {
    const formData = { name: '', email: '', subject: '', message: '' };
    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
    const [errormsg, setErrorMsg] = useState('');
    const [sent, setSent] = useState(false);
    const submitSchema = yup.object().shape({
    name: yup.string().required("your name goes up here 😊"),
    email: yup.string().email("invalid email").required("you know the drill.."),
    message: yup.string().required("please write a brief message"),
  });



    return (
    <section className="section-shell contact" id="contact">
        <div className="contact-intro">
            <p className="eyebrow">jambo</p>
            <h2>let&apos;s build <em>solutions</em>.</h2>
            <p>do you have a project requiring a <em>digital solution?</em> i&apos;d love to hear more about it as we enage and move it from idea to a digital product
            </p>
        </div>

        <Formik
        onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        await sleep(3000);
        setErrorMsg('');
        setSent(false);
        try {
          await axios.post(`${backendUrl}/api/feedback/`, values)
            .then(() => { toast.success("sent successfully"); setSubmitting(false);setSent(true); resetForm(); });
        } catch (error) {
          setSubmitting(false);

          if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message ?? error.message;
            setErrorMsg(message);
            toast.error(message);
          } else if (error instanceof Error) {
            setErrorMsg(error.message);
            toast.error(error.message);
          } else {
            toast.error('something went wrong');
          }
        }
      }}
      initialValues={formData}
      validationSchema={submitSchema}
        >
            {({ isSubmitting }) => (
            <Form className="contact-form" action="mailto:odhiambosiaya@proton.me" method="post" encType="text/plain">
                {isSubmitting && (
            <div className="flex flex-wrap gap-16 max-w-md mx-auto mt-12">
              <div className="spinner-4 absolute w-12 animate-spin top-[70%] left-[45%]">
                <div className="absolute top-0 left-0  bg-accent w-4 h-4 rounded-full"></div>
                <div className="absolute top-1/2 right-0 bg-slate-400 w-4 h-4 rounded-full"></div>
              </div>
            </div>
          )}
                <div className="form-row">
                  <div className="form-field">
                    <label>name
                        <Field name="name" type="text" autoComplete="name" placeholder="your name" required />
                        <ErrorMessage name="name">
                          {(message) => <div className="field-error">{message}</div>}
                        </ErrorMessage>
                    </label>
                  </div>

                  <div className="form-field">
                      <label>email
                          <Field name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                          <ErrorMessage name="email">
                            {(message) => <div className="field-error">{message}</div>}
                          </ErrorMessage>
                      </label>
                  </div>
                </div>
                <div className="form-field">
                <label>subject<Field name="subject" type="text" placeholder="subject" required />
                </label>
                </div>
<div className="form-field">
                    <label>message
                        <Field name="message" rows={5} placeholder="what do you have in mind?" required />
                            <ErrorMessage name="message">
                              {(message) => <div className="field-error">{message}</div>}
                            </ErrorMessage>
                    </label>
                    </div>
                <button className="button button-dark" type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="form-spinner" size={16} aria-hidden="true" /> sending...</> : <>send message <ArrowUpRight size={16} /></>}
                </button>
            </Form>
            )}
        
        
        </Formik>
    </section>)
}
