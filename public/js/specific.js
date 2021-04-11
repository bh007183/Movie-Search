window.onload = function () {
  fetch("/api/saved", {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let main = document.querySelector(".saved");
      for (let i = 0; i < data.length; i++) {
          let del = document.createElement("button")
          del.classList.add("delete")
          del.setAttribute("value", data[i]._id)
          del.textContent = "X"
          del.style.cssFloat = "right"
          del.addEventListener("click", function(event){
              console.log(event.target.value)

            fetch(`/api/savemovie/${event.target.value}`, {
                method: "delete",
              })
                .then((res) => location.reload())
                .then((data) => console.log(data))

          })

        ////
        let row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("card");

        ////////
        let card = document.createElement("div");
        card.classList.add("col");
        card.classList.add("s12");
        //////
        let titleRow = document.createElement("div");
        titleRow.classList.add("row");
        titleRow.style.display = "flex";
        titleRow.style.justifyContent = "center";
        let title = document.createElement("h3");
        title.textContent = data[i].title;
        //////
        let posterRow = document.createElement("div");
        posterRow.classList.add("row");
        posterRow.style.display = "flex";
        posterRow.style.justifyContent = "center";
        let poster = document.createElement("img");
        poster.src = data[i].poster_path;
        //////
        let overviewRow = document.createElement("div");
        overviewRow.classList.add("row");
        overviewRow.style.display = "flex";
        overviewRow.style.justifyContent = "center";
        let overview = document.createElement("p");
        overview.style.textAlign = "center";
        overview.textContent = data[i].overview;
        /////////
        let vote_averageRow = document.createElement("div");
        vote_averageRow.classList.add("row");
        vote_averageRow.style.display = "flex";
        vote_averageRow.style.justifyContent = "center";
        let vote_average = document.createElement("h3");
        vote_average.textContent = data[i].vote_average;
        ///////
        let parsedDataStreem = JSON.parse(data[i].flatrate);
        let parsedDataRent = JSON.parse(data[i].rent);
        console.log(parsedDataRent)
        ////////////////////////////////
        let flatrateContainer = document.createElement("div");
        flatrateContainer.classList.add("row");

        let streemTitlerow = document.createElement("div")
        streemTitlerow.classList.add("row")
        let streemTitle = document.createElement("h4")
        streemTitle.style.textAlign ="center"
        streemTitle.textContent = "Streeming Locations:"
        
        try {
          for (let j = 0; j < parsedDataStreem.length; j++) {
            
            let streemSource = document.createElement("div");
            streemSource.classList.add("col");
            streemSource.classList.add("s12");
            streemSource.style.textAlign = "center"
            streemSource.textContent = parsedDataStreem[j].provider_name
            flatrateContainer.append(streemSource)
            
          }
        } catch (err) {
            
            let streemSource = document.createElement("div");
            streemSource.classList.add("col");
            streemSource.classList.add("s12");
            streemSource.style.textAlign = "center"
            streemSource.textContent = "No Known Streeming Service"
            flatrateContainer.append(streemSource)
        }
        //////////
        let rentContainer = document.createElement("div");
        rentContainer.classList.add("row");

        let rentTitlerow = document.createElement("div")
        rentTitlerow.classList.add("row")
        let rentTitle = document.createElement("h4")
        rentTitle.style.textAlign ="center"
        rentTitle.textContent = "Renting Locations:"
        
        try {
          for (let x = 0; x < parsedDataRent.length; x++) {
            
            let rentSource = document.createElement("div");
            rentSource.classList.add("col");
            rentSource.classList.add("s12");
            rentSource.style.textAlign = "center"
            rentSource.textContent = parsedDataRent[x].provider_name
            rentContainer.append(rentSource)
            
          }
        } catch (err) {
            
            let rentSource = document.createElement("div");
            rentSource.classList.add("col");
            rentSource.classList.add("s12");
            rentSource.style.textAlign = "center"
            rentSource.textContent = "No Known Streeming Service"
            
            rentContainer.append(rentSource)
        }

        
        
        main.prepend(row)
        row.append(card)
        card.append(del)
        card.append(titleRow)
        titleRow.append(title)
        card.append(posterRow)
        posterRow.append(poster)
        card.append(overviewRow)
        overviewRow.append(overview)
        card.append(vote_averageRow)
        vote_averageRow.append(vote_average)
        card.append(streemTitlerow)
        streemTitlerow.append(streemTitle)
        card.append(flatrateContainer)
        card.append(rentTitlerow)
        rentTitlerow.append(rentTitle)
        card.append(rentContainer)
        




      }
    });
};
