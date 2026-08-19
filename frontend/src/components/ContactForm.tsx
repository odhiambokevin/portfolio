"use client"
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { backendUrl } from "@/lib/constants";
import { toast } from "sonner";

export default function ContactForm() {
  const formData = { name: '', email: '', subject: '', message: '' };
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  const [errormsg, setErrorMsg] = useState('');

  const submitSchema = yup.object().shape({
    name: yup.string().required("your name goes up here 😊"),
    email: yup.string().email("invalid email").required("you know the drill.."),
    message: yup.string().required("please write a brief message"),
  });

  return (
    <Formik
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        await sleep(3000);
        try {
          await axios.post(`${backendUrl}/api/feedback/`, values)
            .then(() => { toast.success("sent successfully"); setSubmitting(false); resetForm(); });
        } catch (error) {
          setSubmitting(false);
          if (error instanceof Error) {
            setErrorMsg(`${error.message}`);
            toast.error(errormsg);
          } else if (error && typeof error === 'object' && 'message' in error) {
            setErrorMsg(`${(error as any).message}`);
            toast.error(errormsg);
          } else if (typeof error === "string") {
            setErrorMsg(`${error}`);
            toast.error(errormsg);
          } else {
            toast.error('something went wrong');
          }
        }
      }}
      initialValues={formData}
      validationSchema={submitSchema}
    >
      {({ isSubmitting }) => (
        <Form className="relative lg:ml-auto space-y-4">
          {isSubmitting && (
            <div className="flex flex-wrap gap-16 max-w-md mx-auto mt-12">
              <div className="spinner-4 absolute w-12 animate-spin top-[70%] left-[45%]">
                <div className="absolute top-0 left-0  bg-accent w-4 h-4 rounded-full"></div>
                <div className="absolute top-1/2 right-0 bg-slate-400 w-4 h-4 rounded-full"></div>
              </div>
            </div>
          )}

          <Field type='text' placeholder='name' name="name" id="name"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none" />
          <ErrorMessage name="name" />

          <Field type='email' placeholder='email' name="email" id="email"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none" />
          <ErrorMessage name="email" />

          <Field type='text' placeholder='subject' name="subject" id="subject"
            className="w-full rounded-md py-3 px-4 bg-slate-100 text-slate-900 text-sm border border-gray-200 focus:border-slate-900 outline-none" />

          <Field placeholder='message' rows={6} as="textarea" name="message" id="message"
            className="w-full rounded-md px-4 bg-slate-100 text-slate-900 text-sm pt-3 border border-gray-200 focus:border-slate-900 outline-none" />
          <ErrorMessage name="message" />

          <button type='submit' disabled={isSubmitting}
            className="text-white bg-accent/90 hover:bg-accent tracking-wide rounded-md text-sm font-medium px-4 py-3 w-full cursor-pointer !mt-2 border-0">
            Send message
          </button>
        </Form>
      )}
    </Formik>
  );
}