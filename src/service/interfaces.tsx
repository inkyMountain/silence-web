import http from './http';

interface EmailLoginData {
  email: string;
  password: string;
}

// 邮箱登录要求是网易邮箱，所以...
export const loginViaEmail = async ({email, password}: EmailLoginData) => {
  return await http.post('/login', {email, password});
};

interface PhoneoginData {
  phone: string;
  password: string;
}

// 目前只有手机号登录可用
export const loginViaPhone = async ({phone, password}: PhoneoginData) => {
  return await http.post('/login/cellphone', {phone, password});
};

export const fetchPlaylist = async (uid: number) => {
  return await http.get('/user/playlist', {params: {uid}});
};

export const fetchUser = async () => {
  return await http.get('/user/subcount');
};


