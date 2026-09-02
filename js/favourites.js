const container = document.getElementById("favouritesContainer");
const emptyMsg = document.getElementById("emptyMsg");

let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

function displayFavourites() {
  container.innerHTML = "";

  // No favourites
  if (favourites.length === 0) {
    emptyMsg.classList.remove("d-none");
    return;
  }

  // Hide empty message
  emptyMsg.classList.add("d-none");

  favourites.forEach((movie, index) => {
    if (!movie || !movie.id) return;

    container.innerHTML += `
        
            <div class="col-lg-3 col-md-4 col-sm-6">

                <div class="movie-card">

                    <img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        alt="${movie.title}"
                    >

                    <div class="movie-overlay">

                        <h4 class="movie-title">
                            ${movie.title}
                        </h4>

                        <p class="movie-rating">
                            ⭐ ${
                              movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : "N/A"
                            }
                        </p>

                        <small class="text-light">
                            ${movie.release_date || "No date"}
                        </small>

                        <button
                            class="btn btn-danger btn-sm mt-2"
                            onclick="removeFav(${index})"
                        >
                            <i class="fa-solid fa-trash"></i>
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        `;
  });
}

function removeFav(index) {
  favourites.splice(index, 1);

  localStorage.setItem("favourites", JSON.stringify(favourites));

  displayFavourites();
}

displayFavourites();
