import { reactive } from "vue";
import axios from "axios";
// export { axios };

const tmdbApiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGUyNTIxNTc3ZGUwOWQzOWE3ZjYyZWM3ZDQyNzU5ZSIsInN1YiI6IjY1Y2M5YjU1MTNhZjVmMDE2MzlmOTliYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GxOYAAfcIocpXXVuRDwnbtVm5mig4ioPOtlS6hflj1Y";
const tmdbApiUri = "https://api.themoviedb.org/3";

export const store = reactive({
  // settings
  isAdult: "true",
  lang: "it-IT",

  // searchText: "",
  tmdbQuary: "",
  foundedMovies: [],
  foundedSeries: [],
  foundedFilms: [],

  isLoading: false,

  async fetchMovies() {
    return new Promise((resolve) => {
      if (this.isLoading) return resolve();
      const searchText = this.tmdbQuary;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/search/movie?query=${searchText.split(" ").join("%20")}&include_adult=${this.isAdult}&language=${this.lang}`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.foundedMovies = response.data.results.map((movie) => {
            return {
              adult: movie.adult,
              backdrop_path: movie.backdrop_path,
              poster_path: movie.poster_path,
              original_language: movie.original_language,
              original_title: movie.original_title,
              overview: movie.overview,
              popularity: movie.popularity,
              release_date: movie.release_date,
              title: movie.title,
              vote_average: movie.vote_average,
              vote_count: movie.vote_count,
            };
          });
          resolve();
        })
        .catch((error) => {
          resolve(console.error("La chiamata axios ha riportato: ", error));
        })
        .finally(() => {
          this.isLoading = false;
          if (searchText != this.tmdbQuary) this.fetchMovies();
          resolve();
        });
    });
  },

  async fetchSeries() {
    return new Promise((resolve) => {
      if (this.isLoading) return;
      const searchText = this.tmdbQuary;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/search/tv?query=${searchText.split(" ").join("%20")}&include_adult=${this.isAdult}&language=${this.lang}`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.foundedSeries = response.data.results.map((serie) => {
            return {
              adult: serie.adult,
              backdrop_path: serie.backdrop_path,
              poster_path: serie.poster_path,
              original_language: serie.original_language,
              original_title: serie.original_name,
              overview: serie.overview,
              popularity: serie.popularity,
              release_date: serie.first_air_date,
              title: serie.name,
              vote_average: serie.vote_average,
              vote_count: serie.vote_count,
            };
          });

          resolve();
        })
        .catch((error) => {
          resolve(console.error("La chiamata axios ha riportato: ", error));
        })
        .finally(() => {
          this.isLoading = false;
          if (searchText != this.tmdbQuary) this.fetchMovies();
          resolve();
        });
    });
  },

  async fetchFilms() {
    await this.fetchMovies();
    await this.fetchSeries();

    this.foundedFilms = [];

    this.foundedMovies.forEach((movie) => {
      this.foundedFilms.push(movie);
    });

    this.foundedSeries.forEach((serie) => {
      this.foundedFilms.push(serie);
    });

    this.foundedFilms.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    console.log(this.foundedFilms);
  },
});
