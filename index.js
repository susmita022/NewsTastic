// DATE //
const date = new Date();
const local = date.toLocaleString();
document.getElementById('date').innerHTML = local;


// to make nav bar sticky

window.onscroll = function() {stickyN()};
var navbar = document.getElementById("navbar");

var sticky = navbar.offsetTop;

function stickyN() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// code for fetching data

(function AJAX() {

  let api;

  if (sessionStorage.getItem('api') == null) {
      api = `https://newsapi.org/v2/top-headlines?country=in&category=&apiKey=48879d64eafc40ca8cfa10373bc9e1dd`;
  } else {
      api = sessionStorage.getItem('api');
      document.querySelector("#category").innerHTML = sessionStorage.getItem('text');
  }

  //  XMLHttpRequest 

  var xhr = new XMLHttpRequest();
  xhr.open('GET', api, true);

  xhr.onreadystatechange = function () {
      let DONE = 4;
      let OK = 200;
      if (this.readyState === DONE) {
          if (this.status === OK) {
              console.log("Success");
              let data = JSON.parse(this.responseText);
              console.log(JSON.stringify(data));
              updateCarousel(data);
              updateCard(data);
          } else {
              console.log('Error: ' + this.status);
          }
      }
  };

  xhr.send();
}());

// For search feature

function Search() {
  let search_input = document.getElementById('search-input').value;
  if (search_input != "") {
      console.log(search_input);
      sessionStorage.setItem('api', `https://newsapi.org/v2/everything?q=${search_input}&apiKey=48879d64eafc40ca8cfa10373bc9e1dd`);
      sessionStorage.setItem('text', "Search Results..");
      location.reload();
  }
}

// For category news

function general() {
  sessionStorage.setItem('api', `https://newsapi.org/v2/top-headlines?country=in&category=&apiKey=48879d64eafc40ca8cfa10373bc9e1dd` );
  location.reload();
  sessionStorage.setItem('text', "TOP HEADLINES");
}


function buisness() {
  sessionStorage.setItem('api', `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=48879d64eafc40ca8cfa10373bc9e1dd` );
  location.reload();
  sessionStorage.setItem('text', "BUISNESS");
}

function entertainment() {
  sessionStorage.setItem('api', `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=48879d64eafc40ca8cfa10373bc9e1dd` );
  sessionStorage.setItem('text', "ENTERTAINMENT");
  location.reload();

}

function technology() {
  sessionStorage.setItem('api', `https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=48879d64eafc40ca8cfa10373bc9e1dd` );
  sessionStorage.setItem('text', "TECHNOLOGY");
location.reload();
}

function science() {
  sessionStorage.setItem('api', `https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=48879d64eafc40ca8cfa10373bc9e1dd` );
  sessionStorage.setItem('text', "SCIENCE");
  location.reload();
}

function sports() {
  sessionStorage.setItem('api', `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=48879d64eafc40ca8cfa10373bc9e1dd` );
  sessionStorage.setItem('text', "SPORTS");
  location.reload();
}

function covid() {
  sessionStorage.setItem('api', `https://newsapi.org/v2/everything?q=covid&apiKey=48879d64eafc40ca8cfa10373bc9e1dd` );
  sessionStorage.setItem('text', "COVID 19");
  location.reload();
}



function updateCarousel(data) {
  for (let index = 0; index < 3; index++) {
      let carouselElemParent = document.querySelector("#carous-el .carousel-inner");
      let elem = document.createElement('div');

      if (index == 0)
          elem.className = 'carousel-item active';
      else
          elem.className = 'carousel-item';

      elem.innerHTML = ` 
      <div class="card mb-3">
      <a href="${data['articles'][index].url}" target='_blank'>
          <div class="row no-gutters">
              <div class="col-md-6">
                  <img class="img-fluid" src="${data['articles'][index].urlToImage}"
                      class="card-img">
              </div>
              <div class="col-md-6">
                  <div class="card-body">
                      
                      <h3 class="card-title">${data['articles'][index].title}</h3>
                      <p class="text-muted">${data['articles'][index].publishedAt}</p>
                      <p class="card-text">${data['articles'][index].description}</p>
                  </div>
              </div>
          </div>
          </a>
      </div>`;
  carouselElemParent.appendChild(elem);
        }
}

function updateCard(data) {
  for (let index = 0; index < data['articles'].length; index++) {
      let card_parent_elem = document.querySelector("#cards");
      let elem = document.createElement("div");
      elem.className = "card";
      elem.innerHTML = `
      <div class="row no-gutters">
      <div class="col-md-4">
      <img src="${data['articles'][index].urlToImage}" class="card-img" alt="image">
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <a href="${data['articles'][index].url}" target='_blank'><h4 class="card-title">${data['articles'][index].title}</h4></a>
        <p class="card-text">${data['articles'][index].description} </p>
        <div class="row">
        <p class="col-6 text-left"><small class="text-muted">${data['articles'][index].publishedAt}</small></p>
        <p class="col-6 text-right"><small class="text-muted">${data['articles'][index].author}</small></p>
      </div>
      </div>
      </div>
    </div>`
        ;
      card_parent_elem.appendChild(elem);
  }
}
