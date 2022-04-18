import axios from 'axios';

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
    console.log(error.message || error);
    const msgError = "sorry! something went wrong..."
    if (!error.my) error.message = msgError
    return { ...error, error: true }
  }
};

export const setToken = (token) => axios.defaults.headers.common['Authorization'] = token