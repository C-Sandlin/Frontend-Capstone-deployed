import React, { Component } from 'react';
import { Form, Button, Container, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { login } from '../login/LoginHandler'
import loginCss from './loginCss.css'
import logo from '../../logo.svg'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    submit = () => {
        login(this.state.email, this.state.password)
            .then(user => {
                this.props.onLogin(user);
                this.props.history.push('/regulate')
            })
    }


    render() {
        return (
            <div className="login-container">
                <Form className="login-form" onSubmit={this.submit}>
                    <img src={logo} className="App-logo" id="login-logo" alt="logo" />
                    <Form.Field
                        control="input"
                        type="email"
                        label="Email Address"
                        placeholder="username@email.com"
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                    <Form.Field
                        control="input"
                        type="password"
                        label="Password"
                        placeholder="*******"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    <Button content="Login" />
                    <Message className="auth--message">
                        Not registered yet? <Link to="/register">Sign Up</Link>
                    </Message>
                </Form>
            </div >
        )
    }
}