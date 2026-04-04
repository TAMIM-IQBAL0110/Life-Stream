export const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

export const API_PATHS = {
    AUTH:{
        LOGIN: "/api/v1/auth/login",
        REGISTRATION:"/api/v1/auth/registration",
    },
};

export const getFullUrl = (endpoint) => `${baseUrl}${endpoint}`;