import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://famousplacesapi.herokuapp.com/api/v1'
})

export default instance;