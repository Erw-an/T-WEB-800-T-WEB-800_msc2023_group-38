import PropTypes from 'prop-types';
import React from 'react';

function RadioGroup({ values, setSelected, selected }) {
    console.log('values:', values);
    console.log('selected:', selected);
    return (
        <div className="grid grid-cols-2 gap-8">
            {values.map((value) => (
                <div key={value.value} className="relative">
                    <input
                        className="hidden group peer"
                        type="radio"
                        name={value.value}
                        value={value.value}
                        id={value.value}
                        onClick={() => setSelected(value)}
                    />
                    <label
                        htmlFor={value.value}
                        className={`block p-4 text-sm font-medium transition-colors border border-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 ${
                            selected.label === value.label &&
                            'border-blue-500 ring-1 ring-blue-500'
                        } `}
                    >
                        <span> {value.label} </span>

                        <span className="block mt-1 text-xs text-gray-500">
                            {value.value}
                        </span>
                    </label>

                    {selected.label === value.label && (
                        <svg
                            className="absolute w-5 h-5 text-blue-600 opacity-0 top-4 right-4 peer-checked:opacity-100"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </div>
            ))}
        </div>
    );
}

RadioGroup.propTypes = {
    setSelected: PropTypes.func.isRequired,
    selected: PropTypes.objectOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};
export default RadioGroup;
