import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
// import ButtonArrow from '../../share-components/ButtonArrow';
import Logo from '../../share-components/Logo';
import InputText from '../../share-components/InputText';
import ButtonArrow from '../../share-components/ButtonArrow';

function LogIn({ navigateToDestination }) {
    const [emailState, setemailState] = useState();
    const [passwordState, setpasswordState] = useState();
    const [firstNameState, setfirstNameState] = useState();
    const [lastNameState, setlastNameState] = useState();

    const onSubmit = async () => {
        try {
            await api.authService.signUp({
                firstName: firstNameState,
                lastName: lastNameState,
                email: emailState,
                password: passwordState,
            });
            navigateToDestination();
        } catch (err) {
            console.error('err:', err);
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
                        <div className="opacity-75 relative">
                            <Logo size={16} />
                        </div>
                        <div className="rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl">
                            <div className="lg:grid lg:grid-cols-2">
                                <div className="rounded-lg lg:block" hidden>
                                    <img
                                        src="https://source.unsplash.com/BaCmEa2hy8g/1380x1310"
                                        className="rounded-l-xl object-cover"
                                        loading="lazy"
                                        height=""
                                        width=""
                                        alt="music mood"
                                    />
                                </div>

                                <div className="p-6 sm:p-12">
                                    <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                                        Create your account
                                    </h2>
                                    <div className="flex items-center justify-between">
                                        <div className="text-gray-700" />
                                        <Link className="p-2 -mr-2" to="/">
                                            <span className="text-sm text-indigo-600">
                                                I already have a account ?
                                            </span>
                                        </Link>
                                    </div>
                                    <form
                                        className="space-y-8"
                                        onSubmit={(e) => onSubmit(e)}
                                    >
                                        <div className="space-y-2">
                                            <InputText
                                                type="email"
                                                name="email"
                                                id="email"
                                                onChange={(e) =>
                                                    setemailState(
                                                        e.target.value,
                                                    )
                                                }
                                                value={emailState}
                                                placeholder="Email Address"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2 ">
                                            <div className="flex w-full">
                                                <InputText
                                                    type="text"
                                                    name="firstName"
                                                    id="firstName"
                                                    onChange={(e) =>
                                                        setfirstNameState(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={firstNameState}
                                                    placeholder="First Name"
                                                    required
                                                />
                                                <div className="mx-1" />
                                                <InputText
                                                    type="text"
                                                    name="lastName"
                                                    id="lastName"
                                                    onChange={(e) =>
                                                        setlastNameState(
                                                            e.target.value,
                                                        )
                                                    }
                                                    value={lastNameState}
                                                    placeholder="Last Name"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <InputText
                                                className="block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300
                                            focus:ring-2 focus:ring-sky-300 focus:outline-none
                                            invalid:ring-2 invalid:ring-red-400"
                                                type="password"
                                                placeholder="Password"
                                                name="password"
                                                minLength={4}
                                                value={passwordState}
                                                onChange={(e) =>
                                                    setpasswordState(
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="border-t" />
                                        <div className="w-full flex justify-center">
                                            <ButtonArrow
                                                title="Create Account"
                                                onClick={() => onSubmit()}
                                                outlined="true"
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
