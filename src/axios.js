import axios from 'axios';

export const instanceUsers = axios.create({
    baseURL: 'https://bookwise-backend.herokuapp.com'
    //baseURL: "http://localhost:5000"
})

export const instanceBooks = axios.create({
    baseURL: "https://www.etnassoft.com"
});

export const getBookPeticion = {
    id: '/api/v1/get/?id=',
    category: '/api/v1/get/?category=',
    author: "/api/v1/get/?book_author="
}