import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Planner from './components/planner/Planner';
import CityList from './components/city/CityList';
import LogIn from './components/auth/LogIn';
import './index.css';
import Trip from './components/trip/Trip';
import Dashboard from './share-components/Dashboard';

function App() {
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

    const navigateTo = useNavigate();
    const location = useLocation();
    console.log('location:', location);

    return (
        <div className="App">
            <Dashboard path={location.pathname}>
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
                            // <Dashboard title="My Trips">
                            <Trip
                                navigateToDestination={() => {
                                    navigateTo('/destination');
                                }}
                            />
                            // </Dashboard>
                        }
                    />
                    <Route
                        path="/destination"
                        element={
                            // <Dashboard title="Planifier">
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
                                navigateToPlace={() => {
                                    navigateTo('/planner');
                                }}
                            />
                            // </Dashboard>
                        }
                    />
                    <Route
                        path="/planner"
                        element={
                            // <Dashboard title="Planner">
                            <Planner
                                sharedState={{
                                    positionEnd,
                                    setPositionEnd,
                                    positionStart,
                                    setPositionStart,
                                    adressStart,
                                    adressEnd,
                                }}
                            />
                            // </Dashboard>
                        }
                    />
                </Routes>
            </Dashboard>
        </div>
    );
}

export default App;
