import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getBooksByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbBooks = response.data;
      const books = [];
      if (fbBooks) {
        Object.keys(fbBooks).forEach((fbId) => {
          fbBooks[fbId].id = fbId;
          books.push(fbBooks[fbId]);
        });
      }
      resolve(books);
    })
    .catch((err) => reject(err));
});

const getSingleBook = (bookId) => axios.get(`${baseUrl}/books/${bookId}.json`);

const postBook = (newBook) => axios.post(`${baseUrl}/books.json`, newBook);

const deleteBook = (bookId) => axios.delete(`${baseUrl}/books/${bookId}.json`);

const putBook = (bookId, updatedBook) => axios.put(`${baseUrl}/books/${bookId}.json`, updatedBook);

export default {
  getBooksByUid,
  getSingleBook,
  postBook,
  deleteBook,
  putBook,
};
