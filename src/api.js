import axios from 'axios';

<<<<<<< HEAD
// 根據環境設置API基礎URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({ baseURL });
=======
// 根據環境選擇 API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const api = axios.create({ 
  baseURL: API_URL,
  timeout: 30000 // 30秒超時
});
>>>>>>> e8c387e47f765d221fe3cfc6917f36e3da309df3

export default api;