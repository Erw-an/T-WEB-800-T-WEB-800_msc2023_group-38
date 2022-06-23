import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Planner from './components/planner/Planner';
import CityList from './components/city/CityList';
import LogIn from './components/auth/LogIn';
import Trip from './components/trip/Trip';
import Itinerary from './components/itinerary/Itinerary';

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
                            navigateToDestination={() => {
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
                        />
                    }
                />
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
                            navigateToItinerary={() => {
                                navigateTo('/itinerary');
                            }}
                        />
                    }
                />
                <Route
                    path="/itinerary"
                    element={
                        <Itinerary
                            positionEnd={positionEnd}
                            adresseStart={adressStart}
                            adresseEnd={adressEnd}
                            dirSteps={dirSteps}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
