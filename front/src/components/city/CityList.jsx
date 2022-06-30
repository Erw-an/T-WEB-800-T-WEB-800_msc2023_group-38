/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import SuggestionSearchItem from './SuggestionSearchItem';
import InputText from '../../share-components/InputText';
import ButtonArrow from '../../share-components/ButtonArrow';
import CardSm from '../../share-components/CardSm';

function CityList({
    adressStartProps,
    adressEndProps,
    positionStartProps,
    positionEndProps,
    setStepState,
    dirStepsProps,
}) {
    const [suggestionsStart, setSuggestionsStart] = useState([]);
    const [suggestionsEnd, setSuggestionsEnd] = useState([]);

    const [error, setError] = useState('');

    const [newTrip, setNewTrip] = useState(null);
    console.log('newTrip:', newTrip);

    // Inherited state
    const { dirSteps, setDirSteps } = dirStepsProps;
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

                setDirSteps(steps);
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

    const createNewTrip = async () => {
        try {
            const res = await api.tripService.createTrip();
            setNewTrip(res);
        } catch (e) {
            setError(e.message);
            setNewTrip(null);
        }
    };

    const saveItinerary = async () => {
        await createNewTrip();
        try {
            const itinerary = {
                coords: { adressStart, adressEnd, positionStart, positionEnd },
                dirSteps,
            };
            await api.tripService.saveItinerary({ itinerary });
            setStepState(2);
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <>
            <div className="bg-white min-h-60 py-12 rounded-lg shadow-md mt-3">
                <div className=" mx-44 ">
                    <InputText
                        placeholder="Start destination"
                        onChange={(e) => setInputStart(e)}
                        value={adressStart}
                        type="text"
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
                    <InputText
                        placeholder="End destination"
                        onChange={(e) => setInputEnd(e)}
                        value={adressEnd}
                        type="text"
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
                <div className="flex justify-center w-full mt-12">
                    <div />
                    <ButtonArrow
                        title="Next"
                        onClick={saveItinerary}
                        active={positionSelected}
                    />
                </div>
            </div>

            <div className="mt-12">
                {directionSteps.length > 0 && (
                    <>
                        <div className="text-center mb-6">
                            <h2 className=" text-lg font-medium sm:text-xl">
                                Roadmap
                            </h2>
                        </div>
                        {directionSteps.map((step) => (
                            <div className="my-3 mx-60">
                                <CardSm
                                    title={step.name}
                                    desc={step.instruction}
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
            <p>{error}</p>
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
    dirStepsProps: PropTypes.shape({
        dirSteps: PropTypes.any,
        setDirSteps: PropTypes.func,
    }).isRequired,
    navigateToPlace: PropTypes.func.isRequired,
    positionEndProps: PropTypes.shape({
        positionEnd: PropTypes.object,
        setPositionEnd: PropTypes.func,
    }).isRequired,
    positionStartProps: PropTypes.shape({
        positionStart: PropTypes.object,
        setPositionStart: PropTypes.func,
    }).isRequired,
    setStepState: PropTypes.func.isRequired,
};

export default CityList;
