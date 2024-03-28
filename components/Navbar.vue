<template lang="">
  <header class="header-area gray-bg clearfix">
    <div class="header-bottom">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-4 col-6 pdy-0 pdx-15">
            <div class="logo">
              <a href="/">
                <img alt="" src="~/static/img/logo/logo.png" />
              </a>
            </div>
          </div>
          <div class="col-lg-9 col-md-8 col-6 pdy-0 pdx-15">
            <div class="header-bottom-right">
              <div class="main-menu">
                <nav>
                  <ul>
                    <li class="top-hover">
                      <a href="/">home</a>
                    </li>
                    <li>
                      <NuxtLink to="/about-us">about</NuxtLink>
                    </li>
                    <li class="mega-menu-position top-hover">
                      <NuxtLink to="/shop-list">shop</NuxtLink>
                    </li>
                    <li class="top-hover">
                      <NuxtLink to="/blog-masonary">blog</NuxtLink>
                    </li>
                    <li>
                        <a href="/wishlist" @click.prevent="conditionRedirect('/wishlist')">wishlist</a>
                    </li>
                    <li>
                      <NuxtLink to="/contact">contact</NuxtLink>
                    </li>
                    <li class="top-hover">
                      <a class="option-account">account</a>
                      <ul class="submenu">
                        <li>
                          <a href="/my-account" @click.prevent="conditionRedirect('/my-account')">my account</a>
                        <li v-if="!isLogin">
                          <NuxtLink to="/login-register">login / register</NuxtLink>
                        </li>
                        <li v-else-if="isLogin">
                          <a @click="logout">logout</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="header-cart">
                <a href="/cart-page" @click.prevent="conditionRedirect('/my-account')">
                  <div class="cart-icon"><i class="ti-shopping-cart"></i></div>
                       <div class="cart-count" v-if="isLogin && cart.total_item >=0"> {{ cart.total_item }}</div>
                </a>
                <div class="shopping-cart-content" v-if="detailCarts.length > 0">
                  <ul>
                    <li
                      class="single-shopping-cart"
                      v-for="item in detailCarts.slice(0, 5)" :key="item.id" >
                      <div class="shopping-cart-img">
                      <a :href="`product/${item.product.slug}`">
                        <img
                          :src="`${item.product?.images[0]?.link}`"
                          :alt="item.product.name"
                          :title="item.product.name" />
                      </a>
                      </div>
                      <div class="shopping-cart-title">
                        <h4>
                          <a :title="item.product.name"
                            :tooltip="item.product.name"
                            :href="`product/${item.product.slug}`">
                            {{ briefName(item.product.name, 16) }}
                          </a>
                        </h4>
                        <h6>
                          Quanity:
                          <span v-if="item.quantity < 10"
                            >0{{ item.quantity }}</span>
                          <span v-else>{{ item.quantity }}</span>
                        </h6>
                        <span>Price: ${{ item.subtotal }}</span>
                      </div>
                      <div class="shopping-cart-delete">
                        <a @click.prevent="deleteDC(item.id)"><i class="ion ion-close"></i></a>
                      </div>
                    </li>
                    <p v-if="detailCarts.length > 5">
                      And {{ detailCarts.length - 5 }} more other type of
                      products...
                    </p>
                  </ul>
                  <div class="shopping-cart-total">
                    <h4>
                      <div>
                        Total products:
                        <span class="shop-total">
                          {{cart?.total_item}}
                        </span>
                      </div>
                      <div>
                        Total price:
                        <span class="shop-total">
                          ${{cart?.total_price}}</span>
                      </div>
                    </h4>
                  </div>
                  <div class="shopping-cart-btn">
                    <a href="/cart-page" @click.prevent="conditionRedirect('/cart-page')">view cart</a>
                    <NuxtLink to="/coupon">coupon</NuxtLink>
                  </div>
                </div>
                <div
                  class="shopping-cart-content"
                  style="
                    padding: 0;
                    width: 200px;
                    border-bottom-left-radius: 5px 2px;
                    border-bottom-right-radius: 2px 5px;
                    background: #ffffffdb none repeat scroll 0 0;
                  "
                  v-else
                >
                  <div class="empty-cart">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                      alt="Empty Cart"
                    />
                    <p>Your cart is empty. Add products to your cart.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mobile-menu-area">
          <div class="mobile-menu">
            <nav id="mobile-menu-active">
              <ul class="menu-overflow">
                <li><a href="/">HOME</a></li>
                <li>
                  <a class="option-account">account</a>
                  <ul>
                    <li><a href="/cart-page" @click.prevent="conditionRedirect('/cart-page')">cart page</a></li>
                    <li><NuxtLink to="/coupon">coupon</NuxtLink></li>
                    <li><a href="/wishlist" @click.prevent="conditionRedirect('/wishlist')">wishlist</a></li>
                    <li><a href="/my-account" @click.prevent="conditionRedirect('/my-account')">my-account</a></li>
                    <li><NuxtLink to="/contact">contact</NuxtLink></li>
                    <li v-if="!isLogin"><NuxtLink to="/login-register">login / register</NuxtLink></li>
                    <li v-else-if="isLogin"><a @click="logout">logout</a></li></ul>
                </li>
                <li><NuxtLink to="/shop-list">Shop</NuxtLink></li>
                <li><NuxtLink to="/blog-masonary">BLOG</NuxtLink></li>
                <li><NuxtLink to="/contact">contact</NuxtLink></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import globalMixin from "~/mixins/global";
