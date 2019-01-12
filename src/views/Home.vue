<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>
      <span>修改号码</span> <input type="text" v-model='tel'>
      <button type='button' @click='updateTel'>提交</button>
    </div>
    <div v-if='userInfo && userInfo.name!=""'>
      <p>姓名:{{userInfo.name}}</p>
      <p v-if='userInfo.tel!=""'>电话:{{userInfo.tel}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import service from '@/service/api';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'home',
  data() {
    return {
      userInfo: null,
      tel: ''
    };
  },
  components: {
    HelloWorld
  },
  created() {
    service.getUser().then(data => {
      console.log(data);
      this.updateUser(data.data);
      this.userInfo = data.data;
      this.tel = this.userInfo.tel;
    });
  },
  methods: {
    updateTel() {
      var data = JSON.parse(JSON.stringify(this.userInfo));
      data.tel = this.tel;
       this.updateUser(data);
      this.userInfo = this.getUser;
    },
    ...mapActions({
      updateUser: 'updateUser'
    })
  },
  computed: {
    test: function() {
      return 'test';
    },
    ...mapGetters({
      'getUser': 'getUser'
    })
  }
};
</script>
