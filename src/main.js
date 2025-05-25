import './css/styles.css';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, hideLoadMoreButton, showLoadMoreButton, loadBtnElem, scrollGallerySmoothly } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = form.elements['search-text'];

let userValue;
let currentPage = 0;


form.addEventListener('submit', handleUserQuery)


async function handleUserQuery (event) {
    event.preventDefault(); 

    userValue = input.value.trim();

    if (userValue === '') {
        iziToast.warning({
            message: 'Please enter a search term!',
            position: 'topRight',
            });
            return;
        }
    
    showLoader();
    
    clearGallery();
    try {
        currentPage = 1;
        const data = await getImagesByQuery(userValue, currentPage);
        
        if (data.hits.length === 0) {
            iziToast.info({
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'bottomRight',
            });
            hideLoadMoreButton();
            return;
        }
        createGallery(data.hits);

        if (data.hits.length < PER_PAGE) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomRight',
            });
        } else {
            showLoadMoreButton();
        }
        
    } catch (error) {
        iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'bottomRight',
        });
    } finally {
        hideLoader();
    }
}

loadBtnElem.addEventListener('click', handleUserLoad)

async function handleUserLoad (event) {
    event.preventDefault(); 

    showLoader();
    
    try {
        currentPage += 1;
        const data = await getImagesByQuery(userValue, currentPage);
    
        if (data.hits.length === 0) {
            hideLoadMoreButton();
            iziToast.info({
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'bottomRight',
            });
            return;
        }
        createGallery(data.hits);
        scrollGallerySmoothly();
        if (data.hits.length < PER_PAGE) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomRight',
            });
        }

    } catch (error) {
        iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'bottomRight',
        });
        hideLoadMoreButton();
    } finally {
        hideLoader();
    }
}
