import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create();

// Function to refresh access token
const refreshAccessToken = async () => {
    try {
        const response = await axios.get('/api/user/refresh-access-token');
        return response.data.data; // Assuming this returns the new token
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
};

// Add a response interceptor
apiClient.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        // Marking the request to avoid infinite loop
        originalRequest._retry = true;
        
        // Attempt to refresh the token
        const newAccessToken = await refreshAccessToken();
        
        // Update the header with the new token
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Retry the original request with the new token
        return axios(originalRequest);
    }
    return Promise.reject(error);
});

// Export the customized Axios instance
export default apiClient;