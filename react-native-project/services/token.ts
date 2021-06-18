import axios from 'axios';

export function getToken(email: string, password: string) {
    let data = {
        'Email': email,
        'Password': password
    };
    return axios.post(`https://localhost:44378/api/Token`, data);
}

export function checkValid(token: string) {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get(`https://localhost:44378/api/AppReservations/checkValid`, config);
}

export function getName(token: string) {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get(`https://localhost:44378/api/AppReservations/getName`, config);
}