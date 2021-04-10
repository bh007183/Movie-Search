const searchButton = document.querySelector(".searchButton");
const inputValue = document.querySelector("#input_text");

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  let hide = document.getElementsByClassName("main-card")
  for(let i = 0; i < hide.length; i++){
      hide[i].style.display = "none"
  }




  console.log(inputValue.value);
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
    
        let row = document.createElement("div")
        row.classList.add("row")
        row.classList.add("main-card")
        let col = document.createElement("div")
        col.classList.add("col")
        col.classList.add("s12")
        col.classList.add("m6")
        let card = document.createElement("div")
        card.classList.add("card")
        let imgCont = document.createElement("div")
        imgCont.classList.add("card-image")
        let im = document.createElement("img")
        im.setAttribute("src", `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}`)
        let content = document.createElement("div")
        content.classList.add("card-content")
        let p = document.createTextNode(data.results[i].overview)
        let btnCont = document.createElement("div")
        btnCont.classList.add("card-action")
        let a = document.createElement("a")
        let atext = document.createTextNode(data.results[i].title)
       
        
        let main = document.querySelector(".main")
        main.append(row)
        row.append(col)
        col.append(card)
        card.append(imgCont)
        card.append(content)
        card.append(btnCont)
        imgCont.append(im)
        content.append(p)
        btnCont.append(a)
        a.append(atext)
            
            
        }
      }
      console.log(data.results);
    })
    .catch((err) => console.error(err));
});
