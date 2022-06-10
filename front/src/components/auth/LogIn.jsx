import PropTypes from 'prop-types';
import React, { useState } from 'react';
import api from '../../api';

function LogIn({ navigateToDestination }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.authService.signIn(formData);
            navigateToDestination();
        } catch (err) {
            console.error('Display an signin fail');
        }
        console.log('User registred');
    };

    return (
        <>
            <p className="lead">
                <i className="fas fa-user" /> Sign into your Account
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength={4}
                        value={password}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
        </>
    );
}

LogIn.propTypes = {
    navigateToDestination: PropTypes.func.isRequired,
};
export default LogIn;
