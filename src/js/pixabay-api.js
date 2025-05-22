import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const myApiKey = '50358414-c92bcdcb4052cd5a2ab490d79';

export function getImagesByQuery(query) {
    const options = {
    params: {
        key: myApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        },
    };
    return axios.get('', options)
    .then(res => res.data)
    .catch(error => {
        console.log(error);
        throw error;;
    });
}