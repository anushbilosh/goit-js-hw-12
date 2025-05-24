import './css/styles.css';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, hideLoadMoreButton, showLoadMoreButton, loadBtnElem, scrollGallerySmoothly } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const input = form.elements['search-text'];

let userValue;
let currentPage = 0;
let maxPage = 0;


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
        
        maxPage = Math.ceil(data.totalHits / PER_PAGE);
        updateLoadBtn ()
        
        if (currentPage === maxPage) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomRight',
                });
                return;
        }

        if (data.hits.length === 0) {
            iziToast.info({
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'bottomRight',
            });
            return;
        }
    
        createGallery(data.hits);
        
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
        updateLoadBtn ()
        const data = await getImagesByQuery(userValue, currentPage);
    
        if (data.hits.length === 0) {
            iziToast.info({
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'bottomRight',
            });
            return;
        }

        if (currentPage === maxPage) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomRight',
                });
                return;
        }

        createGallery(data.hits);
        scrollGallerySmoothly();
    } catch (error) {
        iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'bottomRight',
        });
    } finally {
        hideLoader();
    }
}

function updateLoadBtn (){
if (currentPage < maxPage) {
    showLoadMoreButton()
} else {
    hideLoadMoreButton()
}
}