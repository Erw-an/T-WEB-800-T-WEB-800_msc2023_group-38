import axiosInstance from './axiosInstance';

const getTrips = async () => {
    try {
        const { data } = await axiosInstance.get('/trip');
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createTrip = async () => {
    try {
        const { data } = await axiosInstance.post('/trip', {});
        sessionStorage.setItem('tripId', data.id);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const saveItinerary = async ({ itinerary }) => {
    try {
        const tripId = sessionStorage.getItem('tripId');
        if (!tripId && !parseInt(tripId, 10) > 0) throw new Error();
        const { data } = await axiosInstance.patch(
            `/trip/${tripId}/itinerary`,
            { content: { itinerary } },
        );
        sessionStorage.setItem('itineraryId', data.id);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getItinerary = async () => {
    try {
        const tripId = sessionStorage.getItem('tripId');
        const itId = sessionStorage.getItem('itineraryId');

        if (!(tripId && itId)) {
            throw new Error('Information missing');
        }
        const { data } = await axiosInstance.get(
            `/trip/${tripId}/itinerary/${itId}`,
        );

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getItineraries = async () => {
    try {
        const tripId = sessionStorage.getItem('tripId');

        if (!tripId) {
            throw new Error('Information missing');
        }
        const { data } = await axiosInstance.get(`/trip/${tripId}/itinerary/`);

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const saveItineraryFile = async ({ formData }) => {
    try {
        const tripId = sessionStorage.getItem('tripId');
        const itId = sessionStorage.getItem('itineraryId');

        if (!(tripId && itId)) {
            throw new Error('Information missing');
        }
        const { data } = await axiosInstance.patch(
            `/trip/${tripId}/itinerary/${itId}`,
            formData,
        );

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const savePlace = async ({ content }) => {
    try {
        const tripId = sessionStorage.getItem('tripId');
        const itineraryId = sessionStorage.getItem('itineraryId');
        if (!(tripId && itineraryId)) {
            throw new Error('Information missing');
        }
        const { data } = await axiosInstance.patch(
            `/trip/${tripId}/itinerary/${itineraryId}/place`,
            { content },
        );
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export {
    getTrips,
    createTrip,
    saveItinerary,
    savePlace,
    getItinerary,
    getItineraries,
    saveItineraryFile,
};
