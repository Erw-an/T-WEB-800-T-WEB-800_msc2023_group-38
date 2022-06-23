import React from 'react';
import PropTypes from 'prop-types';

function Card({ onChange, placeholder, value, type }) {
    return (
        <label
            className="relative w-full block p-3 border-2 border-gray-200 rounded-lg bg-white"
            htmlFor="name"
            style={{
                input__webkit_autofill: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                input__webkit_autofill_hover: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                input__webkit_autofill_focus: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                textarea__webkit_autofill: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                textarea__webkit_autofill_hover: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                textarea__webkit_autofill_focus: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                select__webkit_autofill: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                select__webkit_autofill_hover: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
                select__webkit_autofill_focus: {
                    border: '1px solid green',
                    WebkitTextFillColor: 'green',
                    WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                    transition: 'background-color 5000s ease-in-out 0s',
                },
            }}
        >
            <input
                onChange={(e) => onChange(e)}
                className="w-full px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-blue-200 !outline-none border-none focus:ring-0 peer"
                id="name"
                type={type}
                placeholder={placeholder}
                value={value}
                style={{
                    input__webkit_autofill: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    input__webkit_autofill_hover: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    input__webkit_autofill_focus: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    textarea__webkit_autofill: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    textarea__webkit_autofill_hover: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    textarea__webkit_autofill_focus: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    select__webkit_autofill: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    select__webkit_autofill_hover: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    select__webkit_autofill_focus: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                }}
            />

            <span
                style={{
                    input__webkit_autofill: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    input__webkit_autofill_hover: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    input__webkit_autofill_focus: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    textarea__webkit_autofill: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    textarea__webkit_autofill_hover: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    textarea__webkit_autofill_focus: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    select__webkit_autofill: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    select__webkit_autofill_hover: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                    select__webkit_autofill_focus: {
                        border: '1px solid green',
                        WebkitTextFillColor: 'green',
                        WebkitBoxShadow: '0 0 0px 1000px #000 inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                }}
                className="absolute text-xs font-medium text-gray-500 transition-all left-3 peer-focus:text-xs peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm"
            >
                {placeholder}
            </span>
        </label>
    );
}

Card.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};
export default Card;
