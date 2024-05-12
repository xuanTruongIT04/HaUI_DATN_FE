<template>
  <!-- my account start -->
  <div class="checkout-area pb-80 pt-100">
    <div class="container">
      <div class="row">
        <div class="ml-auto mr-auto col-lg-9">
          <div class="checkout-wrapper">
            <div id="faq" class="panel-group">
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                    <span>1</span>
                    <a
                      data-toggle="collapse"
                      data-parent="#faq"
                      to="#my-account-1"
                      >CHỈNH SỬA THÔNG TIN TÀI KHOẢN
                    </a>
                  </h5>
                </div>
                <div id="my-account-1" class="panel-collapse collapse show">
                  <div class="panel-body">
                    <div class="billing-information-wrapper">
                      <div class="account-info-wrapper">
                        <h4>Thông tin tài khoản của tôi</h4>
                        <h5>Thông tin cá nhân của bạn</h5>
                      </div>
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="billing-info">
                            <div class="form-control-a">
                              <label for="first-name">Tên của bạn</label>
                              <input
                                id="first-name"
                                type="text"
                                v-model="first_name"
                              />
                              <span
                                v-if="errors && errors.first_name"
                                class="error-message"
                                id="first-name-error"
                                >{{
                                  errors.first_name ? errors.first_name[0] : ""
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="billing-info">
                            <div class="form-control-a">
                              <label for="last-name">Họ của bạn</label>
                              <input
                                id="last-name"
                                type="text"
                                v-model="last_name"
                              />
                              <span
                                v-if="errors && errors.last_name"
                                class="error-message"
                                id="first-name-error"
                                >{{
                                  errors.last_name ? errors.last_name[0] : ""
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="billing-info">
                            <div class="form-control-a">
                              <label for="email">Địa chỉ email</label>
                              <input
                                type="email"
                                id="email"
                                v-model="email"
                                readonly="readonly"
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="billing-info">
                            <div class="form-control-a">
                              <label for="phone">Điện thoại</label>
                              <input id="phone" type="text" v-model="phone" />
                              <span
                                v-if="errors && errors.phone"
                                class="error-message"
                                id="first-name-error"
                                >{{ errors.phone ? errors.phone[0] : "" }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="billing-info">
                            <div class="form-control-a">
                              <label for="fax">Fax</label>
                              <input id="fax" type="text" v-model="fax" />
                              <span
                                v-if="errors && errors.fax"
                                class="error-message"
                                id="first-name-error"
                                >{{ errors.fax ? errors.fax[0] : "" }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="billing-back-btn">
                        <div class="billing-back">
                          <NuxtLink to="/cart-page"
                            ><i class="fa fa-shopping-cart mr-2"></i> Quay lại giỏ hàng</NuxtLink
                          >
                        </div>
                        <div class="billing-btn">
                          <button @click.prevent="update_infor">
                            Tiếp tục
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h5 class="panel-title">
                    <span>2</span>
                    <a
                      data-toggle="collapse"
                      data-parent="#faq"
                      to="#my-account-2"
                      >Thay đổi mật khẩu
                    </a>
                  </h5>
                </div>
                <div id="my-account-2" class="panel-collapse collapse show">
                  <div class="panel-body">
                    <div class="billing-information-wrapper">
                      <div class="account-info-wrapper">
                        <h4>Thay đổi mật khẩu</h4>
                        <h5>Mật khẩu của bạn</h5>
                      </div>
                      <div class="row">
                        <div class="col-lg-12 col-md-12">
                          <div class="billing-info">
                            <div class="form-control-a">
                              <label>Mật khẩu cũ</label>
                              <input type="password" v-model="password_old" />
                              <span
                                v-if="errors && errors.password"
                                class="error-message"
                                id="first-name-error"
                                >{{
                                  errors.password ? errors.password[0] : ""
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="billing-info">
                            <div class="form-control-a">
                              <label>Mật khẩu mới</label>
                              <input type="password" v-model="new_password" />
                              <span
                                v-if="errors && errors.new_password"
                                class="error-message"
                                id="first-name-error"
                                >{{
                                  errors.new_password
                                    ? errors.new_password[0]
                                    : ""
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <div class="billing-info">
                            <div class="form-control-a">
                              <label>Xác nhận mật khẩu mới</label>
                              <input
                                type="password"
                                v-model="new_password_confirmation"
                              />
                              <span
                                v-if="
                                  errors && errors.new_password_confirmation
                                "
                                class="error-message"
                                id="first-name-error"
                                >{{
                                  errors.new_password_confirmation
                                    ? errors.new_password_confirmation[0]
                                    : ""
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="billing-back-btn">
                        <div class="billing-back">
                          <a><i class="ion-arrow-up-c"></i> Quay lại</a>
                        </div>
                        <div class="billing-btn">
                          <button @click.prevent="change_password">
                            Tiếp tục
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Loader -->
    <Loader :isLoading="isLoading" />
    <!-- End Loader -->
  </div>
  <!-- my account end -->
</template>

<script>
export default {
  layout: "page-detail",
  async asyncData({ $axios, $cookies }) {
    try {
      const response = await $axios.get("/show-infor", {
        token: $cookies.get("token"),
      });
      return {
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        phone: response.data.data.phone,
        fax: response.data.data.fax,
        email: response.data.data.email,
      };
    } catch (e) {
      console.log(e);
      return {};
    }
  },
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      fax: "",
      errors: [],
      password_old: "",
      new_password: "",
      new_password_confirmation: "",
      isLoading: true,
    };
  },
  mounted() {
    this.isLoading = false;
  },
  methods: {
    async update_infor() {
      try {
        this.isLoading = true;
        this.$axios.post("/update-infor", {
          first_name: this.first_name,
          last_name: this.last_name,
          phone: this.phone,
          fax: this.fax,
        });
        this.errors = [];
        this.isLoading = false;
        this.$toast.success(
          "You have successfully updated your personal information!"
        );
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          this.errors = error.response.data.errors;
        } else {
          this.errors = error.response;
        }
        this.isLoading = false;
      }
    },
    async change_password() {
      this.isLoading = true;
      await this.$axios
        .post("/change-password", {
          password: this.password_old,
          new_password: this.new_password,
          new_password_confirmation: this.new_password_confirmation,
        })
        .then((res) => {
          if (res.data.success) {
            this.refreshPage();
            this.isLoading = false;
            this.$toast.success("You have successfully updated your password!");
          } else if (res.data.status === 401) {
            this.refreshErrors();
            this.errors.password = [res.data.title];
            this.isLoading = false;
          }
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.errors = error.response.data.errors;
          } else {
            this.errors = error.response;
          }
          this.isLoading = false;
        });
    },
    refreshErrors() {
      this.errors = [];
    },
    refreshPage() {
      this.password_old = "";
      this.new_password = "";
      this.new_password_confirmation = "";
      this.refreshErrors();
    },
  },
};
</script>
<style lang="css" scoped>
input#email {
  background-color: #e2e2e2;
  cursor: not-allowed;
}
</style>
