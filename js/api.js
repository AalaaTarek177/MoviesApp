const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Zjc4OWE4M2EyNzBjMWI3ZjA3NDM2NjE1YWNhZDEwYiIsIm5iZiI6MTc4MTg3NjUxMy4zOTYsInN1YiI6IjZhMzU0NzIxZDk0ZTVhMzY4ODViOTYxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8AWzAk34LMdVVHcJTzD7iN3gwN5tlvaC1C23BFiSTUQ"
  }
};