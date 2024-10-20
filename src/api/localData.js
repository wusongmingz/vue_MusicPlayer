import '@/mock/index.js'
import axios from 'axios'



export function getLocalDataUser() {
    return axios.get('/api/user/list').then(response => {
      const data = response.data.data;
      return data;
    });
  } 