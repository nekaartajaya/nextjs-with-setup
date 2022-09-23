import api from '.';

export const getData = async () => {
  const res = await api.get('posts');
  console.log(res);
};
