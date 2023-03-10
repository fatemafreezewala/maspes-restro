import axios from 'axios';

export const baseUrl = 'http://143.198.111.15:3002';
export const apiUrl = 'http://143.198.111.15:3002/api';
export const imageUrl = 'http://143.198.111.15/demoapp/uploads';

export const api = axios.create({
  baseURL: 'http://143.198.111.15:3002/api',
});
