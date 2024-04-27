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
                      <h4>Wait a minute, we are checking your email...</h4>
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
      errors: [],
      isLoading: true,
    };
  },
  mounted() {
    this.isLoading = false;
    this.$axios
      .get("auth" + this.$route.fullPath)
      .then((respon) => {
        this.$toast.success("You have been verifying account success!");
        this.$router.push("/login-register");
      })
      .catch((e) => {});
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
