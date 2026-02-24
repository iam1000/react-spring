import axios from 'axios';

// Create Axios Instance
export const apiClient = axios.create({
    baseURL: '/api', // Proxy will route this to localhost:8080 during local development
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Attach JWT Token
apiClient.interceptors.request.use(
    (config) => {
        // In a real app, retrieve the token from Zustand store or localStorage
        const token = localStorage.getItem('jwt_token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle Global Errors (e.g., 401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error("Unauthorized access, JWT might be expired.");
        }
        return Promise.reject(error);
    }
);

export default apiClient;
