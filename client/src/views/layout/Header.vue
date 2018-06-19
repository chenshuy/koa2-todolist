<template>
  <el-header>
    <div class="layout-header clearf">
      <h1>todolist</h1>
      <div class="layout-header-right">
        <span>{{userName}}</span>
        <el-button @click="exit" class="btn-exit">退出</el-button>
      </div>
    </div>
  </el-header>
</template>

<script>
import api from '@/api';

export default {
  data() {
    return {
      userName: ''
    };
  },
  created() {
    this.setLoginInfo();
  },
  methods: {
    // 获取用户名
    setLoginInfo() {
      api.userInfo()
        .then((res) => {
          if (res.data.s) {
            this.userName = res.data.d;
            this.$store.dispatch('UserInfo', res.data.d);
          }
        });
    },
    // 退出
    exit() {
      this.$confirm('确认退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('UserLogout');
        this.$router.push({
          path: '/login'
        });
      });
    }
  }
};
</script>

<style lang="scss">
$cl: #409EFF;
.layout-header {
  background: $cl;
  color: #fff;
  padding-top: 14px;
  h1 {
    float: left;
    line-height: 32px;
    font-size: 28px;
  }
}
.layout-header-right {
  float: right;
  >span {
    line-height: 32px;
    margin-right: 10px;
  }
}
</style>
