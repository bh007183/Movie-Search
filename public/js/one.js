window.onload = function() {
    let realID = localStorage.getItem("movieID")
    fetch(
        `https://api.themoviedb.org/3/movie/${realID}?api_key=dc7d76692b192b772ecce4d938dfa475&language=en-US&append_to_response=watch%2Fproviders`,
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
            flatrate: JSON.stringify(data["watch/providers"].results.US.flatrate) || JSON.stringify("No Known Streeming Service"),
            rent: JSON.stringify(data["watch/providers"].results.US.rent) || JSON.stringify("No Known Renting Service")
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
          try {
          for (
            let i = 0;
            i < data["watch/providers"].results.US.flatrate.length;
            i++
          ) {
            let subscript = document.querySelector(".subscribe");
            let column = document.createElement("div");
            column.classList.add("col");
            column.classList.add("s12");
            
            
              column.textContent =
                data["watch/providers"].results.US.flatrate[i].provider_name;
            
            column.style.textAlign = "center";
            subscript.append(column);
          }
        }catch(err){
            let subscript = document.querySelector(".subscribe");
            let column = document.createElement("div");
            column.classList.add("col");
            column.classList.add("s12");
            column.textContent = "No Known Streeming"
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

let saveButton = document.querySelector(".saveMovie")

saveButton.addEventListener("click", function(event){
  console.log(savedData)
  fetch("/api/savemovie", {
    method: "post",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(savedData)
  }).then(res => res.json())
  .then(data => window.location.href = "/")
  .catch(err => console.log(err))
})