import http from './http';

// 邮箱登录要求是网易邮箱，所以...
export const loginViaEmail = async ({email, password}: { email: string; password: string; }) => {
  const res = await http.post('/login', {email, password});
  return res.data;
};

// 目前只有手机号登录可用
export const loginViaPhone = async ({phone, password}: { phone: string; password: string; }) => {
  const res = await http.post<User>('/login/cellphone', {phone, password});
  return res.data;
};

export const fetchPlaylists = async (uid: number) => {
  const res = await http.get<{ playlist: Array<Playlist> }>('/user/playlist', {params: {uid}});
  return res.data;
};

export const fetchPlaylistDetail = async (id: number) => {
  const res = await http.get<PlaylistDetail>('/playlist/detail', {params: {id}});
  return res.data;
};

export const fetchSongUrl = async (id: number | Array<number>) => {
  const ids = id = typeof id === 'number' ? [id] : id;
  const res = await http.get(`/song/url?id=${ids.join(',')}`);
  return res.data;
};
