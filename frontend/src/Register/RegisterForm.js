import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './RegisterForm.scss';

class RegisterForm extends Component {

    state = {
        fields: {
            email: '',
            username: '',
            password: ''
        },
        errors: {}
    }

    handleValidation() {
        let { fields } = this.state;
        let formIsValid = true
        let errors = {};

        // Email validation
        if (!fields['email']) {
            errors['email'] = 'L\'email ne peut pas être vide';
        } else if (!fields['email'].match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i)) {
            errors['email'] = 'L\'email n\'est pas valide';
        }

        // Username validation
        if (!fields['username']) {
            errors['username'] = 'Le nom d\'utilisateur ne peut pas être vide';
        } else if (fields['username'].length < 3) {
            errors['username'] = 'Le nom d\'utilisateur doit contenir au minimum 3 caractères';
        } else if (fields['username'].length > 60) {
            errors['username'] = 'Le nom d\'utilisateur doit contenir au maximum 60 caractères';
        }

        // Password validation
        if (!/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(fields['password'])) {
            errors['password'] = 'Le mot de passe doit contenir minimum 8 caractères avec au minimum un caractères minuscule et majuscule, un chiffre et un caractère spécial !@#$%^&*';
        }

        if (Object.keys(errors).length !== 0) {
            formIsValid = false;
        }
        this.setState({ errors });

        return formIsValid;
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            let { fields } = this.state;
            axios.post('http://localhost:3000/api/auth/signup', {
                email: fields['email'],
                username: fields['username'],
                password: fields['password']
            })
                .then(res => {
                    const date = new Date();
                    date.setTime(date.getTime() + (24*60*60*1000));
                    document.cookie = 'token=' + res.data.token + '; expires=' + date.toUTCString() + '; path=/; SameSite=Strict';
                    window.location.href = "/";
                })
                .catch(err => {
                    let errors = {};
                    for (let error of err.response.data.error.errors) {
                        errors[error.path] = error.message;
                    }
                    this.setState({ errors });
                })
        }
    }

    handleChange = (event) => {
        let { fields } = this.state;
        fields[event.target.name] = event.target.value.trim();
        this.setState({
            fields
        })
    }

    render() {
        let { errors } = this.state;

        return (
            <form action="" method="post" noValidate onSubmit={this.handleFormSubmit}>

                {errors['g'] ? (
                    <div className="login-form__errors">
                        { errors['g'] }
                    </div>
                ) : '' }

                <label htmlFor="email" className="register-form__label">Email</label>
                <input type="email" name="email" id="email" className="register-form__input" value={this.state.fields['email']} onChange={this.handleChange}/>
                {errors['email'] ? (
                    <span className="login-form__error">{errors['email']}</span>
                ) : '' }

                <label htmlFor="username" className="register-form__label">Nom d'utilisateur</label>
                <input type="text" name="username" id="username" className="register-form__input" value={this.state.fields['username']} onChange={this.handleChange}/>
                {errors['username'] ? (
                    <span className="login-form__error">{errors['username']}</span>
                ) : '' }

                <label htmlFor="password" className="register-form__label">Mot de passe</label>
                <input type="password" name="password" id="password" className="register-form__input" value={this.state.fields['password']} onChange={this.handleChange}/>
                {errors['password'] ? (
                    <span className="login-form__error">{errors['password']}</span>
                ) : '' }

                <p className="register-form__legal-requirements">
                    En cliquant sur Accepter et s'inscrire, vous acceptez les
                    <Link to="/register"> Conditions d'utilisation</Link>, la
                    <Link to="/register"> Politique de confidentialité</Link> et la
                    <Link to="/register"> Politique relative aux cookies</Link> de Groupomania
                </p>

                <input type="submit" value="Accepter et s'inscrire" className="register-form__submit"/>
            </form>
        );
    }
}

export default RegisterForm;
