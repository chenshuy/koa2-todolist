<template>
  <el-container direction="vertical">
    <!-- 头部 -->
      <Header/>
    <!-- 内容 -->
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import Header from './Header';

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
$cl: #409EFF;
.el-header {
  background: $cl;
}
</style>
