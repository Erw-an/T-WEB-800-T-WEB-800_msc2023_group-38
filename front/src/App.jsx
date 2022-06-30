import { Routes, Route, useNavigate } from 'react-router-dom';
import React from 'react';
// import CityList from './components/city/CityList';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';

import './index.css';
import Trip from './components/trip/Trip';

import Dashboard from './share-components/Dashboard';
import StepContainer from './components/stepContainer/StepContainer';
import TripItem from './components/trip/TripItem';

function App() {
    const navigateTo = useNavigate();

    const noDashbordPath = ['/', '/signUp'];

    return (
        <div className="App">
            <Dashboard noDashbordPath={noDashbordPath}>
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
                        path="/signUp"
                        element={
                            <SignUp
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
                                done={false}
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
                            <StepContainer />
                            // </Dashboard>
                        }
                    />
                    <Route
                        path="/trip-done"
                        element={
                            // <Dashboard title="Planifier">
                            <Trip
                                navigateToDestination={() => {
                                    navigateTo('/destination');
                                }}
                            />
                            // </Dashboard>
                        }
                    />
                    <Route path="/trip/:id" element={<TripItem />} />
                </Routes>
            </Dashboard>
        </div>
    );
}

export default App;
