import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import SuggestionSearchItem from './SuggestionSearchItem';
import InputText from '../../share-components/InputText';
import Step from '../../share-components/Step';

function CityList({
    adressStartProps,
    adressEndProps,
    positionStartProps,
    positionEndProps,
    navigateToPlace,
}) {
    const [suggestionsStart, setSuggestionsStart] = useState([]);
    const [suggestionsEnd, setSuggestionsEnd] = useState([]);
    const [directionSteps, setDirectionSteps] = useState([]);
    const [error, setError] = useState('');

    // Inherited state
    const { positionStart, setPositionStart } = positionStartProps;
    const { positionEnd, setPositionEnd } = positionEndProps;

    const { adressStart, setAdressStart } = adressStartProps;
    const { adressEnd, setAdressEnd } = adressEndProps;

    const positionSelected =
        positionStart.lat &&
        positionStart.lng &&
        positionEnd.lat &&
        positionEnd.lng;

    useEffect(() => {
        if (positionSelected) {
            (async () => {
                const res = await api.geoService.getDirection(
                    positionStart,
                    positionEnd,
                );

                const { steps } =
                    res.content.features[0].properties.segments[0];

                setDirectionSteps(steps);
            })();
        }
    }, [positionStart, positionEnd]);

    // Optimize debounce : https://dmitripavlutin.com/react-throttle-debounce/
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, delay);
        };
    };

    const handleInputStart = async (e) => {
        if (e.target.value === '') {
            setSuggestionsStart([]);
            return;
        }
        try {
            const res = await api.geoService.autocompleteSearch(e.target.value);
            setSuggestionsStart(res);
        } catch (err) {
            setSuggestionsStart([]);
            setError(err.message);
        }
    };

    const handleInputEnd = async (e) => {
        if (e.target.value === '') {
            setSuggestionsEnd([]);
            return;
        }
        try {
            const res = await api.geoService.autocompleteSearch(e.target.value);
            setSuggestionsEnd(res);
        } catch (err) {
            setSuggestionsEnd([]);
            setError(err.message);
        }
    };

    const optimizedDebounceStart = useCallback(
        debounce(handleInputStart, 600),
        [],
    );

    const optimizedDebounceEnd = useCallback(debounce(handleInputEnd, 600), []);

    const setInputStart = (e) => {
        setAdressStart(e.target.value);
        optimizedDebounceStart(e);
    };

    const setInputEnd = (e) => {
        setAdressEnd(e.target.value);
        optimizedDebounceEnd(e);
    };

    const handleAdressOnclick = (isStart, pos, adress) => {
        if (isStart) {
            setAdressStart(adress);
            setPositionStart(pos);
            setSuggestionsStart([]);
        } else {
            setAdressEnd(adress);
            setPositionEnd(pos);
            setSuggestionsEnd([]);
        }
    };

    // const handleClick = async () => {
    //     try {
    //         const res = await api.tripService.createTrip();
    //         setNewTrip(res);
    //         setTimeout(() => navigateToDestination(), 1500);
    //     } catch (e) {
    //         setError(e.message);
    //         setNewTrip(null);
    //     }
    // };

    const saveItinerary = async () => {
        try {
            const itinerary = {
                coords: { adressStart, adressEnd, positionStart, positionEnd },
                directionSteps,
            };
            await api.tripService.saveItinerary(itinerary);
            navigateToPlace();
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <>
            <div className="my-3 mx-44 ">
                <div className="mb-12 mt-12">
                    <Step currentStep={1} />
                </div>

                {/* <h3>Start</h3>
                <input
                    onChange={(e) => optimizedDebounceStart(e)}
                    type="text"
                    placeholder="Start destination"
                /> */}

                <InputText
                    placeholder="Start destination"
                    onChange={(e) => setInputStart(e)}
                    value={adressStart}
                    // value=
                />
                <div className="relative">
                    {suggestionsStart.length > 0 && (
                        <div className="absolute z-10 bg-white w-full rounded-md p-3 border-2 border-gray-200 shadow-lg">
                            {suggestionsStart.map((elem) => (
                                <SuggestionSearchItem
                                    key={elem.osm_id}
                                    displayAddress={elem.display_address}
                                    onClick={() =>
                                        handleAdressOnclick(
                                            true,
                                            {
                                                lat: elem.lat,
                                                lng: elem.lon,
                                            },
                                            elem.display_address,
                                        )
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="my-3 mx-44">
                {/* <h3>End</h3>
                <input
                    onChange={(e) => optimizedDebounceEnd(e)}
                    type="text"
                    placeholder="Start destination"
                /> */}
                <InputText
                    placeholder="End destination"
                    onChange={(e) => setInputEnd(e)}
                    value={adressEnd}
                />
                <div className="relative">
                    {suggestionsEnd.length > 0 && (
                        <div className="absolute z-10 bg-white w-full rounded-md p-3 border-2 border-gray-200 shadow-lg">
                            {suggestionsEnd.map((elem) => (
                                <SuggestionSearchItem
                                    key={elem.osm_id}
                                    displayAddress={elem.display_address}
                                    onClick={() =>
                                        handleAdressOnclick(
                                            false,
                                            {
                                                lat: elem.lat,
                                                lng: elem.lon,
                                            },
                                            elem.display_address,
                                        )
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div>
                {/* <h4>Direction steps</h4> */}
                {/* <p>Total {directionSteps.length}</p> */}
                {directionSteps.length > 0 &&
                    directionSteps.map((step) => (
                        <div>
                            {/* <p>Distance {step.distance}</p>
                            <p>Duration {step.duration}</p> */}
                            <p>{step.name}</p>
                            <p>{step.instruction}</p>
                            <p>
                                -----------------------------------------------------------------------
                            </p>
                        </div>
                    ))}
            </div>
            <p>{error}</p>

            {positionSelected && (
                <button type="button" onClick={saveItinerary}>
                    Next
                </button>
            )}
        </>
    );
}

CityList.propTypes = {
    adressEndProps: PropTypes.shape({
        adressEnd: PropTypes.string,
        setAdressEnd: PropTypes.func,
    }).isRequired,
    adressStartProps: PropTypes.shape({
        adressStart: PropTypes.string,
        setAdressStart: PropTypes.func,
    }).isRequired,
    navigateToPlace: PropTypes.func.isRequired,
    positionEndProps: PropTypes.shape({
        // eslint-disable-next-line react/forbid-prop-types
        positionEnd: PropTypes.object,
        setPositionEnd: PropTypes.func,
    }).isRequired,
    positionStartProps: PropTypes.shape({
        // eslint-disable-next-line react/forbid-prop-types
        positionStart: PropTypes.object,
        setPositionStart: PropTypes.func,
    }).isRequired,
};

export default CityList;
