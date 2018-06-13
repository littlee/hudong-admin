const isProd = process.env.NODE_ENV === 'production';

export default {
  api_prefix: isProd ? 'http://plugin.dyyz1993.cn/api/admin' : '/api/admin',
  config_data_key: 'hudong_config',
  preview_url: isProd
    ? 'http://plugin.dyyz1993.cn/h5/answer/'
    : 'http://localhost:3000/'
};
