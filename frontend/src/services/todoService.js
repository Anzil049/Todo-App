// All API calls live here — keeps components clean

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/todos';

const todoService = {
    getAll: () => axios.get(BASE_URL),

    create: (title) => axios.post(BASE_URL, { title }),

    update: (id, data) => axios.put(`${BASE_URL}/${id}`, data),

    delete: (id) => axios.delete(`${BASE_URL}/${id}`)
}

export default todoService;