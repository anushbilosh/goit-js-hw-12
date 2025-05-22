import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const myApiKey = '50358414-c92bcdcb4052cd5a2ab490d79';


// після рефакторингу


export async function getImagesByQuery(query) {
    const options = {
    params: {
        key: myApiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        },
    };
    try {
        const res = await axios.get('', options);
        return res.data;
    } 
    catch (error) {
        console.log(error);
        throw error;
    }
}


