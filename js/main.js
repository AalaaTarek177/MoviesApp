let allMovies = [];

function addMoviesToAllMovies(movies) {
    for (let movie of movies) {
        if (!movie || !movie.id) continue;

        const exists = allMovies.some(
            (m) => m && m.id === movie.id
        );

        if (!exists) {
            allMovies.push(movie);
        }
    }
}

async function getPopularMovies() {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/popular?language=en-US&page=1`,
            options
        );

        const data = await response.json();

        addMoviesToAllMovies(data.results);
        displayMovies(data.results, "moviesContainer");
    } catch (error) {
        console.error(error);
    }
}

async function getTrendingMovies() {
    try {
        const response = await fetch(
            `${BASE_URL}/trending/movie/day`,
            options
        );

        const data = await response.json();

        addMoviesToAllMovies(data.results);
        displayMovies(data.results, "trendingMoviesContainer");
    } catch (error) {
        console.error(error);
    }
}

async function getTopRatedMovies() {
    try {
        const response = await fetch(
            `${BASE_URL}/movie/top_rated?language=en-US&page=1`,
            options
        );

        const data = await response.json();

        addMoviesToAllMovies(data.results);
        displayMovies(data.results, "topRatedMoviesContainer");
    } catch (error) {
        console.error(error);
    }
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    let cartona = "";

    for (let movie of movies) {
        if (!movie) continue;

        cartona += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="movie-card">
                    <img
                        src="${IMAGE_URL}${movie.poster_path}"
                        alt="${movie.title}"
                    >

                    <div class="movie-overlay">
                        <h4 class="movie-title">${movie.title}</h4>

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
                            onclick="addToFavouritesById(${movie.id})"
                        >
                            ❤ Favorite
                        </button>
                        <button
    class="btn btn-warning btn-sm mt-2"
    onclick="addToWatchlistById(${movie.id})"
>
    <i class="fa-regular fa-clock"></i>
    Watchlist
</button>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = cartona;
}

function addToFavouritesById(movieId) {
    const movie = allMovies.find(
        (m) => m && m.id === movieId
    );

    if (!movie) {
        console.log("Movie not found:", movieId);
        return;
    }

    addToFavourites(movie);
}

function addToWatchlistById(movieId) {
    const movie = allMovies.find(
        (m) => m && m.id === movieId
    );

    if (!movie) {
        console.log("Movie not found:", movieId);
        return;
    }

    addToWatchlist(movie);
}

function addToWatchlist(movie) {
    if (!movie || !movie.id) {
        console.log("Invalid movie:", movie);
        return;
    }

    let watchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = watchlist.some(
        (m) => m && m.id === movie.id
    );

    if (exists) {
        showFavToast(
            "Already in Watchlist",
            "This movie is already saved ⚠️"
        );
        return;
    }

    watchlist.push(movie);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    showFavToast(
        "Added to Watchlist",
        "Movie added successfully ⏰"
    );
}

function addToFavourites(movie) {
    if (!movie || !movie.id) {
        console.log("Invalid movie:", movie);
        return;
    }

    let favourites =
        JSON.parse(localStorage.getItem("favourites")) || [];

    favourites = favourites.filter(
        (m) => m && m.id
    );

    const exists = favourites.some(
        (m) => m.id === movie.id
    );

    if (!exists) {
        favourites.push(movie);

        localStorage.setItem(
            "favourites",
            JSON.stringify(favourites)
        );

        showFavToast(
            "Added to Favourites",
            "Movie added successfully ❤️"
        );
    } else {
        showFavToast(
            "Already in Favourites",
            "This movie is already saved ⚠️"
        );
    }
}

let favToastTimer;

function showFavToast(title, message) {
    const toast = document.getElementById("favToast");

    if (!toast) return;

    const toastTitle = toast.querySelector("h5");
    const toastMessage = toast.querySelector("p");

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(favToastTimer);

    favToastTimer = setTimeout(() => {
        hideFavToast();
    }, 3000);
}

function hideFavToast() {
    const toast = document.getElementById("favToast");

    if (!toast) return;

    toast.classList.remove("show");
}

function scrollMovies(containerId, direction) {
    const container = document.getElementById(containerId);

    container.scrollBy({
        left: direction * 700,
        behavior: "smooth"
    });
}

getPopularMovies();
getTrendingMovies();
getTopRatedMovies();