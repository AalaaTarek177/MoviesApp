const container = document.getElementById("watchListContainer");

const emptyWatchList = document.getElementById("emptyWatchList");

let watchList =
    JSON.parse(localStorage.getItem("watchlist")) || [];

function displayWatchList() {

    container.innerHTML = "";

    if (watchList.length === 0) {
        emptyWatchList.classList.remove("d-none");
        return;
    }

    emptyWatchList.classList.add("d-none");

    watchList.forEach((movie, index) => {

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
                            ⭐ ${movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : "N/A"}
                        </p>

                        <small class="text-light">
                            ${movie.release_date || "No date"}
                        </small>

                        <button
                            class="btn btn-danger btn-sm mt-2"
                            onclick="removeFromWatchList(${index})"
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

function removeFromWatchList(index) {

    watchList.splice(index, 1);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchList)
    );

    displayWatchList();
}

displayWatchList();