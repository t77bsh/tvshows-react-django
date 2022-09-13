import axios from 'axios';

export default axios.create({
    baseURL: "https://tvshows-react-django.herokuapp.com/backend_api/comments",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})