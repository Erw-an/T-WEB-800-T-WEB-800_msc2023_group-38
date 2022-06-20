import axiosInstance from './axiosInstance';

const BASE_URL = 'auth';

const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
        sessionStorage.setItem('token', token);
    } else {
        delete axiosInstance.defaults.headers.common.Authorization;
        sessionStorage.removeItem('token', token);
    }
};

const signIn = async ({ email, password }) => {
    try {
        const { data } = await axiosInstance.post(`${BASE_URL}/signin`, {
            email,
            password,
        });
        if (data.access_token) {
            setAuthToken(data.access_token);
        } else {
            throw new Error();
        }
        return;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const signOut = async () => {
    setAuthToken();
};

// eslint-disable-next-line import/prefer-default-export
export { signIn, signOut };
