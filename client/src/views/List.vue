<template>
  <div>
    <div>{{list}}</div>
  </div>
</template>

<script>
import api from '../api/api';

export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.setList();
  },
  methods: {
    setList() {
      api.getList()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>

</style>
