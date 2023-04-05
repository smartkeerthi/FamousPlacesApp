import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://famous-place-api.onrender.com/api/v1'
})

export default instance;