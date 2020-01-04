import axios from 'axios';
const API_URL = 'http://localhost:5000';

export class APIService {

    constructor() {}

    getPersonalities() {

        const url = `${API_URL}/api/personality/`;

        return axios.get(url).then(response => response.data);
    }
    getPersonality(pk) {

        const url = `${API_URL}/api/personality/${pk}`;

        return axios.get(url).then(response => response.data);

    }

    deletePersonality(personality) {

        const url = `${API_URL}/api/personality/delete/${personality.pk}`;
        return axios.delete(url);
    }

    createPersonality(personality) {
        const url = `${API_URL}/api/personality/create/`;
        return axios.post(url, personality);
    }

    updatePersonality(personality) {
        const url = `${API_URL}/api/personality/update/${personality.pk}`;
        return axios.put(url, personality);
    }
}