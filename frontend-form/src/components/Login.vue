<template>
  <div class="container login-container">
    <div class="row">
      <div class="col-md-6 offset-md-3 login-form-2">
        <h3>Admin Login</h3>
        <form @submit.prevent="login">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Your Username *"
              v-model="username"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Your Password *"
              v-model="password"
            />
          </div>
          <div class="form-group">
            <input type="submit" class="btnSubmit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.username === "" || this.password === "") {
        this.$swal("Peringatan", "Tidak Boleh Kosong", "error");
      } else {
        this.$http
          .post("user/login/", {
            username: this.username,
            password: this.password
          })
          .then(
            response => {
              localStorage.setItem("token", response.data.data.token);
              this.$router.push("dashboard");
            },
            erroCallback => {
              this.$swal("Peringatan", erroCallback.data.message, "error");
            }
          );
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  margin-top: 5%;
  margin-bottom: 5%;
}
.login-form-2 {
  padding: 5%;
  background: #0062cc;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3 {
  text-align: center;
  color: #fff;
}
.login-container form {
  padding: 10%;
}
.btnSubmit {
  width: 50%;
  border-radius: 1rem;
  padding: 1.5%;
  border: none;
  cursor: pointer;
}

.login-form-2 .btnSubmit {
  font-weight: 600;
  color: #0062cc;
  background-color: #fff;
}
.login-form-2 .ForgetPwd {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
</style>
