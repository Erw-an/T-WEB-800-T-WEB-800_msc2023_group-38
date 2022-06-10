import axiosInstance from './axiosInstance';

const BASE_URL = 'geo';
const AMENITY_TYPE = ['drink', 'eat', 'travel', 'enjoy', 'sleep'];
// TODO: List available profile
const PROFILE_TYPE = ['driving-car'];

const autocompleteSearch = async (q) => {
    try {
        const { data } = await axiosInstance.get(
            `${BASE_URL}/adresses/autocomplete?q=${q}`,
        );
        return data.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getPlacesNearby = async ({ radius = 6000, lat, lng }, amenity) => {
    try {
        if (!AMENITY_TYPE.includes(amenity)) {
            throw new Error('Wrong amenity');
        }
        const { data } = await axiosInstance.get(
            `${BASE_URL}/places/${amenity}/?radius=${radius}&lat=${lat}&lng=${lng}`,
        );
        return data.data.content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getDirection = async (coordStart, coordEnd, profile = 'driving-car') => {
    try {
        if (!PROFILE_TYPE.includes(profile)) {
            throw new Error('Profile not know ...');
        }
        const { data: content } = await axiosInstance.get(
            `${BASE_URL}/direction?latStart=${coordStart.lat}&lngStart=${coordStart.lng}&latEnd=${coordEnd.lat}&lngEnd=${coordEnd.lng}&profile=${profile}`,
        );

        return content;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { autocompleteSearch, getPlacesNearby, getDirection };
