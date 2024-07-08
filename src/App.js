import './App.css';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Label, Form, FormGroup, Input, FormFeedback } from 'reactstrap';

function App() {
  const validationSchema = Yup.object({
    fname: Yup.string().required('First name is required'),
    lname: Yup.string().required('Last name is required'),
    age: Yup.string().required('Age is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      age: '',
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: values.fname,
          lastName: values.lname,
          age: values.age,
          email: values.email,
          password: values.password
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
          formik.resetForm();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  });

  return (
    <div className="App">
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup>
          <Label for="fname">First name:</Label>
          <Input
            type='text'
            id='fname'
            name='fname'
            value={formik.values.fname}
            onChange={formik.handleChange}
            invalid={formik.touched.fname && formik.errors.fname ? true : false}
          />
          <FormFeedback>{formik.errors.fname}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="lname">Last name:</Label>
          <Input
            type='text'
            id='lname'
            name='lname'
            value={formik.values.lname}
            onChange={formik.handleChange}
            invalid={formik.touched.lname && formik.errors.lname ? true : false}
          />
          <FormFeedback>{formik.errors.lname}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="age">Age:</Label>
          <Input
            type='text'
            id='age'
            name='age'
            value={formik.values.age}
            onChange={formik.handleChange}
            invalid={formik.touched.age && formik.errors.age ? true : false}
          />
          <FormFeedback>{formik.errors.age}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input
            type='text'
            id='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            invalid={formik.touched.email && formik.errors.email ? true : false}
          />
          <FormFeedback>{formik.errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password:</Label>
          <Input
            type='password'
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            invalid={formik.touched.password && formik.errors.password ? true : false}
          />
          <FormFeedback>{formik.errors.password}</FormFeedback>
        </FormGroup>
        <Button type="submit">Add user</Button>
      </Form>
    </div>
  );
}

export default App;
