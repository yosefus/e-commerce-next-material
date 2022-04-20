import axios from 'axios';
import { toast } from 'react-toastify';

export const apiReq = async ({ path, body, method }) => {
  try {
    const { data } = await axios({
      method: method,
      url: '/api' + path,
      data: body,
    });

    console.log('api req', data);

    if (!data.success) throw data;

    return data.data;
  } catch (error) {
    if (error.code == 401) toast.error("your token is not valid, please log in again")
    console.log(error.message || error);
    const msgError = "sorry! something went wrong..."
    if (!error.my) error.message = msgError
    return { ...error, error: true }
  }
};

export const setToken = (token) => axios.defaults.headers.common['Authorization'] = token