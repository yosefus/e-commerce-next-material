import axios from 'axios';

export const apiReq = async ({ path, body, method }) => {
  try {
    const { data } = await axios({
      method: method,
      url: '/api' + path,
      data: body,
    });

    console.log('api req', data);

    if (!data.success) throw data.msg;

    return data.data;
  } catch (error) {
    console.log(error.message || error);
  }
};
