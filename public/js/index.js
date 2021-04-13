const searchButton = document.querySelector(".searchButton");
const formSubmit = document.querySelector(".submit")
const inputValue = document.querySelector("#input_text");
let savedData;
function specificDetails(id) {
  window.location.href = "./specific.html"
  localStorage.setItem("movieID", id)
  
}
// (function(){

fetch(
  'https://api.themoviedb.org/3/trending/movie/day?api_key=dc7d76692b192b772ecce4d938dfa475',
  {
    method: "GET",
  }
).then((res) => res.json())
.then(data =>
   {
   localStorage.setItem("Featured", JSON.stringify(data.results));
   showSlides()
})


// })

//////////////////////////////////////////////////////////////
let featuredArray = JSON.parse(localStorage.getItem("Featured"))
console.log(featuredArray)
const slideShow = document.querySelector(".slideshow-container")
for(let i = 0; i < featuredArray.length; i++){
  let slide = document.createElement("div")
  slide.classList.add("mySlides")
  slide.classList.add("fade")
  
  

  let poster = document.createElement("img")
  poster.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500${featuredArray[i].backdrop_path}`
  );
  poster.style.width = "100%"

  let slideTitle = document.createElement("h3")
  slideTitle.textContent = featuredArray[i].title
  slideTitle.style.textAlign = "center"
  
  let slideButton = document.createElement("button")
  slideButton.textContent = "View"
  slideButton.value = featuredArray[i].id
  slideButton.style.width = "100%"
  slideButton.style.height = "30px"
  slideButton.addEventListener("click", function(event){
    specificDetails(event.target.value)

  })
  slideShow.append(slide)
  slide.append(poster)
  slide.append(slideTitle)
  slide.append(slideButton)
}
////////////////////////

// var slideIndex = 0;
// showSlides();

function showSlides() {
  var slideIndex = 0;
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); 

  
}


/////////////////////////////////////////////////////////////

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  let hide = document.getElementsByClassName("main-card");
  for (let i = 0; i < hide.length; i++) {
    hide[i].style.display = "none";
  }

  
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&query=%22${inputValue.value}%22&page=1&include_adult=false`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      inputValue.value = ""
      if (data.results.length === 0) {
      } else {
        for (let i = 0; i < data.results.length; i++) {
          let row = document.createElement("div");
          row.classList.add("row");
          row.classList.add("card");
          row.classList.add("main-card");
          row.style.backgroundColor = "#282828"
          let col = document.createElement("div");
          col.classList.add("col");
          col.classList.add("s12");
          col.style.backgroundColor = "#282828"
          
          let card = document.createElement("div");
          card.classList.add("card");
          let imgCont = document.createElement("div");
          imgCont.classList.add("card-image");
          let im = document.createElement("img");
          im.setAttribute(
            "src",
            `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`
          );
          let content = document.createElement("div");
          content.classList.add("card-content");
          let p = document.createTextNode(data.results[i].overview);
          let btnCont = document.createElement("div");
          btnCont.classList.add("card-action");
          let a = document.createElement("button");
          a.setAttribute("class", "specificButton");
          a.href = "/specific"
          a.addEventListener("click", function (event) {
            
            specificDetails(event.target.value);
            
          });
          let atext = document.createTextNode(data.results[i].title);


          let ratingCont = document.createElement("div")
          ratingCont.style.display = "flex"
          ratingCont.style.alignItems = "center"
          

          let ratingP = document.createElement("div");
          ratingP.style.display = "flex"
          ratingP.style.justifyContent = "space-between"
          
          let icon = document.createElement("icon")
          icon.classList.add("material-icons")
          icon.textContent = "star_border"
          
          
          let textRating = document.createTextNode(
            data.results[i].vote_average
          );
          
          let main = document.querySelector(".main");
          main.append(row);
          row.append(col);
          col.append(card);
          card.append(imgCont);
          card.append(content);
          card.append(btnCont);
          imgCont.append(im);
          content.append(p);
          // btnCont.append(a);
          btnCont.append(ratingP)
          ratingP.append(a)
          ratingP.append(ratingCont)
          ratingCont.append(icon)
          ratingCont.append(textRating)
          btnCont.append(ratingP);

          a.append(atext);
          a.setAttribute("value", data.results[i].id);
        }
      }
      
    })
    .catch((err) => console.error(err));
});


