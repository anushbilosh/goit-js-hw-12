import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
const myApiKey = '50358414-c92bcdcb4052cd5a2ab490d79';
export const PER_PAGE = 15;

// після рефакторингу


export async function getImagesByQuery(query, page) {
    const options = {
    params: {
        key: myApiKey,
        q: query,
        page: page,
        per_page: PER_PAGE,
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
