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
              >
                <h4>{{title}}</h4>
              </a>
            </div>
            <div class="tab-content">
              <div id="lg1" class="tab-pane active">
                <div class="login-form-container">
                  <div class="login-register-form">
                    <form method="POST">
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

                      <div class="form-control-a">
                        <input
                          type="password"
                          name="user-password"
                          v-model="password_confirmation"
                          placeholder="Password confirm"
                        />
                        <span
                          v-if="errors && errors.password_confirmation"
                          class="error-message"
                          id="password-error"
                          >{{ errors.password_confirmation ? errors.password_confirmation[0] : "" }}</span
                        >
                      </div>
                      <div class="button-box">
                        <button @click.prevent="resetPassword"><span>Reset password</span></button>
                        <div class="login-toggle-btn">
                          <NuxtLink to="/login-register">Login or register?</NuxtLink>
                        </div>
                      </div>
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
  mixins: [globalMixin],
  layout: "page-detail",
  data() {
    const title = this.getTitleBreadCrumb(2);
    return {
      title: title,
      password: "",
      password_confirmation: "",
      errors: [],
      isLoading: true,
    };
  },
  mounted() {
    this.isLoading = false;
  },
  methods: {
    async resetPassword() {
      this.isLoading = true;
      await this.$axios
        .post(`auth/reset-password/${this.$route.params.token}`, {
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((res) => {
          if (res.data.status) {
            this.errors = [];
            this.isLoading = false;
            this.$toast.success(
              "Please wait 3 seconds to be redirected to the login page!"
            );
            setTimeout(() => {
              this.$router.push("/login-register");
            }, 2000);
            this.$router.push("/login-register");
          }
        })
        .catch((e) => {
          if (e.response && e.response.data && e.response.data.errors)
            this.errors = e.response.data.errors;
          else this.errors = e.response;
          this.isLoading = false;
        });
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

.success-message {
  display: inline-block;
  margin-top: 16px;
  color: green;
}
</style>
