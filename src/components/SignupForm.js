import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import '../App.css';
import axios from 'axios';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameInput: '',
            emailInput: '',
            passwordInput: '',
            usernameValid: '',
            confirmedPasswordInput: '',
            passwordValid: '',
            confirmedPasswordValid: ''
        }
    }

    toggle = () => {
        this.setState({
            usernameInput: '',
            emailInput: '',
            passwordInput: ''
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleInput = e => {
        let x = { ...e };
        let delay = setTimeout(() => this.handleUsernameCheck(x), 300);
        this.setState({
            [e.target.id]: e.target.value,
            delay
        })
    }

    handleUsernameCheck = e => {
        const newUsername = e.target.value;
        if (newUsername.length >= 6) {
            axios.get(
                `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
            ).then(response => {
                if (response.data.valid) {
                    this.setState({
                        usernameValid: true
                    });
                } else {
                    this.setState({
                        usernameValid: false
                    });
                }
            });
        }
    };

    handleInput2 = e => {
        let x = { ...e };
        let delay = setTimeout(() => this.handleConfirmedPasswordCheck(x), 300);
        this.setState({
            [e.target.id]: e.target.value,
            delay
        })
    }

    handleConfirmedPasswordCheck = e => {
        if (this.state.passwordInput !== this.state.confirmedPasswordInput) {
            this.setState({
                confirmedPasswordValid: false
            })
        }
        else {
            this.setState({
                confirmedPasswordValid: true
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: this.state.usernameInput,
                email: this.state.emailInput,
                password: this.state.passwordInput
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error.response) // so that we know what went wrong if the request failed
            })
        alert('Sign up successful!');
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} toggle={this.props.x}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type="username" name="username" id="usernameInput" value={this.state.usernameInput} onChange={e => {
                        if (this.state.delay) {
                            clearTimeout(this.state.delay);
                        }
                        this.handleInput(e);
                    }}
                        {...(this.state.usernameInput.length >= 6
                            ? this.state.usernameValid
                                ? { valid: true }
                                : { invalid: true }
                            : this.state.usernameInput.length > 0
                                ? { invalid: true }
                                : "")}
                    />
                    <FormFeedback
                        {...(this.state.usernameInput.length > 0 && this.state.usernameInput.length >= 6
                            ? this.state.usernameValid
                                ? { valid: true }
                                : { invalid: true }
                            : { invalid: true })}
                    >
                        {this.state.usernameInput.length >= 6
                            ? this.state.usernameValid
                                ? "Sweet, this username is available!"
                                : "Sorry, this username is taken!"
                            : "Must be minimum 6 characters"}
                    </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>Email Address</Label>
                    <Input type="email" name="email" id="emailInput" value={this.state.emailInput} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" name="password" id="passwordInput" value={this.state.passwordInput} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input type="password" name="confirmedPassword" id="confirmedPasswordInput" value={this.state.confirmedPasswordInput} onChange={e => {
                        if (this.state.delay) {
                            clearTimeout(this.state.delay);
                        }
                        this.handleInput2(e);
                    }}
                        {...(this.state.confirmedPasswordInput.length >= 6
                            ? this.state.confirmedPasswordValid
                                ? { valid: true }
                                : { invalid: true }
                            : this.state.confirmedPasswordInput.length > 0
                                ? { invalid: true }
                                : "")} />
                <FormFeedback
                    {...(this.state.confirmedPasswordInput.length > 0 && this.state.confirmedPasswordInput >= 6
                        ? this.state.confirmedPasswordValid
                            ? { valid: true }
                            : { invalid: true }
                        : { invalid: true })}
                >
                    {this.state.confirmedPasswordInput >= 6
                        ? this.state.confirmedPasswordValid
                            ? "OK"
                            : "Password does not match" 
                        : ""}
                </FormFeedback>
                </FormGroup>
                <Button disabled={this.state.usernameInput.length === 0 || this.state.emailInput.length === 0 || this.state.passwordInput.length <= 6}>Sign Up</Button>
            </Form>
        )
    }
}