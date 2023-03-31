import PicsApiService from './js/pic-service';
import imagecard from './templates/imagecard.hbs';
import LoadMoreBtn from './js/load-more-btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    searcher: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    myOnTopBtn: document.querySelector('.myOnTopBtn'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const picsApiService = new PicsApiService();

console.log(loadMoreBtn);

loadMoreBtn.show();
loadMoreBtn.enable();
;
refs.searcher.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    picsApiService.query = e.currentTarget.elements.query.value;

    if (picsApiService.query === '') {
        return Notify.failure(`Sorry, there are no images matching your search query. Please try again..`, {cssAnimationStyle: 'zoom'});
    }

    picsApiService.resetPage();
    picsApiService.fetchPictures().then(hits => {
        // Notify.success(
        //   `Hooray! We found ${hits.totalHits} images.`
        // );
        clearPicturesContainer();
        appendPicturesMarkup(hits);
});
}

function onLoadMore() {
    picsApiService.fetchPictures().then(appendPicturesMarkup);
}

function appendPicturesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', imagecard(hits));
    simpleLightbox();
}

function clearPicturesContainer() {
    refs.gallery.innerHTML = '';
}

function simpleLightbox() {
  let lightbox = new SimpleLightbox('.photo-card a', {
    captions: false,
    captionDelay: 250,
    enableKeyboard: true,
    navText: ['←', '→'],
  });
  lightbox.refresh();
}


// MyOnTopBtn
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };
refs.myOnTopBtn.addEventListener('click', topFunction);

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.myOnTopBtn').style.display = "block";
    } else {
        document.querySelector('.myOnTopBtn').style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}