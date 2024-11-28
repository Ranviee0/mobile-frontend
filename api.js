import axios from 'axios';

const api = axios.create({
    baseURL: 'http://54.198.71.32/',
    headers: {
        'Content-Type': 'application/json', // Specify content type
        'Accept': 'application/json',       // Specify accepted response type
      },
});

export default api;