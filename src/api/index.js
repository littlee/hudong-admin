import axios from 'axios';

import vm from '@/main';
import config from '@/config';

axios.interceptors.response.use(
  res => {
    // 如果不是服务器的请求，例如上传到七牛
    if (res.config && res.config.ignoreResCode) {
      return Promise.resolve(res.data);
    }

    // 服务器请求出错
    if (res.data.code !== 0) {
      vm.$message.error(`${res.data.message}`);
      if (res.data.message === '用户未登录') {
        vm.$router.push({ path: '/signin' });
      }
      return Promise.reject(res.data);
    }

    return Promise.resolve(res.data);
  },
  err => {
    if (axios.isCancel(err)) {
      console.log(err.message);
    }
    // vm.$message.error(`${JSON.stringify(err)}`);
    vm.$message.error(`??? ${err.message}`);
    return Promise.reject(err);
  }
);

export const login = data => {
  return axios.post(config.api_prefix + '/common/login', data);
};

export const logout = () => {
  return axios.post(config.api_prefix + '/common/logout');
};

export const getToken = () => {
  return axios.get(config.api_prefix + '/common/getToken');
};

export const actList = (page = 1) => {
  return axios.get(config.api_prefix + '/collect/activity/list', {
    params: {
      page
    }
  });
};

export const getAct = id => {
  return axios.get(config.api_prefix + '/collect/activity/get', {
    params: {
      id
    }
  });
}

export const createAct = data => {
  return axios.post(config.api_prefix + '/collect/create', data);
};

export const updateAct = (id, data) => {
  return axios.post(config.api_prefix + '/collect/update/' + id, data);
};

export const actUserList = (page = 1) => {
  return axios.get(config.api_prefix + '/collect/activity/user/list', {
    params: {
      page
    }
  });
};
