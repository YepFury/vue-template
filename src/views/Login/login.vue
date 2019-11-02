<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as types from "@/store/types";
import { validateName, validatePWD } from "@/utils/validators";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        pass: ""
      },
      rules: {
        username: [
          { required: true, validator: validateName, trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePWD, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions([types.LOGIN]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 校验成功请登录
          e.preventDefault();
          this[types.LOGIN](this.ruleForm);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
</style>>