import React, { useEffect } from 'react';
import { Jumbotron, Row, Col, FormGroup, FormControl, FormLabel, Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import validate from './validate';

const renderField = ({ input, label, type, meta: { touched, error }, placeholder }) => {
    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <FormControl {...input} placeholder={placeholder} type={type} />
            {touched && error && <span className={'errorColor'} >{error}</span>}
        </FormGroup>
    )
}

let Login = (props) => {
    const { handleSubmit } = props;

    return (
        <div className='login-cont bg-info'>
            <Jumbotron className='jumbo-cont'>
                <Row>
                    <Col>
                        <h1>Login</h1>
                        <hr />
                        <Form onSubmit={handleSubmit(submit)}>
                            <Field
                                name="email"
                                type='email'
                                component={renderField}
                                placeholder={'janedoe@gmail.com'}
                                label={'Email'}
                            />
                            <Field
                                name="password"
                                type='password'
                                component={renderField}
                                placeholder={'password'}
                                label={'Password'}
                            />
                            <Button type='submit'>Login</Button>
                        </Form>
                        <hr />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to={'/signup'}>Register</Link>
                    </Col>
                </Row>
            </Jumbotron>
        </div>
    )
}

Login = reduxForm({
    form: 'login',
    validate
})(Login);

export default Login;