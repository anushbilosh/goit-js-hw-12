import './css/styles.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener('submit', handleUserQuery)

function handleUserQuery (event) {
    event.preventDefault(); 

    const searchQuery = input.value.trim();

    if (searchQuery === '') {
        iziToast.warning({
            message: 'Please enter a search term!',
            position: 'topRight',
            });
            return;
        }
    
    showLoader();
    console.log('showLoader called');
    clearGallery();
    
    getImagesByQuery(searchQuery)
    .then(data => {
            if (data.hits.length === 0) {
            iziToast.info({
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            });
            return;
        }
        createGallery(data.hits);
        })
    .catch(error => {
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: 'topRight',
            });
        })
    .finally(() => {
        hideLoader();
        });
}