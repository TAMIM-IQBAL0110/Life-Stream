export const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';

export const API_PATHS = {
    AUTH:{
        LOGIN: "/api/v1/auth/login",
        REGISTRATION: "/api/v1/auth/registration",
        VERIFY: "/api/v1/auth/verify",
    },
    DONOR:{
        GET_DONOR_INFO: "/api/v1/donor/:userId",
        UPDATE_DONOR_INFO: "/api/v1/donor/update/:userId",
        DELETE_DONOR_INFO: "/api/v1/donor/delete/:userId",
    },
    FIND_DONOR:{
        FIND: "/api/v1/search/find-donors",
    },
};

