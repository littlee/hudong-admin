<template>
  <div id="app">
    <el-container>
      <el-header class="header" v-if="showHeader">
        <span class="header-logo">互动平台管理系统</span>

        <div class="header-user">
          超级管理员，你好
          <a href="#" @click="clickLogout">退出</a>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px" v-if="showAside" class="aside">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title">
                <span>活动管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link to="/enroll">
                    报名调研
                  </router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link to="/vote">
                    投票评选
                  </router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view @signInMount="signInMount" @signInDestroy="signInDestroy" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { logout } from '@/api';

export default {
  data() {
    return {
      showHeader: true,
      showAside: true
    };
  },

  methods: {
    signInMount() {
      this.showHeader = false;
      this.showAside = false;
    },
    signInDestroy() {
      this.showHeader = true;
      this.showAside = true;
    },

    clickLogout() {
      logout().then(res => {
        this.$router.push('/signin')
      })
    }
  }
};
</script>


<style lang="less">
* {
  box-sizing: border-box;
}

body {
  font-size: 14px;
}

.header {
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  line-height: 60px;

  &-logo {
    height: 100%;
    font-size: 24px;
  }

  &-user {
    position: absolute;
    right: 15px;
    top: 0;
    height: 100%;
    // line-height: 60px;
  }
}

.el-menu-item {
  padding: 0;
  a {
    display: block;
    color: #333;
    text-decoration: none;
  }
}

.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}

.table-opt {
  padding: 0;
  margin: 5px 0;
}

.list-top-btns {
  text-align: right;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
}
</style>
