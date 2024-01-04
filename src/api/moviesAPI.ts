import axios from 'axios';
import type { Movie, Genre } from '@/services/interfaces/movies.interfaces';

export let movies = <Movie[]>[]
export let genres = <Genre[]>[]

export const getMovies = async():Promise<void> => {

  try {

    const apiBaseUrl = 'https://api.themoviedb.org/3';

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNzA0ZjE3YzkwY2E2YTZjYWQ5Mzk5ODI4YjkzYjcxMSIsInN1YiI6IjY1OTU5ZmIwYTY5OGNmNWNhMTQzOWZjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n_pwUN18u1TvFNcfUVPoCwKx69XFGKxWF33EgILDwMQ'
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWUxNjFjM2Q2YTczYzFiYWRmNjRiODAxN2RkODBlNCIsInN1YiI6IjYyZjIyNzIwMTUxMWFhMDA3ZDQyODRjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLXn1jHj49w417T36NxE0NENwVQ3Htaqz-5awc_NnkI'
      }
    };

    let moviesFromPage = <Movie[]>[]

    for (let i = 1; i < 6; i++) {
      const urlMovies = `${apiBaseUrl}/discover/movie?include_adult=false&include_video=false&language=fr-FR&region=FR&sort_by=popularity.desc&page=${i}`;
      const pageOfMovies = [...(await axios.get(urlMovies, options)).data.results]
      moviesFromPage.push(...pageOfMovies)
    }

    const urlGenre = `${apiBaseUrl}/genre/movie/list?language=fr`;

    movies = moviesFromPage
    genres = (await axios.get(urlGenre, options)).data

  } catch (error) {
      console.error('Not data found')
  }

}


