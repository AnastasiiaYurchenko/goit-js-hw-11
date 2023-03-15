import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

const refs = {
    form: document.querySelector('.search-form'),
    searchBtn: document.querySelector('.search-form'),
    galleryWrap: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}


const KEY = "34416785-706900f4c4344fdefb158122c";


refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    console.log("onFormSubmit");
    const value = e.target.elements.searchQuery.value.trim();
    console.log(value);

    fetchData(value)
        .then((data) => {
            console.log(data.hits)
            if (data.hits.length === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            } else {
                renderGallery(data)
            }
        })
        .catch((error) => console.log(error))

};

function fetchData(query) {
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
    return fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error (Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
            }
            return response.json()
        } )
}




