import axios from "axios";
import Notiflix from 'notiflix';
import './css/styles.css';
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  // searchBtn: document.querySelector('.search-form'),
  galleryWrap: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const KEY = "34416785-706900f4c4344fdefb158122c";
let currentPage = 1;

refs.form.addEventListener("submit", onFormSubmit);
refs.loadMoreBtn.style.display = "none";
refs.loadMoreBtn.addEventListener("click", onLoadMoreBtnClick);

const simpleLightbox = new SimpleLightbox('.gallery a', {
  /* options */
  captionsData: 'alt',
  captionDelay: 300,
  // scrollZoom: false,
});

function onFormSubmit(e) {
  e.preventDefault();
  currentPage = 1;
    // console.log("onFormSubmit");
    refs.galleryWrap.innerHTML = "";
    const value = e.target.elements.searchQuery.value.trim();
    // console.log(value);
  
  if (value === '') {
   return  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  } else {
    fetchData(value, currentPage);
    refs.loadMoreBtn.style.display = "block";
  }

    // fetchData(value);
    // .then(({ hits }) => {
    //   console.log(hits)
    //   if (hits.length === 0) {
    //     refs.galleryWrap.innerHTML = "";
    //     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    //   } else {
    //     refs.galleryWrap.innerHTML = "";
    //     renderGallery(hits);
    //     refs.loadMoreBtn.style.display = "block";
    //   }
    // })
    // .catch((error) => console.log(error));
  // Notiflix.Notify.success(`Hooray! We found ${hits.totalhits} images.`);
};

async function fetchData(query, currentPage) {
  const URL = `https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;

  try {
    const response = await axios.get(URL);
    // console.log(response);
    // console.log(response.data.totalHits)
    // renderGallery(response.data.hits);

    if (response.data.hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      refs.loadMoreBtn.style.display = "none";
    } else if (response.data.hits.length < 40) {
        refs.loadMoreBtn.style.display = "none";
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
    else {
      renderGallery(response.data.hits);
      // simpleLightbox.refresh();
      if (currentPage === 1) {
        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

function renderGallery (hits) {
    const markup = hits
        .map((hit) => {
          return `
          
          <div class="photo-card">
            <div class="photo">
              <a class="image-link" href="${hit.largeImageURL}">
                <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
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
  simpleLightbox.refresh();
};

function onLoadMoreBtnClick() {
  const query = refs.input.value.trim();
  // console.log("onLoadMoreBtnClick", query);
  currentPage += 1;
  fetchData(query, currentPage);
}





