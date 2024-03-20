import { LinearProgress, Snackbar } from '@mui/material';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from 'react';
import * as yup from "yup";
function Contact() {

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const formData = {'name':'','email':'','subject':'','message':''}
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(null);
  const [errormsg, setErrorMsg] = useState('');
  const handleClose = (event, reason)=>{
      if(reason === 'clickaway') {
          return
      }
      setOpen(false)
  }
  const submitSchema = yup.object().shape({
    name: yup.string().required("your name goes here 😊"),
    email: yup.string().email("invalid email").required("you know the drill.."),
    message: yup.string().required("this is required..kinda 😬"),
  });

  const sendEmail = async (values,{setSubmitting,resetForm})=> {
    setSubmitting(true);
    await sleep(7000);
    try {
        await axios.post("https://portfolio-be-three.vercel.app/api/v1/feedback/", values)
        .then((res)=>{setSubmitting(false);setFailed(false);setOpen(true); resetForm() })
    
   } catch (error) {
    setSubmitting(false);
    setFailed(true);
    setOpen(true);
    setErrorMsg(`${error.response ? error.response.statusText : error.message}`)
   }
}

    return (
      <div className="unslate_co--section" id="contact-section">
      <div className="container">
        <div className="section-heading-wrap text-center mb-5">
            <h2 className="heading-h2 text-center divider"><span className="gsap-reveal">contact me</span></h2>
            <span className="gsap-reveal"><img src="assets/images/divider.png" alt="divider" width="76" /></span>
        </div>

        <div className="row justify-content-between">
            <div className="col-md-6">
            <Formik onSubmit={sendEmail} initialValues={formData} validationSchema={submitSchema}>  
                {({ isSubmitting }) => (
                <Form className="form-outline-style-v1" id="contactForm">
                {isSubmitting && <LinearProgress color='inherit' />}
                {failed === true && <Snackbar message={`Something went wrong. ${errormsg}`} autoHideDuration={4500} open={open}
                            onClose={handleClose}
                            anchorOrigin={{horizontal:'center',vertical:'bottom'}} sx={{marginBottom: '250px',}} />}
                             
                {failed === false && <Snackbar message="Sent Successfully" autoHideDuration={4000} open={open} onClose={handleClose}
                            anchorOrigin={{horizontal:'center',vertical:'bottom'}} sx={{marginBottom: '250px',}} />}

                    <div className="form-group row mb-0">
                    <div className="col-lg-6 form-group gsap-reveal">
                        <Field name="name" type="text" className="form-control" id="name" autoComplete='on' placeholder="name"/>
                        <ErrorMessage name="name" />
                    </div>

                    <div className="col-lg-6 form-group gsap-reveal">
                        <Field name='email' autoComplete='off'className="form-control" id="email" placeholder="email" type="email" />
                        <ErrorMessage name="email" />
                    </div>

                    <div className="col-lg-6 form-group gsap-reveal">
                        <Field name='subject' className="form-control" id="subject" autoComplete='off' placeholder="subject" type="text" />
                    </div>

                    <div className="col-lg-12 form-group gsap-reveal">  
                        <Field name="message" id="message"  as="textarea" cols="5" rows="5" className="form-control" autoComplete='off' placeholder="type message here" />
                        <ErrorMessage name="message"  />
                    </div>

                    </div>
                    <div className="form-group row gsap-reveal">
                    <div className="col-md-12 d-flex align-items-center">
                        <button type="submit" className="btn btn-outline-pill btn-custom-light mr-3" disabled={isSubmitting}>SEND MESSAGE</button>
                    </div>
                    </div>
                </Form>
                )}
            </Formik>
            </div>

            <div className="col-md-4">
            <div className="contact-info-v1">
                <div className="gsap-reveal d-block">
                <span className="d-block contact-info-label">address</span>
                <address className="contact-info-val">nairobi, <br/>kenya</address>
                </div>
            </div>
            </div>
        </div>
      </div>
  </div>
     );
}

export default Contact;