import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
// const options = {
//     params: {
//         key: '34822539-414af7ceff62fba527da96994',
//         q: this.query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         per_page: 40,
//         page: this.page,},
// };

export default class PicsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPictures() {
        const url = `https://pixabay.com/api/?key=34822539-414af7ceff62fba527da96994&q=${this.searchQuery}&page=${this.page}&per_page=40&image_type=photo`;

        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
        });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}