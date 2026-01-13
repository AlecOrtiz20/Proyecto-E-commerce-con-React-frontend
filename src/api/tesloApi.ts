import axios from "axios";

const tesloApi = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true
});

tesloApi.interceptors.request.use((c) => {

    

    return c;
});

export {tesloApi};