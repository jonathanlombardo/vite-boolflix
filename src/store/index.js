import { reactive } from "vue";
import axios from "axios";
// export { axios };

const tmdbApiToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGUyNTIxNTc3ZGUwOWQzOWE3ZjYyZWM3ZDQyNzU5ZSIsInN1YiI6IjY1Y2M5YjU1MTNhZjVmMDE2MzlmOTliYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GxOYAAfcIocpXXVuRDwnbtVm5mig4ioPOtlS6hflj1Y";
const tmdbApiUri = "https://api.themoviedb.org/3";

export const store = reactive({
  // settings
  isAdult: false,
  lang: "it-IT",

  // searchText: "",
  tmdbQuary: "",

  foundedMovies: [],
  foundedSeries: [],
  foundedFilms: [],

  popSeries: [],
  popMovies: [],
  popFilms: [],

  newSeries: [],
  newMovies: [],
  newFilms: [],

  lovedSeries: [],
  lovedMovies: [],
  lovedFilms: [],

  isLoading: false,

  filmOpened: {
    film: {},
    show: false,
  },

  filter: {
    serie: false,
    movie: false,
  },

  async fetchMovies() {
    return new Promise((resolve) => {
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
              id: movie.id,
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

          this.foundedMovies.sort((a, b) => {
            return b.popularity - a.popularity;
          });

          resolve();
        })
        .catch((error) => {
          resolve(console.error("La chiamata axios ha riportato: ", error));
        })
        .finally(() => {
          if (searchText != this.tmdbQuary) this.fetchMovies();
          resolve();
        });
    });
  },

  async fetchSeries() {
    return new Promise((resolve) => {
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
              id: serie.id,
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

          this.foundedSeries.sort((a, b) => {
            return b.popularity - a.popularity;
          });

          resolve();
        })
        .catch((error) => {
          resolve(console.error("La chiamata axios ha riportato: ", error));
        })
        .finally(() => {
          if (searchText != this.tmdbQuary) this.fetchMovies();
          resolve();
        });
    });
  },

  async fetchFilms() {
    this.isLoading = true;
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
    this.isLoading = false;

    // console.log(this.foundedFilms);
  },

  async fetchPopSeries() {
    return new Promise((resolve) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/trending/tv/day?include_adult=${this.isAdult}&language=${this.lang}`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.popSeries = response.data.results.map((serie) => {
            return {
              id: serie.id,
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
          resolve();
        });
    });
  },

  async fetchPopMovies() {
    return new Promise((resolve) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/trending/movie/day?include_adult=${this.isAdult}&language=${this.lang}`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.popMovies = response.data.results.map((movie) => {
            return {
              id: movie.id,
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
          resolve();
        });
    });
  },

  async fetchPopFilms() {
    this.isLoading = true;

    await this.fetchPopSeries();
    await this.fetchPopMovies();

    this.popFilms = [];

    this.popMovies.forEach((movie) => {
      this.popFilms.push(movie);
    });

    this.popSeries.forEach((serie) => {
      this.popFilms.push(serie);
    });

    this.popFilms.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    this.isLoading = false;
    // console.log(this.popFilms);
  },

  async fetchNewSeries() {
    return new Promise((resolve) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/tv/airing_today?include_adult=${this.isAdult}&language=${this.lang}`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.newSeries = response.data.results.map((serie) => {
            return {
              id: serie.id,
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
          resolve();
        });
    });
  },

  async fetchNewMovies() {
    return new Promise((resolve) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/movie/now_playing?include_adult=${this.isAdult}&language=${this.lang}`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.newMovies = response.data.results.map((movie) => {
            return {
              id: movie.id,
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
          resolve();
        });
    });
  },

  async fetchNewFilms() {
    this.isLoading = true;

    await this.fetchNewSeries();
    await this.fetchNewMovies();

    this.newFilms = [];

    this.newMovies.forEach((movie) => {
      this.newFilms.push(movie);
    });

    this.newSeries.forEach((serie) => {
      this.newFilms.push(serie);
    });

    this.newFilms.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    this.isLoading = false;

    // console.log(this.newFilms);
  },

  async fetchLovedSeries() {
    return new Promise((resolve) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/discover/tv?include_adult=${this.isAdult}&language=${this.lang}&page=1&sort_by=vote_average.desc&vote_count.gte=200`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.lovedSeries = response.data.results.map((serie) => {
            return {
              id: serie.id,
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

          this.lovedSeries.sort((a, b) => {
            return b.vote_average - a.vote_average;
          });

          resolve();
        })
        .catch((error) => {
          resolve(console.error("La chiamata axios ha riportato: ", error));
        })
        .finally(() => {
          resolve();
        });
    });
  },

  async fetchLovedMovies() {
    return new Promise((resolve) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/discover/movie?include_adult=${this.isAdult}&language=${this.lang}&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.lovedMovies = response.data.results.map((movie) => {
            return {
              id: movie.id,
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

          this.lovedMovies.sort((a, b) => {
            return b.vote_average - a.vote_average;
          });

          resolve();
        })
        .catch((error) => {
          resolve(console.error("La chiamata axios ha riportato: ", error));
        })
        .finally(() => {
          resolve();
        });
    });
  },

  async fetchLovedFilms() {
    this.isLoading = true;

    await this.fetchLovedSeries();
    await this.fetchLovedMovies();

    this.lovedFilms = [];

    this.lovedMovies.forEach((movie) => {
      this.lovedFilms.push(movie);
    });

    this.lovedSeries.forEach((serie) => {
      this.lovedFilms.push(serie);
    });

    this.lovedFilms.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });

    this.isLoading = false;

    // console.log(this.popFilms);
  },
});
