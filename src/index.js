import axios from "axios";
import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
// import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

const refs = {
  form: document.querySelector('.search-form'),
  // searchBtn: document.querySelector('.search-form'),
  galleryWrap: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const KEY = "34416785-706900f4c4344fdefb158122c";
let currentPage = 1;

refs.form.addEventListener("submit", onFormSubmit);
refs.loadMoreBtn.style.display = "none";
refs.loadMoreBtn.addEventListener("click", onLoadMoreBtnClick)

function onFormSubmit(e) {
    e.preventDefault();
    console.log("onFormSubmit");
    const value = e.target.elements.searchQuery.value.trim();
    console.log(value);

    fetchData(value)
        .then(({hits}) => {
            console.log(hits)
            if (hits.length === 0) {
                refs.galleryWrap.innerHTML = "";
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            } else {
                refs.galleryWrap.innerHTML = "";
              renderGallery(hits);
              refs.loadMoreBtn.style.display = "block";
            }
        })
        .catch((error) => console.log(error))

};

function fetchData(query) {
  const URL = `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  currentPage += 1;
    return fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error (response.status)
            }
            return response.json()
        } )
};

function renderGallery (hits) {
    const markup = hits
        .map((hit) => {
          return `
          <div class="photo-card">
            <div class="photo">
              <a class="image-link" href="${hit.largeImageURL}">
                <img src=${hit.webformatURL} alt="${hit.tags}" loading="lazy" />
              </a>
            </div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${hit.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${hit.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${hit.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${hit.downloads}
    </p>
  </div>
</div>
`
    })
        .join("");
  refs.galleryWrap.insertAdjacentHTML('beforeend', markup);
  // simpleLightBox.refresh();
};

// const simpleLightbox = new SimpleLightbox('.gallery a', {
//   /* options */
//   captionsData: 'alt',
//   captionDelay: 300,
// });

function onLoadMoreBtnClick() {
  console.log("onLoadMoreBtnClick");
}





