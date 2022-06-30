// import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// comp
import Step from '../../share-components/Step';
import CityList from '../city/CityList';
import Planner from '../planner/Planner';
import MapView from '../map/MapView';
import ItinerarySaver from '../itinerary/ItinerarySaver';

function StepContainer() {
    const [stepState, setStepState] = useState(1);

    useEffect(() => {
        setStepState(1);
    }, []);

    const [selected, setSelected] = useState({
        label: 'Enjoy 🍇',
        value: 'enjoy',
    });

    const [positionStart, setPositionStart] = useState({
        lat: null,
        lng: null,
    });

    const [positionEnd, setPositionEnd] = useState({
        lat: null,
        lng: null,
    });

    const [adressStart, setAdressStart] = useState('');
    const [adressEnd, setAdressEnd] = useState('');

    const [data, setData] = useState({});

    return (
        <div>
            <Step currentStep={stepState} setStep={setStepState} />

            {stepState === 1 && (
                <div className="p-12">
                    <div className="text-center mb-6">
                        <h2 className=" text-lg font-medium sm:text-xl">
                            What will be your next destination ?
                        </h2>
                    </div>
                    <CityList
                        positionStartProps={{
                            positionStart,
                            setPositionStart,
                        }}
                        positionEndProps={{
                            positionEnd,
                            setPositionEnd,
                        }}
                        adressStartProps={{
                            adressStart,
                            setAdressStart,
                        }}
                        adressEndProps={{ adressEnd, setAdressEnd }}
                        setStepState={setStepState}
                    />
                </div>
            )}
            {stepState === 2 && (
                <div className="p-12">
                    <div className="text-center mb-6">
                        <h2 className=" text-lg font-medium sm:text-xl">
                            What do you want to do there ?
                        </h2>
                    </div>
                    <div className="bg-white p-12 min-h-60 rounded-lg shadow-md mt-3">
                        <Planner
                            sharedState={{
                                positionEnd,
                                setPositionEnd,
                                positionStart,
                                setPositionStart,
                                adressStart,
                                adressEnd,
                            }}
                            setData={setData}
                            setSelected={setSelected}
                            setStepState={setStepState}
                            selected={selected}
                        />
                    </div>
                </div>
            )}
            {stepState === 3 && (
                <div className="bg-white min-h-60 rounded-lg shadow-md mt-3 w-full">
                    <MapView
                        data={data}
                        lat={positionEnd.lat}
                        lng={positionEnd.lng}
                        // amenity={selected.label}
                    />
                </div>
            )}
            {stepState === 4 && (
                <ItinerarySaver
                    positionEnd={positionEnd}
                    adresseStart={adressStart}
                    adresseEnd={adressEnd}
                    dirSteps={dirSteps}
                />
            )}
        </div>
    );
}

StepContainer.propTypes = {};
export default StepContainer;
