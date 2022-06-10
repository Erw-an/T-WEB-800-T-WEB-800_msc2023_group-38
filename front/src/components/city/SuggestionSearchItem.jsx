import PropTypes from 'prop-types';
import React from 'react';

export default function SuggestionSearchItem({ onClick, displayAddress }) {
    return (
        <div className="suggestion-search-item">
            <button onClick={onClick} type="button">
                {displayAddress}
            </button>
        </div>
    );
}

SuggestionSearchItem.propTypes = {
    displayAddress: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
