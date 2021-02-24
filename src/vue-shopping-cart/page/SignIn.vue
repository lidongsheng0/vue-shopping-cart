<template>
  <el-row class="sign-in">
      <el-col :span='24'>
          <el-row type="flex" justify="center">
              <el-col :span='4'>
                  <h1>SignIn</h1>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span='10'>
                <el-form>
                    <el-form-item label='Email: '>
                        <el-input v-model='email'></el-input>
                    </el-form-item>
                    <el-form-item label='Password: '>
                        <el-input v-model='password'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='primary' @click="signIn" :disabled='email===""||password===""'>Sign In</el-button>
                        <p>Don't have an account <router-link to='/signup'>Sign Up</router-link></p>
                        <p v-if="error" style="color: #f56c6c">请检查邮箱的格式,密码需包含字母和数字</p>
                    </el-form-item>
                </el-form>
              </el-col>
          </el-row>
      </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex';
import { IsEmail,IsPassword } from '../util'


export default {
    name: 'SignIn',
    data(){
      return {
          email: '',
          password: '',
          error: false,
      } 
    },
    methods: {
        ...mapActions(['doSignInWithEmailAndPassword']),
        signIn() {
            if(IsPassword(this.password)&&IsEmail(this.email)) {
                this.doSignInWithEmailAndPassword({email: this.email, password: this.password});
            }else {
                this.error = true;
            }
        }
    }
}
</script>

<style>
h1 {
    font-size: 3rem;
    margin-top: 3rem;
}
</style>