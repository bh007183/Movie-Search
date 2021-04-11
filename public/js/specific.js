



window.onload = function() {
    fetch("/api/saved", {
        method: "get",
          })    .then((res) => res.json())
          .then((data) => {
            console.log(data)
        
              
            
          });
      }


