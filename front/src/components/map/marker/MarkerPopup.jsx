import PropTypes from 'prop-types';
import React from 'react';
import { Popup } from 'react-leaflet';

function MarkerPopup({ elem, onClickMarker }) {
    return (
        <Popup>
            <div className="poup-text">{elem.tags.name}</div>
            <button type="button" onClick={() => onClickMarker(elem)}>
                Button
            </button>
        </Popup>
    );
}

MarkerPopup.propTypes = {
    elem: PropTypes.shape({
        tags: PropTypes.shape({
            name: PropTypes.string,
        }),
    }).isRequired,
    onClickMarker: PropTypes.func.isRequired,
};
export default MarkerPopup;
