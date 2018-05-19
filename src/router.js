import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Enroll from './views/Enroll/Enroll.vue';
import EnrollConfig from './views/Enroll/EnrollConfig.vue';
import EnrollDetail from './views/Enroll/EnrollDetail.vue';
import EnrollLink from './views/Enroll/EnrollLink.vue';
import EnrollInfo from './views/Enroll/EnrollInfo.vue';
import Vote from './views//Vote/Vote.vue';
import SignIn from './views/SignIn.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/enroll',
      name: 'enroll',
      component: Enroll
    },
    {
      path: '/enroll-config/create',
      name: 'enroll-config-create',
      component: EnrollConfig
    },
    {
      path: '/enroll-config/:id',
      name: 'enroll-config-edit',
      component: EnrollConfig
    },
    {
      path: '/enroll-detail/create',
      name: 'enroll-detail-create',
      component: EnrollDetail
    },
    {
      path: '/enroll-detail/:id',
      name: 'enroll-detail-edit',
      component: EnrollDetail
    },
    {
      path: '/enroll-link/:id',
      name: 'enroll-link',
      component: EnrollLink
    },
    {
      path: '/enroll-info/:id',
      name: 'enroll-info',
      component: EnrollInfo
    },
    {
      path: '/vote',
      name: 'vote',
      component: Vote
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    }
  ]
});
