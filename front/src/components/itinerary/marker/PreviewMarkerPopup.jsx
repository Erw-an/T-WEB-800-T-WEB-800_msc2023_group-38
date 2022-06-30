import PropTypes from 'prop-types';
import React from 'react';
import { Popup } from 'react-leaflet';

function MarkerPopup({ elem }) {
    return (
        <Popup>
            <div className="poup-text">{elem.tags.name}</div>
        </Popup>
    );
}

MarkerPopup.propTypes = {
    elem: PropTypes.shape({
        tags: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
};
export default MarkerPopup;
