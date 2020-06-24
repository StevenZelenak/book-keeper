import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getStatuses = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/status.json?`)
    .then((response) => {
      const fbStatuses = response.data;
      const statuses = [];
      if (fbStatuses) {
        Object.keys(fbStatuses).forEach((fbStatusId) => {
          fbStatuses[fbStatusId].id = fbStatusId;
          statuses.push(fbStatuses[fbStatusId]);
        });
      }
      resolve(statuses);
    })
    .catch((err) => reject(err));
});

export default {
  getStatuses,
};
