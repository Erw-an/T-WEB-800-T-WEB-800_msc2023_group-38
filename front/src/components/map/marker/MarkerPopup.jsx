import PropTypes from 'prop-types';
import React from 'react';
import { Popup } from 'react-leaflet';
import api from '../../../api';

function MarkerPopup({ elem, setError, setMsg }) {
    const onClick = async () => {
        try {
            await api.tripService.savePlace({
                content: { ...elem },
            });
            setMsg('Element added');
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <Popup>
            <div className="poup-text">{elem.tags.name}</div>
            <button type="button" onClick={onClick}>
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
    setError: PropTypes.func.isRequired,
    setMsg: PropTypes.func.isRequired,
};
export default MarkerPopup;
