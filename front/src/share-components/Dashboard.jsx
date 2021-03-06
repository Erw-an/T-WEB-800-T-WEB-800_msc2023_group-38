import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';
import navigation from '../utils/navigation';
import plane from '../utils/icons/plane.png';
import earth from '../utils/icons/earth.png';

function Dashboard({ children, noDashbordPath }) {
    const path = useLocation().pathname;

    const activeStyle =
        'relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-purple-600 to-cyan-400';
    const disableStyle =
        'px-4 py-3 flex items-center rounded-xl hover:bg-gray-100 duration-150  space-x-4 text-gray-600 group';
    const imgStyle = { filter: 'invert(1)' };

    return (
        <>
            {!noDashbordPath.includes(path) ? (
                <>
                    <aside className="shadow-lg ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
                        <div>
                            <div className="-mx-6 px-6 py-4 flex justify-center opacity-60 mt-3 -mb-3 ">
                                <a href="/" title="home" className="flex">
                                    <div className="relative w-16 h-16">
                                        <img
                                            src={plane}
                                            alt="plane"
                                            className="animate-spin-slow absolute h-16"
                                        />
                                        <img
                                            src={earth}
                                            alt="earth"
                                            className=" absolute h-16"
                                        />
                                    </div>
                                </a>
                            </div>

                            <div className="mt-4 text-center">
                                <div className="m-auto rounded-full lg:w-28 lg:h-28 bg-gray-50 border-2 border-gray-300 text-center ">
                                    <div className="mt-8 font-bold text-4xl opacity-50">
                                        {jwtDecode(
                                            sessionStorage.getItem('token'),
                                        )
                                            .email.substring(0, 1)
                                            .toUpperCase()}
                                    </div>
                                </div>
                                <h5 className="hidden mt-4 text-lg font-semibold text-gray-600 lg:block">
                                    {
                                        jwtDecode(
                                            sessionStorage.getItem('token'),
                                        ).email
                                    }
                                </h5>
                                <span className="hidden text-gray-400 lg:block">
                                    User
                                </span>
                            </div>

                            <ul className="space-y-2 tracking-wide mt-8">
                                {navigation.map((nav) => (
                                    <>
                                        <li key={nav.title}>
                                            <NavLink
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? activeStyle
                                                        : disableStyle
                                                }
                                                to={nav.path}
                                                ariaLabel="dashboard"
                                            >
                                                <img
                                                    src={nav.icon}
                                                    alt={nav.title}
                                                    className=" w-6 "
                                                    style={
                                                        nav.path === path
                                                            ? imgStyle
                                                            : undefined
                                                    }
                                                />

                                                <span className="-mr-1 font-medium">
                                                    {nav.title}
                                                </span>
                                            </NavLink>
                                        </li>

                                        <hr />
                                    </>
                                ))}
                            </ul>
                        </div>

                        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                            <a
                                type="button"
                                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
                                href="/"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span className="group-hover:text-gray-700">
                                    Logout
                                </span>
                            </a>
                        </div>
                    </aside>
                    <div className="min-h-screen bg-gray-50 ml-auto  lg:w-[75%] xl:w-[80%] 2xl:w-[85%] ">
                        <div className="sticky top-0 h-16 border-b bg-white lg:py-2.5 z-50 shadow-md">
                            <div className="px-6 flex items-center justify-between space-x-4 2xl:container ">
                                <h5
                                    hidden
                                    className="text-2xl text-gray-600 font-medium lg:block"
                                >
                                    {path}
                                </h5>
                                <button
                                    type="button"
                                    className="w-12 h-16 -mr-2 border-r lg:hidden"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 my-auto"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <div className="flex space-x-4">
                                    {/* <!--search bar --> */}
                                    <div hidden className="md:block">
                                        <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                                            <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                                <svg
                                                    xmlns="http://ww50w3.org/2000/svg"
                                                    className="w-4 fill-current"
                                                    viewBox="0 0 35.997 36.004"
                                                >
                                                    <path
                                                        id="Icon_awesome-search"
                                                        dataName="search"
                                                        d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                                                    />
                                                </svg>
                                            </span>
                                            <input
                                                type="search"
                                                name="leadingIcon"
                                                id="leadingIcon"
                                                placeholder="Search here"
                                                className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
                                            />
                                        </div>
                                    </div>
                                    {/* <!--/search bar --> */}
                                    <button
                                        type="button"
                                        ariaLabel="search"
                                        className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden"
                                    >
                                        <svg
                                            xmlns="http://ww50w3.org/2000/svg"
                                            className="w-4 mx-auto fill-current text-gray-600"
                                            viewBox="0 0 35.997 36.004"
                                        >
                                            <path
                                                id="Icon_awesome-search"
                                                dataName="search"
                                                d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        ariaLabel="chat"
                                        className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 m-auto text-gray-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        ariaLabel="notification"
                                        className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 m-auto text-gray-600"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pt-8 2xl:container">
                            {children}
                        </div>
                    </div>
                </>
            ) : (
                <div>{children}</div>
            )}
            ;
        </>
    );
}

Dashboard.propTypes = {
    children: PropTypes.shape({
        tags: PropTypes.shape({
            name: PropTypes.element,
        }),
    }).isRequired,

    noDashbordPath: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default Dashboard;