export default {
  mixins: [globalMixin],
  async fetch() {
    try {
      this.$bus.$emit("isLoading3Dot", true);
      const token = this.$cookies.get("token");
      const remember_me = this.$cookies.get("remember_me");
      let response = "";
      if (token || remember_me) {
        response = await this.$axios.get("/cart/");
      }
      this.$bus.$emit("isLoading3Dot", false);
      const cart = response?.data?.data.cart || [];
      const detailCarts = response?.data?.data.detailCarts || [];

      detailCarts.forEach((item) => {
        item.subtotal = (item.quantity * item.price_sale).toFixed(2);
      });

      this.cart = cart;
      this.detailCarts = detailCarts;
    } catch (error) {
      this.$bus.$emit("isLoading3Dot", false);
      console.error(error);
      this.cart = {};
      this.detailCarts = [];
    }
  },
  data() {
    return {
      isLogin: false,
      cart: {},
      detailCarts: [],
    };
  },
  methods: {
    async logout() {
      try {
        // Xoá token, remember_me khỏi cookies
        await this.$axios
          .post("/auth/logout")
          .then((respon) => {
            this.$cookies.remove("token");
            this.$cookies.remove("remember_me");
            this.isLogin = false;
            this.$toast.success("Đăng xuất thành công!");
            this.$router.push("/login-register");
          })
          .catch((e) => {
            this.$toast.error("Đăng xuất thất bại do lỗi: " + e);
          });
      } catch (e) {
        console.log(e);
      }
    },
    // DELETE ONE
    async deleteDC(detailCartId) {
      try {
        this.$bus.$emit("isLoading3Dot", true);
        const resDelete = await this.$axios.post(
          `/cart/delete/${detailCartId}`
        );
        this.$bus.$emit("isLoading3Dot", false);
        let status = resDelete?.data?.data?.delete;
        if (status) {
          this.$toast.success("Xoá thành công sản phẩm khỏi giỏ hàng!");
          await this.reloadDetailCarts();
        } else
          this.$toast.error(
            "Xoá thất bại, hãy kiểm tra và thử lại sau giây lát!"
          );
      } catch (error) {
        this.$bus.$emit("isLoading3Dot", false);
        console.error(error);
      }
    },
    async reloadDetailCarts() {
      try {
        this.$bus.$emit("isLoading3Dot", true);
        const response = await this.$axios.get("/cart/");
        this.$bus.$emit("isLoading3Dot", false);
        this.detailCarts = response?.data?.data?.detailCarts || [];
        let total_item = 0;
        let total_price = 0.0;
        this.detailCarts.forEach((item) => {
          item.subtotal = (item.quantity * item.price_sale).toFixed(2);
          total_item += item.quantity;
          total_price += parseFloat(item.subtotal);
        });
        this.cart.total_item = total_item;
        this.cart.total_price = total_price.toFixed(3);
      } catch (error) {
        this.$bus.$emit("isLoading3Dot", false);
        console.error(error);
        this.detailCarts = [];
      }
    },

    conditionRedirect(link = "") {
      const token = this.$cookies.get("token");
      const remember_me = this.$cookies.get("remember_me");
      if (token || remember_me) {
        this.$router.push(link);
      } else {
        this.$toast.error("Bạn cần đăng nhập để truy cập tính năng trên");
        this.$router.push("/login-register");
      }
    },
  },
  mounted() {
    const token = this.$cookies.get("token");
    const remember_me = this.$cookies.get("remember_me");
    if (token || remember_me) {
      this.isLogin = true;
    }
    this.$bus.$on("addProductToCart", () => this.reloadDetailCarts());
  },
};
</script>
<style lang="css">
.pdy-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.pdx-15 {
  padding-left: 15px !important;
  padding-right: 15px !important;
  box-sizing: border-box;
}

.shopping-cart-img {
  max-width: 82px;
  max-height: 82px;
}

.shopping-cart-img img {
  max-width: 100%;
  height: auto;
}

.empty-cart {
  text-align: center;
  max-width: 270px;
  margin: 0 auto;
  padding-top: 10px;
}

.empty-cart img {
  max-width: 70px;
  height: auto;
}

.empty-cart p {
  margin-top: 10px;
  font-size: 14px;
}

.cart-icon {
  position: relative;
}

.cart-count {
  position: absolute;
  top: 18px;
  right: -14px;
  background-color: rgba(255, 0, 0, 0.779);
  color: #fff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 50%;
}

.shopping-cart-delete:hover i {
  cursor: pointer;
}

.option-account:hover {
  cursor: pointer;
}
</style>
