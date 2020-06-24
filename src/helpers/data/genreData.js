import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getGenres = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/genre.json?`)
    .then((response) => {
      const fbGenres = response.data;
      const genres = [];
      if (fbGenres) {
        Object.keys(fbGenres).forEach((fbGenreId) => {
          fbGenres[fbGenreId].id = fbGenreId;
          genres.push(fbGenres[fbGenreId]);
        });
      }
      resolve(genres);
    })
    .catch((err) => reject(err));
});

export default {
  getGenres,
};
