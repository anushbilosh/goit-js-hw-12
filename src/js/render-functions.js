import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryContainer = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
export const loadBtnElem = document.querySelector('.load-btn');


const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});


export function createGallery(images) {
    const markup = images
    .map(image => {
        return `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img
                    class="gallery-image"
                    src="${image.webformatURL}"
                    alt="${image.tags}"
                />
            </a>
            <div class="image-info">
                <p><b>Likes:</b> ${image.likes}</p>
                <p><b>Views:</b> ${image.views}</p>
                <p><b>Comments:</b> ${image.comments}</p>
                <p><b>Downloads:</b> ${image.downloads}</p>
            </div>
        </li>`;
    })
    .join(''); 

    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryContainer.innerHTML = '';
}

export function showLoader() {
    loaderElement.classList.add('active');
}

export function hideLoader() {
    loaderElement.classList.remove('active');
}

export function hideLoadMoreButton() {
    loadBtnElem.classList.add('hidden');
}

export function showLoadMoreButton() {
    loadBtnElem.classList.remove('hidden');
}

export function scrollGallerySmoothly() {
    const firstCard = document.querySelector('.gallery-item');
    if (!firstCard) return;

    const cardHeight = firstCard.getBoundingClientRect().height;

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

