import PropTypes from 'prop-types';
import React, { useState } from 'react';
import api from '../../api';
import ButtonArrow from '../../share-components/ButtonArrow';
import Logo from '../../share-components/Logo';

function LogIn({ navigateToDestination }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async () => {
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
            <div
                className="relative py-16 
                before:absolute before:inset-0 before:w-full before:h-[50%] before:bg-gray-200"
            >
                <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                    <div className="m-auto space-y-8 md:w-8/12 lg:w-full">
                        {/* <img
                            src={logo}
                            loading="lazy"
                            className="w-14 ml-4"
                            alt="tailus logo"
                        /> */}
                        <div className="opacity-75">
                            <Logo size={24} />
                        </div>
                        <div className="rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">
                            <div className="lg:grid lg:grid-cols-2">
                                <div className="rounded-lg lg:block" hidden>
                                    <img
                                        src="https://www.freakytravel.com/wp-content/uploads/hiker-ocean-extreme.jpg"
                                        className="rounded-l-xl object-cover"
                                        loading="lazy"
                                        height=""
                                        width=""
                                        alt="music mood"
                                    />
                                </div>
                                <div className="p-6 sm:p-16">
                                    <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                                        Sign in to your account
                                    </h2>
                                    <form
                                        className="space-y-8"
                                        onSubmit={(e) => onSubmit(e)}
                                    >
                                        <div className="space-y-2">
                                            <div className="text-gray-700">
                                                Email
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                                focus:ring-2 focus:ring-sky-300 focus:outline-none
                                                invalid:ring-2 invalid:ring-red-400"
                                                onChange={(e) => onChange(e)}
                                                value={email}
                                                placeholder="Email Address"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="text-gray-700">
                                                    Password
                                                </div>
                                                {/* <button
                                                    className="p-2 -mr-2"
                                                    type="reset"
                                                >
                                                    <span className="text-sm text-sky-500">
                                                        Forgot your password ?
                                                    </span>
                                                </button> */}
                                            </div>
                                            {/* <input
                                                type="password"
                                                name="pwd"
                                                id="pwd"
                                                className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                            focus:ring-2 focus:ring-sky-300 focus:outline-none
                                            invalid:ring-2 invalid:ring-red-400"
                                                placeholder="Password"
                                                minLength={4}
                                                value={password}
                                                onChange={(e) => onChange(e)}
                                                required
                                            /> */}
                                            <input
                                                className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                            focus:ring-2 focus:ring-sky-300 focus:outline-none
                                            invalid:ring-2 invalid:ring-red-400"
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                minLength={4}
                                                value={password}
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                        </div>

                                        {/* <input
                                            type="submit"
                                            className="w-full py-3 px-6 rounded-md bg-sky-600
                                        focus:bg-sky-700 active:bg-sky-500 text-white"
                                            value="Login"
                                        /> */}
                                        <div className="border-t" />
                                        <div className="w-full flex justify-center">
                                            <ButtonArrow
                                                title="Login"
                                                onClick={() => onSubmit()}
                                                outlined="false"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="text-center space-x-4">
                            <span>&copy; RoadTriper</span>
                            {/* <a href="#" className="text-sm hover:text-sky-900">
                                Contact
                            </a> */}
                            {/* <a href="#" className="text-sm hover:text-sky-900">
                                Privacy & Terms
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <p className="lead">
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
            </form> */}
        </>
    );
}

LogIn.propTypes = {
    navigateToDestination: PropTypes.func.isRequired,
};
export default LogIn;
