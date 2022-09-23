import axios from 'axios';
import Cookie from 'js-cookie';

// TODO : Get authToken from localstorage or cookies, then remove this variable
const authToken = {
  access: 'access',
  refresh: 'refresh',
};

// TODO : create variable NEXT_PUBLIC_API_URL in .env file
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {Authorization: `Bearer ${authToken?.access}`},
});

axiosInstance.interceptors.request.use(async req => {
  if (!authToken) {
    const authToken = Cookie.get('authToken') ? JSON.parse(Cookie.get('authToken')) : null;
    req.headers.Authorization = `Bearer ${authToken?.access}`;
  }

  // TODO : Get expire time of access token, then compare it with now, if expired, then call api refresh token
  const isExpired = false;
  if (!isExpired) return req;

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token/`, {
    refresh: authToken.refresh,
  });

  // TODO : change current access token in cookies with new access token from response
  Cookie.set('authToken', JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;

  return req;
});

export default axiosInstance;
