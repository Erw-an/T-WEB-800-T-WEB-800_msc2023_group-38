import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Planner from './components/planner/Planner';
import CityList from './components/city/CityList';
import LogIn from './components/auth/LogIn';
import Trip from './components/trip/Trip';
import ItinerarySaver from './components/itinerary/ItinerarySaver';
import TripItem from './components/trip/TripItem';

function App() {
    const [positionStart, setPositionStart] = useState({
        lat: null,
        lng: null,
    });

    const [positionEnd, setPositionEnd] = useState({
        lat: null,
        lng: null,
    });

    const [dirSteps, setDirSteps] = useState([]);

    const [adressStart, setAdressStart] = useState('');
    const [adressEnd, setAdressEnd] = useState('');

    const navigateTo = useNavigate();

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <LogIn
                            navigateToTrip={() => {
                                navigateTo('/trip');
                            }}
                        />
                    }
                />
                <Route
                    path="/trip"
                    element={
                        <Trip
                            navigateToDestination={() => {
                                navigateTo('/destination');
                            }}
                            navigateToTripItem={(id) => {
                                navigateTo(`/trip/${id}`);
                            }}
                        />
                    }
                />

                <Route path="/trip/:id" element={<TripItem />} />
                <Route
                    path="/destination"
                    element={
                        <CityList
                            positionStartProps={{
                                positionStart,
                                setPositionStart,
                            }}
                            positionEndProps={{ positionEnd, setPositionEnd }}
                            adressStartProps={{ adressStart, setAdressStart }}
                            adressEndProps={{ adressEnd, setAdressEnd }}
                            dirStepsProps={{ dirSteps, setDirSteps }}
                            navigateToPlace={() => {
                                navigateTo('/planner');
                            }}
                        />
                    }
                />
                <Route
                    path="/planner"
                    element={
                        <Planner
                            sharedState={{
                                positionEnd,
                                setPositionEnd,
                                positionStart,
                                setPositionStart,
                                adressStart,
                                adressEnd,
                            }}
                            navigateToItinerarySaver={() => {
                                navigateTo('/itinerarySaver');
                            }}
                        />
                    }
                />
                <Route
                    path="/itinerarySaver"
                    element={
                        <ItinerarySaver
                            positionEnd={positionEnd}
                            adresseStart={adressStart}
                            adresseEnd={adressEnd}
                            dirSteps={dirSteps}
                            navigateToTrip={() => {
                                navigateTo('/trip');
                            }}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
