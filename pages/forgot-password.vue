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
                        type="email"
                        name="email"
                        v-model="email"
                        placeholder="Your email"
                      />
                      <span
                          v-if="errors && errors.email"
                          class="error-message"
                          id="email-error"
                          >{{ errors.email ? errors.email[0] : "" }}</span
                        >
                        </div>
                      <div class="button-box">
                        <button
                          class="btn-forgot"
                          @click.prevent="forgotPassword"
                        >
                          <span>Send email</span>
                          <div
                            class="lds-ring loading"
                            :class="{ active: isPending }"
                          >
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </button>
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
      email: "",
      errors: [],
      isPending: false,
      isLoading: true,
    };
  },
  mounted() {
    this.isLoading = false;
  },
  methods: {
    forgotPassword() {
      this.isPending = true;
      this.isLoading = true;
      this.$axios
        .post("auth/forget-password", {
          email: this.email,
        })
        .then((res) => {
          this.isLoading = false;
          if (res.data.status) {
            this.errors = [];

            this.$toast.success(
              "Email sent successfully, please check your gmail"
            );
            this.isPending = false;
          }
        })
        .catch((e) => {
          this.isPending = false;
          this.isLoading = false;
          if (e.response && e.response.data && e.response.data.errors)
            this.errors = e.response.data.errors;
          else this.errors = e.response;
        });
    },
  },
};
</script>
<style>
.btn-forgot {
  display: block;
  position: relative;
}

.lds-ring {
  width: 35px;
  height: 35px;
  position: absolute;
  top: 0;
  right: -2px;
  display: none;
}

.lds-ring div {
  box-sizing: border-box;
  position: absolute;
  width: 25px;
  height: 25px;
  margin: 5px;
  border: 5px solid #5f5f5fcc;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #5f5f5fcc transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.active {
  display: inline-block;
}
</style>
