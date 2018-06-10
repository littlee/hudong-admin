import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Enroll from './views/Enroll/Enroll.vue';
import EnrollConfig from './views/Enroll/EnrollConfig.vue';
import EnrollDetail from './views/Enroll/EnrollDetail.vue';
import EnrollLink from './views/Enroll/EnrollLink.vue';
import EnrollInfo from './views/Enroll/EnrollInfo.vue';
import Vote from './views//Vote/Vote.vue';
import VoteConfig from './views/Vote/VoteConfig.vue';
import VoteDetail from './views/Vote/VoteDetail.vue';
import SignIn from './views/SignIn.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/enroll',
      component: Home
    },
    // 报名
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
    // 投票
    {
      path: '/vote',
      name: 'vote',
      component: Vote
    },
    {
      path: '/vote-config/create',
      name: 'vote-config-create',
      component: VoteConfig
    },
    {
      path: '/vote-config/:id',
      name: 'vote-config-edit',
      component: VoteConfig
    },
    {
      path: '/vote-detail/create',
      name: 'vote-detail-create',
      component: VoteDetail
    },
    {
      path: '/vote-detail/:id',
      name: 'vote-detail-edit',
      component: VoteDetail
    },
    // 登录
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    }
  ]
});
