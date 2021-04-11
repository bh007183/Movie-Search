const searchButton = document.querySelector(".searchButton");
const inputValue = document.querySelector("#input_text");
let savedData;
function specificDetails(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&append_to_response=watch%2Fproviders`,
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      savedData = {
        title: data.title,
        poster_path: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        overview: data.overview,
        vote_average: data.vote_average,
        flatrate: JSON.stringify(data["watch/providers"].results.US.flatrate),
        rent: JSON.stringify(data["watch/providers"].results.US.rent)
      }

      document.querySelector(".streemHeader").style.display = "block";
      document.querySelector(".rentHeader").style.display = "block";
      document.querySelector(".poster").style.display = "block";
      let Title = document.querySelector(".header");
      Title.textContent = data.title;
      Title.style.textAlign = "center";
      let poster = document.querySelector(".poster");
      poster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      let overview = document.querySelector(".overview");
      overview.textContent = data.overview;
      overview.style.textAlign = "center";
      for (
        let i = 0;
        i < data["watch/providers"].results.US.flatrate.length;
        i++
      ) {
        let subscript = document.querySelector(".subscribe");
        let column = document.createElement("div");
        column.classList.add("col");
        column.classList.add("s12");
        
        if (
          data["watch/providers"].results.US.flatrate[i].provider_name ===
          "undefined"
        ) {
          column.textContent = "No Known Streeming Service";
        } else {
          column.textContent =
            data["watch/providers"].results.US.flatrate[i].provider_name;
        }
        column.style.textAlign = "center";
        subscript.append(column);
      }
       try {
        for (
          let i = 0;
          i < data["watch/providers"].results.US.rent.length;
          i++
        ) {
          let rent = document.querySelector(".rent");
          let rentColumn = document.createElement("div");
          rentColumn.classList.add("col");
          rentColumn.classList.add("s12");
          

          rentColumn.textContent =
            data["watch/providers"].results.US.rent[i].provider_name;

          rentColumn.style.textAlign = "center";
          rent.append(rentColumn);
        }
      }
      catch(err){
          
            let rent = document.querySelector(".rent");
            let rentColumn = document.createElement("div");
            rentColumn.classList.add("col");
            rentColumn.classList.add("s12");
            rentColumn.textContent = "No Known Rental";
            rentColumn.style.textAlign = "center";
            rent.append(rentColumn)
          
          

      }
        
      
    });
}

searchButton.addEventListener("click", function (event) {
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
      if (data.results.length === 0) {
      } else {
        for (let i = 0; i < data.results.length; i++) {
          let row = document.createElement("div");
          row.classList.add("row");
          row.classList.add("main-card");
          let col = document.createElement("div");
          col.classList.add("col");
          col.classList.add("s12");
          col.classList.add("m6");
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
          a.addEventListener("click", function (event) {
            specificDetails(event.target.value);
            document.querySelector(".main").style.display = "none";
          });
          let atext = document.createTextNode(data.results[i].title);
          let ratingP = document.createElement("p");
          ratingP.style.cssFloat = "right";
          let textRating = document.createTextNode(
            `rating = ${data.results[i].vote_average}`
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
          btnCont.append(a);
          ratingP.append(textRating);
          btnCont.append(ratingP);

          a.append(atext);
          a.setAttribute("value", data.results[i].id);
        }
      }
      
    })
    .catch((err) => console.error(err));
});

let saveButton = document.querySelector(".saveMovie")

saveButton.addEventListener("click", function(event){
  console.log(savedData)
  fetch("/api/savemovie", {
    method: "post",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(savedData)
  }).then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))
})
