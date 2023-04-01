// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
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

// export default class PicsApiService {
//     constructor() {
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchPictures() {
//         const url = `${BASE_URL}`, { options, };

//         return fetch(url)
//             .then(response => response.json())
//             .then(({ hits }) => {
//                 this.incrementPage();
//                 return (hits);
//             })
//     }

//     incrementPage() {
//         this.page += 1;
//     }

//     resetPage() {
//         this.page = 1;
//     }

//     get query() {
//         return this.searchQuery;
//     }

//     set query(newQuery) {
//         this.searchQuery = newQuery;
//     }
// }

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://pixabay.com/api/';

// export async function fetchPictures(query, page) {
//     const params = {
//         key: '34822539-414af7ceff62fba527da96994',
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: page,
//         per_page: 40,
//     };

//     try {
//         const response = await axios.get(`${BASE_URL}`, {
//             params,
//         });
//         const totalPages = response.data.totalHits / params.per_page;
//         console.log('totalPages->', totalPages);
//         if (response.data.totalHits === 0) {
//             Notify.failure(
//                 'Sorry, there are no images matching your search query. Please try again.'
//             );
//             return;
//         }
//         if (params.page >= totalPages) {
//             Notify.info("We're sorry, but you've reached the end of search results.");
//         }
//         if (params.page === 1) {
//             Notify.success(`Hooray! We found ${response.data.total} images.`);
//         }

//         return response.data.hits;
//     } catch (error) {
//         Notify.failure(error.message);
//         return;
//     }
// }

export default class PicsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchPictures() {
    const params = {
        key: '34822539-414af7ceff62fba527da96994',
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: 40,
    };

    try {
        const response = await axios.get(`${BASE_URL}`, {
            params,
        });
        const totalPages = response.data.totalHits / params.per_page;
        if (response.data.totalHits === 0) {
            Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.', {cssAnimationStyle: 'zoom'}
            );
            return;
        }
        if (params.page >= totalPages) {
            Notify.info("We're sorry, but you've reached the end of search results.", {cssAnimationStyle: 'zoom'});
        }
        if (params.page === 1) {
            Notify.success(`Hooray! We found ${response.data.total} images.`, { cssAnimationStyle: 'zoom' });
        }

            return response.data.hits;

    } catch (error) {
        Notify.failure(error.message);
        return;
    }
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