<template lang="">
  <div class="login-register-area ptb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-md-12 ml-auto mr-auto pdy-0 pdx-15 tpl-ff">
          <div class="login-register-wrapper">
            <div class="login-register-tab-list nav">
              <a
                class="active"
                data-toggle="tab"
                href="#lg1"
                @click="$nuxt.$emit('titleBreadCrumb', titleLogin)"
              >
                <h4 @click="refreshPage">login</h4>
              </a>
              <a
                data-toggle="tab"
                href="#lg2"
                @click="$nuxt.$emit('titleBreadCrumb', titleRegister)"
              >
                <h4 @click="refreshPage">register</h4>
              </a>
            </div>
            <div class="tab-content">
              <div id="lg1" class="tab-pane active">
                <div class="login-form-container">
                  <div class="login-register-form">
                    <form method="POST">
                      <div class="form-control-a">
                        <input
                          type="text"
                          name="user-name"
                          v-model="username"
                          @input="refreshErrors"
                          placeholder="Username"
                        />
                        <span
                          v-if="errors && errors.username"
                          class="error-message"
                          id="username-error"
                          >{{ errors.username ? errors.username[0] : "" }}</span
                        >
                      </div>

                      <div class="form-control-a">
                        <input
                          type="password"
                          name="user-password"
                          @input="refreshErrors"
                          v-model="password"
                          placeholder="Password"
                        />
                        <span
                          v-if="errors && errors.password"
                          class="error-message"
                          id="password-error"
                          >{{ errors.password ? errors.password[0] : "" }}</span
                        >
                      </div>

                      <div class="button-box">
                        <div class="login-toggle-btn">
                          <input
                            type="checkbox"
                            id="remember_me"
                            v-bind:checked="remember_me"
                            @change="toggleRememberMe"
                          />
                          <label for="remember_me">Remember me</label>
                          <NuxtLink to="/forgot-password">Forgot Password?</NuxtLink>
                        </div>
                        <button @click.prevent="login">
                          <span>Login</span>
                        </button> <br>
                        <span
                          v-if="errors && errors.account"
                          class="error-message"
                          id="account-error"
                          >{{ errors.account[0] ?? "" }}</span
                        >
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div id="lg2" class="tab-pane">
                <div class="login-form-container">
                  <div class="login-register-form">
                    <form method="POST">
                      <div class="form-control-a">

                      <div class="form-control-a">
                        <input
                          type="email"
                          name="user-email"
                          v-model="email"
                          placeholder="Email"
                        />
                        <span
                          v-if="errors && errors.email"
                          class="error-message"
                          id="email-error"
                          >{{ errors.email ? errors.email[0] : "" }}</span
                        >
                      </div>

                        <input
                          type="text"
                          name="user-name"
                          v-model="username"
                          placeholder="Username"
                        />
                        <span
                          v-if="errors && errors.username"
                          class="error-message"
                          id="username-error"
                          >{{ errors.username ? errors.username[0] : "" }}</span
                        >
                      </div>

                      <div class="form-control-a">
                        <input
                          type="password"
                          name="user-password"
                          v-model="password"
                          placeholder="Password"
                        />
                        <span
                          v-if="errors && errors.password"
                          class="error-message"
                          id="password-error"
                          >{{ errors.password ? errors.password[0] : "" }}</span
                        >
                      </div>
                      <div class="button-box">
                        <button @click.prevent="register"><span>Register</span></button>
                      </div>
                      <span
                        v-if="errors && errors.account"
                        class="error-message"
                        id="account-error"
                       >{{ errors.account ? errors.account[0] : "" }}</span
                      >
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Loader -->
    <Loader :isLoading="isLoading"/>
    <!-- End Loader -->
  </div>
</template>
<script>
import globalMixin from "~/mixins/global";
export default {
  layout: "page-detail",
  mixins: [globalMixin],
  data() {
    const segments = this.getTitleBreadCrumb();
    const title = segments.split(" ");
    const titleLogin = title[0];
    const titleRegister = title[1];

    return {
      titleLogin: titleLogin,
      titleRegister: titleRegister,
      username: "",
      password: "",
      email: "",
      errors: [],
      token: "",
      remember_me: false,
      isLoading: true,
    };
  },
  created() {
    const remember_token = this.$cookies.get("remember_token");

    if (remember_token === "true") {
      this.autoLogin();
    }
  },
  mounted() {
    this.isLoading = false;
  },
  methods: {
    async autoLogin() {
      // Kiểm tra sự tồn tại của cookie "token"
      const token = this.$cookies.get("token");

      if (token) {
        try {
          // Gọi API để xác thực token
          this.isLoading = true;
          const response = await this.$axios.post("/check-remember-token", {
            token: token,
          });
          this.isLoading = false;
          if (response.data.success) {
            this.$router.push("/", null, { replace: true });
          }
        } catch (error) {
          this.isLoading = false;
          console.log("Auto login failed:", error);
        }
      }
    },
    async login() {
      this.isLoading = true;
      let dataLogin = {
        username: this.username,
        password: this.password,
      };
      await this.$auth
        .loginWith("local", { data: dataLogin })
        .then((res) => {
          this.token = res.data.access_token;

          // Lưu token vào cookies, hết hạn sau 12 tiếng
          this.$cookies.set("token", this.token, {
            expires: new Date(new Date().getTime() + 12 * 60 * 60 * 1000),
          });

          if (this.remember_me) {
            // Lưu token vào cookies, hết hạn sau 7 ngày
            this.$cookies.set("remember_token", this.token, {
              expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
            });
            this.$axios.post("/update-remember-token", {
              remember_token: this.token,
            });
          }
          this.$router.push("/");
          this.isLoading = false;
        })
        .catch((e) => {
          if (e.response && e.response.data && e.response.data.errors)
            this.errors = e.response.data.errors;
          else this.errors = e.response;
          this.isLoading = false;
        });
    },
    async register() {
      this.isLoading = true;
      await this.$axios
        .post("auth/register", {
          username: this.username,
          password: this.password,
          email: this.email,
        })
        .then(() => {
          this.username = "";
          this.password = "";
          this.refreshErrors();
          this.isLoading = false;
          // this.$toast.success(
          //   "Congratulations, you have successfully registered your account, please return to the login page!"
          // );
          this.$toast.success(
            "Congratulations on your successful account registration, now it's time to verify your account (Check your gmail!)"
          );
          this.$axios.post("auth/verification", {
            email: this.email,
          });
          this.email = "";
          // this.$router.push("")
        })
        .catch((e) => {
          if (e.response && e.response.data && e.response.data.errors) {
            this.errors = e.response.data.errors;
          } else this.errors = e.response;
          this.isLoading = false;
        });
    },
    toggleRememberMe() {
      this.remember_me = !this.remember_me;
    },
    refreshErrors() {
      this.errors = [];
    },
    refreshPage() {
      this.username = "";
      this.password = "";
      this.email = "";
      this.refreshErrors();
    },
  },
};
</script>

<style lang="css">
.form-control-a {
  margin-bottom: 24px;
}

.login-form-container input {
  margin-bottom: 6px;
}

.error-message {
  color: red;
  font-size: 14px;
  display: inline-block;
}

#account-error {
  display: inline-block;
  margin-top: 8px;
}

.success-message {
  display: inline-block;
  margin-top: 16px;
  color: green;
}
</style>
