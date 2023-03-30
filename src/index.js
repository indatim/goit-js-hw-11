import PicsApiService from './js/pic-service';
import imagecard from './templates/imagecard.hbs';

const refs = {
    searcher: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const picsApiService = new PicsApiService();

refs.searcher.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    picsApiService.query = e.currentTarget.elements.query.value;
    picsApiService.resetPage();
    picsApiService.fetchPictures().then(hits => {
        clearPicturesContainer();
        appendPicturesMarkup(hits);
});
}

function onLoadMore() {
    picsApiService.fetchPictures().then(appendPicturesMarkup);
}

function appendPicturesMarkup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', imagecard(hits));
}

function clearPicturesContainer() {
    refs.gallery.innerHTML = '';
}

// const options = {

// };