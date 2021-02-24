<template>
  <div class="account">
      <Navbar />
      <el-button @click='signOut'>Sign Out</el-button>
      <el-row>
          <el-col :span='12'>
              <h5>默认账户信息</h5>
              <p>登录类型: {{user.loginType}}</p>
              <p>邮箱账号: {{user.email}}</p>
          </el-col>
      </el-row>
      <el-divider />
      <el-row>
          <el-col :span='12'>
              <h5>关联用户名</h5>
              <el-alert title='关联用户名' description='关联之后,可以使用用户名 + 注册时的密码登录'></el-alert>
              <el-form @submit.prevent>
                  <el-form-item label='用户名:'>
                      <el-input type='text' maxlength='45' v-model='name' ></el-input>
                  </el-form-item>
                  <el-button @click='submit'>submit</el-button>
              </el-form>
          </el-col>
      </el-row>
      <el-divider />
      <el-row>
          <el-col :span='12'>
              <h5>完善详细个人信息</h5>
              <el-form @submit.prevent>
                  <el-form-item label='昵称:'>
                      <el-input type='text' v-model='nickName' ></el-input>
                  </el-form-item>
                  <el-form-item label='性别:'>
                      <el-select v-model='gender' size='medium'>
                          <el-option label='男' value='MALE'></el-option>
                          <el-option label='女' value='FEMALE'></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label='国籍:'>
                      <el-input type='text' v-model='country' ></el-input>
                  </el-form-item>
                  <el-form-item label='省份:'>
                      <el-input  type='text' v-model='province' ></el-input>
                  </el-form-item>
                  <el-form-item label='城市:'>
                      <el-input type='text' v-model='city' ></el-input>
                  </el-form-item>
                  <el-button @click='update'>Update</el-button>
              </el-form>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Navbar from '../components/Navbar';

export default {
    name: 'Account',
    data(){
        return {
            name: '',
            nickName: '',
            gender: 'MALE',
            country: '',
            province: '',
            city: '',
        }
    },
    components: {
        Navbar,
    },
    computed: {
        ...mapState(['user']),
    },
    methods: {
        ...mapActions(['doSignOut','doUpdateUserInfo','doUpdateUserName']),

        submit() {
            this.doUpdateUserName(this.name);
            this.$message({
                message: '关联用户名成功',
                type: 'success'
            })
        },
        update() {
            this.doUpdateUserInfo({
                nickName: this.nickName,
                gender: this.gender,
                country: this.country,
                province: this.province,
                city: this.city,
            });
            this.$message({
                message: '更新用户信息成功',
                type: 'success'
            });
            this.nickName = '';
            this.gender = '';
            this.country = '';
            this.province = '';
            this.city = '';
        },
        signOut() {
            this.$confirm('确认登出吗?','登出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                confirmButtonClass: 'confirm-btn',
                cancelButtonClass: 'confirm-btn'
            }).then(()=> {
                this.doSignOut();
                console.log(this.$router);
            }).catch(()=> {
                return;
            })
        }
    }
}
</script>

<style>
.account .el-row {
    margin-left: 5rem;
}
.confirm-btn {
    width: 5rem;
}
</style>