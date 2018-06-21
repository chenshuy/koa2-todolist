<template>
  <div class="regist-wrap">
    <el-form :model="regForm" :rules="rules" label-width="100px" ref="regForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="regForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="regForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="regForm.checkPassword" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('regForm')">注册</el-button>
        <router-link to="/login" style="font-size:12px;line-height:30px;color:#999;margin-left: 20px;">登录</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '../api';

export default {
  data() {
    // 验证帐号
    const validatePass1 = (rule, value, callback) => {
      const reg = /^[a-zA-Z0-9_]{4,16}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入有效用户名'));
      } else {
        callback();
      }
    };
    // 验证密码是否重复
    const validatePass3 = (rule, value, callback) => {
      if (value !== this.regForm.password) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    return {
      regForm: {
        username: '',
        password: '',
        checkPassword: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            validator: validatePass1,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '密码长度至少6位',
            trigger: 'blur'
          }
        ],
        checkPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: 'blur'
          },
          {
            validator: validatePass3,
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) { // 验证通过
          api.userRegister(this.regForm)
            .then(({ data }) => {
              if (data.s) {
                this.$message({
                  type: 'success',
                  message: '注册成功'
                });
                this.$router.push({ path: '/login' });
              } else {
                this.$message.error(data.m);
              }
            });
        } else { // 验证不通过
          return false;
        }
      });
    }
  }
};

</script>

<style>
.regist-wrap {
  max-width: 400px;
  margin: 20% auto 0;
}

</style>
