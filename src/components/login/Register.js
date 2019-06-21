import React, { Component } from 'react';
import { Form, Button, Container, Grid, Message, Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { register } from './LoginHandler'
import loginCss from './loginCss.css'
import logo from '../../logo.svg'

export default class Register extends Component {
    state = {
        email: '',
        username: '',
        password: ''
    }

    submit = () => {
        register(this.state)
            .then((newUser) => {
                this.props.onRegister(newUser)
                this.props.history.push('/regulate')
            })
    }

    render() {
        return (
            <div className="auth-container">
                <Form className="register-form" onSubmit={this.submit}>
                    <img src={logo} id="reg-logo" className="App-logo" alt="logo" />
                    <Form.Field
                        control="input"
                        type="text"
                        label="Username"
                        placeholder="Username"
                        onChange={(e) => this.setState({ username: e.target.value })}
                    />
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
                    <Button content="Register" />
                    <Message className="auth-message">
                        Already registered? <Link to="/login">Log In</Link>
                    </Message>
                </Form>

            </div>
        )
    }
}