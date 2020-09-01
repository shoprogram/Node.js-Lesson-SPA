<template>
  <div>
    <my-navi />
    <router-view
      :loginUser="loginUser"
      @logout="logout"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MyNavi from '@/components/Navi.vue';

export default {
  components: {
    MyNavi,
  },
  methods: {
    ...mapActions([
      'logout',
    ]),
  },
  computed: {
    ...mapGetters([
      'loginUser',
      'isAuthenticated',
    ]),
  },
  watch: {
    isAuthenticated() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: 'login' });
      }
    },
  },
};
</script>
