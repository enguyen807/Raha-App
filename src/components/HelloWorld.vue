<template>
  <div class="hello">
    <input type="text" v-model="name" />
    <button @click="createUser">Create User</button>
  </div>
</template>

<script>
import Request from "../api/index";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      req: new Request(),
      name: "",
    };
  },
  methods: {
    createUser() {
      const data = JSON.stringify({ data: { name: this.name } });
      // this.axios
      //   .post("/api/v1/accounts", { data: data })
      //   .then(function (response) {
      //     console.log(JSON.stringify(response.data));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
      this.req.make("POST", "/accounts", data);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
