<template>
  <el-row class="sign-in">
      <el-col :span='24'>
          <el-row type="flex" justify="center">
              <el-col :span='4'>
                  <h1>SignUp</h1>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span='10'>
                <el-form>
                    <el-form-item label='Email: '>
                        <el-input v-model='email'></el-input>
                    </el-form-item>
                    <el-form-item label='PasswordOne: '>
                        <el-input v-model='passwordOne'></el-input>
                    </el-form-item>
                    <el-form-item label='PasswordTwo: '>
                        <el-input v-model='passwordTwo'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='primary' @click='signUp' :disabled='email===""||passwordOne===""||passwordTwo!==passwordOne'>Sign Up</el-button>
                        <p>表单提交之后,会给你的邮箱发送验证邮件,请去你的邮箱进行验证</p>
                        <p v-if="error" style="color: #f56c6c">请检查邮箱的格式,密码需包含字母和数字</p>
                    </el-form-item>
                </el-form>
              </el-col>
          </el-row>
      </el-col>
  </el-row>
</template>

<script>
import { mapActions } from 'vuex'
import { IsEmail,IsPassword } from '../util'
export default {
    name: 'SignIn',
    data () {
        return {
            email: '',
            passwordOne: '',
            passwordTwo: '',
            error: false,
        }
    },
    methods: {
        ...mapActions(['doSignUpWithEmailAndPassword']),
        signUp() {
            if(IsPassword(this.passwordOne)&&IsEmail(this.email)) {
                this.doSignUpWithEmailAndPassword({email: this.email, password: this.passwordOne})
            }else {
                this.error = true;
            }
        }
    }
}
</script>

<style>
.el-form {
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 2rem;
    padding: 1rem 2rem;
}
.el-button {
    width: 100%;
}
</style>