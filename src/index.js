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
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const picsApiService = new PicsApiService();

console.log(loadMoreBtn);

// loadMoreBtn.show();
// loadMoreBtn.disable();

refs.loadMoreBtn.style.display = 'none';


refs.searcher.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
window.addEventListener('scroll', checkPosition);

function onSearch(e) {
    e.preventDefault();

    picsApiService.query = e.currentTarget.elements.query.value.trim();

    if (picsApiService.query === '') {
        return Notify.failure(`Please enter something in the field.`, {cssAnimationStyle: 'zoom'});
    }

    picsApiService.resetPage();
    picsApiService.fetchPictures().then(hits => {
        clearPicturesContainer();
        appendPicturesMarkup(hits);
        // refs.loadMoreBtn.style.display = 'block';
    });
    picsApiService.incrementPage();
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
window.onscroll = function () { scrollFunction() };
refs.myOnTopBtn.addEventListener('click', topFunction);

function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        document.querySelector('.myOnTopBtn').style.display = "block";
    } else {
        document.querySelector('.myOnTopBtn').style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// InfinityScroll

async function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 4;
  const position = scrolled + screenHeight;
    if (position >= threshold) {
      picsApiService.incrementPage();
      picsApiService.fetchPictures().then(hits => { appendPicturesMarkup(hits);
    });
  }
}
