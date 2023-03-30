export default class PicsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPictures() {
        const url = `https://pixabay.com/api/?key=34822539-414af7ceff62fba527da96994&q=${this.searchQuery}&page=${this.page}&per_page=10&image_type=photo`;

        return fetch(url)
            .then(res => res.json())
            .then(data => {
                this.incrementPage();
                
                return data.hits;
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