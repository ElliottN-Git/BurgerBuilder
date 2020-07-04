import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-64552.firebaseio.com/'
});

export default instance;