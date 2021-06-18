import axios from 'axios';

export function getReservation(token: string) {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get(`https://localhost:44378/api/AppReservations`, config);
}

export function getDates(pax: number) {
    return axios.get(`https://localhost:44378/api/Reservations/getDates/${pax}`).then(response => {return response.data});
}

export function getTimes(date: any) {
    let d = new Date(date);
    let url = `https://localhost:44378/api/Reservations/getTimes/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;    
    return axios.get(url).then(response => {return response.data});
}

export function postReservation(token: string, StartTime: string, Guests: number, Notes: string) {
    let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    let data = {
        'StartTime': StartTime,
        'Guests': Guests,
        'Notes': Notes
    };
    return axios.post(`https://localhost:44378/api/AppReservations`, data, config).then(response => { return response.data});
}

