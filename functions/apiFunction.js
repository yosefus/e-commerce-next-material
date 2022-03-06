import axios from 'axios';

export const apiReq = async ({ path, body, method }) => {
  try {
    const { data } = await axios({
      method: method,
      url: '/api' + path,
      data: body,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
