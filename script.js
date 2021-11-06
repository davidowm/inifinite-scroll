const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//Unsplash API
let count = 5;
const apiKey = 'yb4pKD9ytBH_n0yBrbPTMJ8Xt07EG5a-9JoxxHN--Og';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//Check if all images were loaded
const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
};
//Helper function to set attributes on DOM elements
const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
//Create Elements for Links & Photos, and Add to DOM
const displayPhotos = function () {
  totalImages = photosArray.length;
  imagesLoaded = 0;

  //Run function for each object in photosArray
  photosArray.forEach(photo => {
    //Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //Create <i,mg> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    //Put <img> inside <>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};
// GET pHOTOS FROM UNSPLASH API
const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
};

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//on load
getPhotos();
