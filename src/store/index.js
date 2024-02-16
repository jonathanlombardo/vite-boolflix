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

  genresSeries: [],
  genresMovies: [],
  genresFilms: [],

  isLoading: false,

  filmOpened: {
    film: {},
    cast: [],
    crew: [],
    show: false,
    similar: [],
  },

  filter: {
    serie: false,
    movie: false,
    genreID: false,
    showGenres: false,
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
              type: "movie",
              genreIds: movie.genre_ids,
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
              type: "tv",
              genreIds: serie.genre_ids,
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
              type: "tv",
              genreIds: serie.genre_ids,
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
              type: "movie",
              genreIds: movie.genre_ids,
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
              type: "tv",
              genreIds: serie.genre_ids,
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
              type: "movie",
              genreIds: movie.genre_ids,
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
              type: "tv",
              genreIds: serie.genre_ids,
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
              type: "movie",
              genreIds: movie.genre_ids,
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

  async fetchGenreMovies() {
    return new Promise((resolve) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/genre/movie/list?include_adult=${this.isAdult}&language=${this.lang}`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.genresMovies = response.data.genres;

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

  async fetchGenreSeries() {
    return new Promise((resolve) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${tmdbApiUri}/genre/tv/list?include_adult=${this.isAdult}&language=${this.lang}`,
        headers: {
          Authorization: `Bearer ${tmdbApiToken}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          this.genresSeries = response.data.genres;

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

  async fetchGenreFilms() {
    this.isLoading = true;

    await this.fetchGenreMovies();
    await this.fetchGenreSeries();

    this.genresFilms = [];

    this.genresMovies.forEach((genre) => {
      this.genresFilms.push(genre);
    });

    this.genresSeries.forEach((genre) => {
      const genreAlreadyExist = this.genresFilms.map((genre) => genre.id);
      if (!genreAlreadyExist.includes(genre.id)) this.genresFilms.push(genre);
    });

    this.isLoading = false;

    // console.log(this.popFilms);
  },

  fetchFilmCredits(film, maxCast = 5, maxCrew = 5) {
    this.isLoading = true;

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${tmdbApiUri}/${film.type}/${film.id}/credits?language=${this.lang}`,
      headers: {
        Authorization: `Bearer ${tmdbApiToken}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        const mappedCast = response.data.cast.map((actor) => {
          const { id, name, character, profile_path } = actor;
          return { id, name, character, profile_path };
        });

        this.filmOpened.cast = mappedCast.filter((actor, index) => index < maxCast);

        const mappedCrew = response.data.crew.map((member) => {
          const { id, name, job, profile_path } = member;
          return { id, name, role: job, profile_path };
        });

        this.filmOpened.crew = mappedCrew.filter((actor, index) => index < maxCrew);
      })
      .catch((error) => {
        console.error("La chiamata axios ha riportato: ", error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },

  fetchFilmSimilar(film) {
    this.isLoading = true;

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${tmdbApiUri}/${film.type}/${film.id}/similar?language=${this.lang}`,
      headers: {
        Authorization: `Bearer ${tmdbApiToken}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        this.filmOpened.similar = response.data.results.map((element) => {
          let original_title;
          let release_date;
          let title;

          if (film.type == "tv") {
            original_title = element.original_name;
            release_date = element.first_air_date;
            title = element.original_name;
          }

          if (film.type == "movie") {
            original_title = element.original_title;
            release_date = element.release_date;
            title = element.title;
          }

          return {
            id: element.id,
            type: film.type,
            genreIds: element.genre_ids,
            adult: element.adult,
            backdrop_path: element.backdrop_path,
            poster_path: element.poster_path,
            original_language: element.original_language,
            original_title,
            overview: element.overview,
            popularity: element.popularity,
            release_date,
            title,
            vote_average: element.vote_average,
            vote_count: element.vote_count,
          };
        });
      })
      .catch((error) => {
        console.error("La chiamata axios ha riportato: ", error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
});
