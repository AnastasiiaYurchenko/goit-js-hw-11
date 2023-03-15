import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

const refs = {
    form: document.querySelector('.search-form'),
    searchBtn: document.querySelector('.search-form'),
}
let query = "cat";
const KEY = "34416785-706900f4c4344fdefb158122c";
const URL = `https://pixabay.com/api/?key=${ KEY }&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;




