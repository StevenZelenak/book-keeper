import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/type.json?`)
    .then((response) => {
      const fbTypes = response.data;
      const types = [];
      if (fbTypes) {
        Object.keys(fbTypes).forEach((fbTypeId) => {
          fbTypes[fbTypeId].id = fbTypeId;
          types.push(fbTypes[fbTypeId]);
        });
      }
      resolve(types);
    })
    .catch((err) => reject(err));
});

export default {
  getTypes,
};
