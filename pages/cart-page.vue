<template lang="">
  <div class="cart-main-area ptb-100">
    <div class="container">
      <h3 class="page-title">Giỏ hàng của bạn</h3>
      <div class="row" v-if="detailCarts.length > 0">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <form action="#">
            <div class="table-content table-responsive wishlist">
              <table>
                <thead>
                  <tr>
                    <th>Hình ảnh sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng phụ</th>
                    <th>Xoá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in detailCarts" :key="item.id">
                    <td class="product-thumbnail">
                      <a :href="`product/${item.product.slug}`">
                        <img :src="`${item.product?.images[0]?.link}`" alt="" />
                      </a>
                    </td>
                    <td class="product-name">
                      <a :href="`product/${item.product.slug}`">{{
                        item.product.name
                      }}</a>
                    </td>
                    <td class="product-price-cart">
                      <span class="amount">{{
                        convertUSDToVND(item.price_sale)
                      }}</span>
                    </td>
                    <td class="product-quantity">
                      <div class="pro-dec-cart">
                        <input
                          class="cart-plus-minus-box"
                          type="number"
                          min="0"
                          v-model="item.quantity"
                          :max="
                            qtyRemain(
                              item?.product.qty_import,
                              item?.product.qty_sold
                            )
                          "
                          @change="
                            setMaxQty(
                              item?.product.qty_import,
                              item?.product.qty_sold,
                              item.product.id
                            )
                          "
                        />
                      </div>
                    </td>
                    <td class="product-subtotal">
                      {{ convertUSDToVND(item.subtotal) }}
                    </td>
                    <td class="product-delete">
                      <a class="delete-one-product" @click="deleteDC(item.id)"
                        ><i class="ion ion-close"></i
                      ></a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="bg-light">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Tổng số lượng</td>
                    <td>Tổng giá</td>
                    <td>Xoá tất cả</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{ cart?.total_item }} products</td>
                    <td>{{ convertUSDToVND(cart?.total_price) }}</td>
                    <td class="cart-shiping-update cart-clear">
                      <button class="clear-all" @click.prevent="deleteAll">
                        Xoá
                      </button>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="cart-shiping-update-wrapper">
                  <div class="cart-shiping-update cart-clear">
                    <NuxtLink to="/shop-list">Tiếp tục mua sắm</NuxtLink>
                  </div>
                  <div class="cart-clear">
                    <button @click.prevent="updateCart">
                      Cập nhật giỏ hàng
                    </button>
                    <a href="#" v-if="!isOrdered" @click.prevent="createOrder"
                      >Tạo đơn hàng</a
                    >
                    <a href="#" v-else @click.prevent="titleOrdered"
                      >Tạo đơn hàng</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-lg-8 col-md-8 col-sm-8 col-8 mx-auto my-0 text-center">
          <img
            src="~static/img/product/empty-cart.png"
            class="empty my-3"
            alt="Không tồn tại sản phẩm nào trong giỏ hàng"
            style="max-width: 100%; height: 240px"
          />
          <h3 class="text-center text-danger">
            <span class="content-empty"
              >Không tồn tại sản phẩm nào, vui lòng trở lại trang sản phẩm để
              thêm những sản phẩm bạn muốn..!</span
            >
            <div class="cart-shiping-update-wrapper">
              <div class="cart-shiping-update cart-return">
                <NuxtLink to="/shop-list">Tiếp tục mua sắm</NuxtLink>
              </div>
            </div>
          </h3>
        </div>
      </div>
      <div class="row" v-if="isOrdered">
        <div class="col-lg-8">
          <div class="discount-code-wrapper">
            <div class="title-wrap">
              <h4 class="cart-bottom-title section-bg-gray">
                Thông tin đơn hàng
              </h4>
            </div>
            <div class="discount-code">
              <p>1. Địa chỉ giao hàng</p>
              <input
                type="text"
                name="name"
                v-model="addressDelivery"
                ref="addressInput"
                placeholder="Nhập địa chỉ nhận hàng của bạn."
              />
            </div>

            <div class="row justify-content-between">
              <div class="discount-code col-5">
                <p>2. Mã sản phẩm</p>
                <input
                  type="text"
                  class="bg-notread"
                  readonly="readonly"
                  :value="orderCode"
                />
              </div>
              <div class="discount-code col-6">
                <p>3. Ngày đặt</p>
                <span>{{ orderDate }}</span>
              </div>
            </div>

            <div class="row justify-content-between">
              <div class="discount-code col-5">
                <p>4. Phương thức thanh toán</p>
                <div class="tax-select">
                  <select class="email s-email s-wid" v-model="paymentMethod">
                    <option value="">---Chọn phương thức---</option>
                    <option value="0">Tiền mặt</option>
                    <option value="1">Chuyển khoản ngân hàng</option>
                  </select>
                </div>
              </div>
              <div class="discount-code col-6">
                <p>5. Phiếu giảm giá</p>
                <input
                  type="text"
                  v-model="couponCode"
                  placeholder="Nhập mã phiếu giảm giá"
                  name="name"
                />
                <p class="mt-2" v-if="!couponCode">
                  <i>Lấy phiếu giảm giá ở </i>:
                  <NuxtLink to="/coupon" class="font-weight-bold">
                    ĐÂY</NuxtLink
                  >
                </p>
                <button class="cart-btn-2" @click="checkCoupon">Áp dụng</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="grand-totall">
            <div class="title-wrap">
              <h4 class="cart-bottom-title section-bg-gary-cart">Tổng đơn</h4>
            </div>
            <h5>
              Tổng giá <span>{{ convertUSDToVND(cart?.total_price) }}</span>
            </h5>
            <h5>
              Khuyến mãi từ phiếu giảm giá
              <span>- {{ convertUSDToVND(pricePromotion) }}</span>
            </h5>
            <h4 class="grand-totall-title">
              Tổng cộng <span>{{ convertUSDToVND(grandTotal) }}</span>
            </h4>
            <a href="#" @click.prevent="checkOrder">XÁC NHẬN</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <BankingModal
      :isModalBankingOpen="isModalBankingOpen"
      :amount="cart?.total_price"
    /> -->
    <ConfirmationModal
      :isModalOpen="isModalOpen"
      :message="confirmationMessage"
      @confirm="submitOrder"
      @cancel="closeModal"
    />
    <!-- Loader -->
    <Loader :isLoading="isLoading" />
    <!-- End Loader -->
  </div>
</template>

<script>
import { CheckoutMethods } from "~/helpers/Constant";
import {
  domainCheckoutOnline,
  apiKey,
  clientId,
  checksumKey,
} from "~/config/envConfig";
import { hashSignature } from "~/helpers/Encryption";
import globalMixin from "~/mixins/global";

export default {
  layout: "page-detail",
  watchQuery: ["code", "id", "cancel", "status", "orderCode"],
  mixins: [globalMixin],
  data() {
    return {
      isOrdered: false,
      cart: [],
      detailCarts: [],
      addressDelivery: "",
      orderDate: "",
      orderCode: "",
      subOrderCode: "",
      paymentMethod: "",
      couponCode: "",
      percentPromotion: 0,
      isModalOpen: false,
      confirmationMessage: "",
      isLoading: true,
    };
  },
  async asyncData({ $axios, query }) {
    try {
      let infoBanking = query ?? {};

      const response = await $axios.get("/cart/");

      const cart = response?.data?.data?.cart || [];
      const detailCarts = response?.data?.data?.detailCarts || [];
      detailCarts.forEach((item) => {
        item.subtotal = (item.quantity * item.price_sale).toFixed(2);
      });

      let orderInfo = {};
      const resStatus = await $axios.get("/order/get-status");
      const status = resStatus?.data?.data?.status || false;
      if (status) {
        const res = await $axios.get(`/order/get-info/`);
        orderInfo = res?.data?.data || {};
      }

      return {
        cart: cart,
        detailCarts: detailCarts,
        isOrdered: status,
        addressDelivery: orderInfo.address_delivery || "",
        orderCode: orderInfo.code || "",
        subOrderCode: orderInfo.id || "",
        orderDate: orderInfo.order_date || "",
        paymentMethod: orderInfo.payment_method || "",
        infoBanking: infoBanking,
      };
    } catch (error) {
      console.error(error);
      return {
        cart: [],
        detailCarts: [],
        isOrdered: false,
      };
    }
  },

  async beforeCreate() {
    this.isLoading = true;
  },

  async created() {
    this.$localStorage.removeItem("linkPayment");

    let query = this.$route.query;
    if (query.cancel && query.status) {
      this.submitOrderAfterCheckout(query);
    }
    this.isLoading = false;
  },

  mounted() {
    this.isLoading = false;
  },

  computed: {
    pricePromotion() {
      if (this.percentPromotion > 0) {
        return ((this.cart?.total_price * this.percentPromotion) / 100).toFixed(
          2
        );
      }
      return 0;
    },

    grandTotal() {
      if (this.pricePromotion > 0) {
        return (this.cart?.total_price - this.pricePromotion).toFixed(2);
      }
      return this.cart?.total_price;
    },

    timeNowToSeconds() {
      return Math.floor(Date.now() / 1000);
    },
  },

  methods: {
    async fetchOrderStatus() {
      try {
        this.isLoading = true;
        const resStatus = await this.$axios.get("/order/get-status");
        this.isLoading = false;
        const status = resStatus?.data?.data?.status || false;
        this.isOrdered = status;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        this.isOrdered = false;
      }
    },
    qtyRemain(qty_import, qty_sold) {
      if (qty_import > qty_sold) return qty_import - qty_sold;
    },
    setMaxQty(qty_import, qty_sold) {
      const input = event.target;
      const maxValue = this.qtyRemain(qty_import, qty_sold);
      if (input.value > maxValue) {
        input.value = maxValue;
      }
    },
    // DELETE ONE
    async deleteDC(detailCartId) {
      try {
        this.isLoading = true;
        const resDelete = await this.$axios.post(
          `/cart/delete/${detailCartId}`
        );
        this.isLoading = false;
        let status = resDelete?.data?.data?.delete;
        if (status) {
          this.$toast.success("Xoá thành công sản phẩm khỏi giỏ hàng");
          await this.reloadDetailCarts();
          this.$bus.$emit("addProductToCart");
        } else
          this.$toast.error(
            "Xoá thất bại, hãy kiểm tra và thử lại sau giây lát!"
          );
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
    async reloadDetailCarts() {
      try {
        this.isLoading = true;
        const response = await this.$axios.get("/cart/");
        this.isLoading = false;
        this.detailCarts = response?.data?.data?.detailCarts || [];
        let totalItem = 0;
        let totalPrice = 0.0;
        this.detailCarts.forEach((item) => {
          item.subtotal = (item.quantity * item.price_sale).toFixed(2);
          totalItem += item.quantity;
          totalPrice += parseFloat(item.subtotal);
        });
        this.cart.total_item = totalItem;
        this.cart.total_price = totalPrice.toFixed(2);
        if (this.cart.total_item === 0) {
          this.isOrdered = false;
        }
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        this.detailCarts = [];
      }
    },
    // DELETE ALL
    async deleteAll() {
      try {
        this.isLoading = true;
        const resDelete = await this.$axios.post(`/cart/deleteAll`);
        this.isLoading = false;
        let status = resDelete?.data?.data?.delete;
        if (status) {
          this.$toast.success("Xoá thành công tất cả sản phẩm khỏi giỏ hàng");
          await this.reloadDetailCarts();
          this.$bus.$emit("addProductToCart");
        } else
          this.$toast.error(
            "Xoá thất bại, hãy kiểm tra và thử lại sau giây lát!"
          );
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
    // UPDATE CART
    async updateCart() {
      try {
        const dataUpdate = {};
        let isQtyValid = true;
        this.detailCarts.forEach((item) => {
          dataUpdate[item.id] = parseInt(item.quantity);
          if (
            item.quantity < 0 ||
            item.quantity + item.product.qty_sold > item.product.qty_import
          ) {
            isQtyValid = false;
            this.$toast.error(
              "Cập nhật giỏ hàng thất bại. Số lượng sản phẩm " +
                item.product.name +
                " không phù hợp (phải lớn hơn 0 và nhỏ hơn số lượng còn)!"
            );
          }
        });
        const payload = JSON.stringify(dataUpdate);
        this.isLoading = true;
        if (isQtyValid) {
          const resUpdate = await this.$axios.post(`/cart/update/`, payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          this.isLoading = false;
          let status = resUpdate?.data?.data?.update;
          if (status) {
            this.$toast.success("Cập nhật giỏ hàng thành công!");
            this.$bus.$emit("addProductToCart");
            await this.reloadDetailCarts();
          } else {
            this.$toast.error(
              "Cập nhật giỏ hàng thất bại, hãy kiểm tra và thử lại sau giây lát!"
            );
          }
        }
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },

    titleOrdered() {
      this.$toast.info("Đơn hàng đã được bạn tạo ngay trước đó rồi!");
    },

    async checkCoupon() {
      try {
        if (!this.couponCode) {
          this.$toast.error(
            "Bạn chưa nhập phiếu giảm giá, vui lòng thêm và thử lại!"
          );
          return;
        }
        this.isLoading = true;
        const resCoupon = await this.$axios.post("/coupon/check", {
          couponCode: this.couponCode,
        });
        this.isLoading = false;

        const percentPromotion = resCoupon?.data?.data;

        if (percentPromotion !== null) {
          this.percentPromotion = percentPromotion;
          this.$toast.success("Đã áp dụng phiếu giảm giá thành công!");
        } else {
          this.$toast.info(
            "Không tồn tại mã giảm giá nào có mã: '" +
              this.couponCode +
              "' trong thời gian hiện tại"
          );
          this.couponCode = "";
        }
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        this.$toast.error(
          "Có lỗi xảy ra khi kiểm tra phiếu giảm giá, vui lòng thử lại sau!"
        );
      }
    },

    // CREATE ORDER
    async createOrder() {
      try {
        this.isLoading = true;
        const resCheck = await this.$axios.get(`/check-infor/`);
        let info = resCheck?.data?.data?.info;
        if (info) {
          const resCreate = await this.$axios.post(`/order/create/`);
          this.isLoading = false;
          let status = resCreate?.data?.data?.create;
          if (status) {
            this.$toast.success("Tạo đơn hàng thành công!");
            this.$bus.$emit("addProductToCart");
            await this.reloadDetailCarts();
            await this.fetchOrderStatus();
            await this.getInformationUser();
          } else {
            this.$toast.error(
              "Tạo đơn hàng thất bại, hãy kiểm tra và thử lại sau giây lát!"
            );
          }
        } else {
          this.isLoading = false;
          this.$swal
            .fire({
              title: "Hoàn thiện thông tin",
              text: "Thông tin tài khoản của bạn chưa đầy đủ, đi đến trang hoàn tất thông tin cá nhân ?",
              icon: "question",
              confirmButtonText: "OK",
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.$router.push("/my-account");
                this.$toast.success(
                  "Hãy điền đủ thông tin cá nhân cơ bản (Fax là thông tin không bắt buộc)"
                );
              } else if (result.dismiss === this.$swal.DismissReason.cancel) {
                this.$toast.info(
                  "Rất tiếc phải thông báo rằng khi nào hoàn thiện đủ thông tin cá nhân cơ bản thì có thể đặt hàng"
                );
              }
            });
        }
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },

    checkOrder() {
      const linkPayment = this.$localStorage.getItem("linkPayment");
      if (linkPayment !== null) {
        this.redirectExternalSite(linkPayment);
      } else {
        if (!this.addressDelivery) {
          this.$refs.addressInput.focus();
          this.$toast.error(
            "Bạn chưa nhập địa chỉ giao hàng, vui lòng thêm và thử lại!"
          );
          return;
        }

        if (!this.paymentMethod) {
          this.$toast.error(
            "Bạn chưa chọn phương thức thanh toán, vui lòng thêm và thử lại!"
          );
          return;
        }

        if (!this.pricePromotion) {
          this.couponCode = "";
        }
        this.openConfirmationModal();
      }
    },

    async submitOrder() {
      try {
        // Process banking payment method
        if (this.paymentMethod == CheckoutMethods.BANKING_INTERNET) {
          // Get info user
          this.isLoading = true;
          const getInformationUser = await this.$axios.get(`/check-infor/`);
          let infoUser = getInformationUser?.data?.data?.info;

          const orderCodeNumber = this.parseNumber(
            this.subOrderCode,
            this.orderCode
          );
          // const amout = parseInt(this.grandTotal);
          const amount = 2000;

          let data = {
            orderCode: orderCodeNumber,
            amount: amount,
            description: "THANH TOAN DON HANG LOTUS",
            buyerName: infoUser.first_name,
            buyerEmail: infoUser.email,
            buyerPhone: infoUser.phone,
            buyerAddress: this.addressDelivery,
            items: this.detailCarts.product,
            cancelUrl: "http://localhost:3000/cart-page",
            returnUrl: "http://localhost:3000/cart-page",
            expiredAt: this.timeNowToSeconds + 60 * 60 * 60, //  1 hour,
          };

          // `amount=${data.amount}&cancelUrl=${data.cancelUrl}&description=${data.description}&orderCode=${data.orderCode}&returnUrl=${data.returnUrl}`
          let dataHash = {
            amount: data.amount,
            cancelUrl: data.cancelUrl,
            description: data.description,
            orderCode: data.orderCode,
            returnUrl: data.returnUrl,
          };

          const signature = hashSignature(dataHash, checksumKey);

          const payload = {
            ...data,
            signature,
          };

          const resCheckout = await this.$axios.post(
            `${domainCheckoutOnline}/payment-requests`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "x-client-id": clientId,
              },
            }
          );

          this.isLoading = false;
          let dataCheckout = resCheckout?.data?.data;
          if (dataCheckout) {
            this.$localStorage.setItem("linkPayment", dataCheckout.checkoutUrl);
            this.$localStorage.setItem("addressDelivery", this.addressDelivery);
            this.$localStorage.setItem("paymentMethod", this.paymentMethod);

            this.redirectExternalSite(dataCheckout.checkoutUrl);
          }
        } else {
          await this.submitOrderAfterCheckout();
        }
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        this.$toast.error(
          "Thêm thông tin giao hàng thất bại, hãy kiểm tra và thử lại sau giây lát!"
        );
      }
    },

    async submitOrderAfterCheckout(dataQuery = "") {
      this.isLoading = true;
      this.paymentMethod = CheckoutMethods.CASH;

      if (dataQuery) {
        if (!dataQuery?.cancel) {
          this.paymentMethod = CheckoutMethods.BANKING_INTERNET;
        }

        this.addressDelivery = this.regDoubleQuote(
          this.$localStorage.getItem("addressDelivery")
        );
        this.paymentMethod = this.regDoubleQuote(
          this.$localStorage.getItem("paymentMethod")
        );
      }

      const now = new Date();
      const dataSubmit = {
        address_delivery: this.addressDelivery,
        payment_method: this.paymentMethod,
        coupon: this.couponCode,
        total_mount: this.grandTotal,
        order_date: now.toISOString().slice(0, 19).replace("T", " "),
      };

      const payload = JSON.stringify(dataSubmit);

      const resSubmit = await this.$axios.post(
        `/order/submit-order/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.isLoading = false;
      let data = resSubmit?.data?.data;
      this.closeModal();
      this.$store.dispatch("setBillData", data);
      this.$router.push("notify-order");
      // Store info order with vuex
      this.$toast.success(
        "Thêm thông tin giao hàng thành công, hãy chuyển đến bước thanh toán!"
      );

      // Delete local storage
      this.$localStorage.removeItem("linkPayment");
      this.$localStorage.removeItem("addressDelivery");
      this.$localStorage.removeItem("paymentMethod");
    },

    async getInformationUser() {
      try {
        this.isLoading = true;
        const res = await this.$axios.get(`/order/get-info/`);
        this.isLoading = false;
        const orderInfo = res?.data?.data;
        this.addressDelivery = orderInfo.address_delivery || "";
        this.orderCode = orderInfo.code || "";
        this.subOrderCode = orderInfo.id || "";
        this.orderDate = orderInfo.order_date || "";
        this.paymentMethod = orderInfo.payment_method || "";
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },

    openConfirmationModal() {
      this.isModalOpen = true;
      this.confirmationMessage =
        "Bạn đã chắc chắn với những thông tin giao hàng và xác nhận đặt hàng ?";
    },

    closeModal() {
      this.isModalOpen = false;
    },

    parseNumber(subOrderCode, orderCode) {
      // Sử dụng biểu thức chính quy để tìm các số trong chuỗi
      const regex = /\d+/g;
      let match = orderCode.match(regex);

      let numbers = [subOrderCode];
      numbers.push(...match);

      // Chuyển đổi mảng các số thành một chuỗi
      let combined = numbers ? numbers.join("") : "";

      return parseInt(combined.slice(0, 10));
    },

    regDoubleQuote(url) {
      if (url && url.includes('"')) {
        url = url.replace(/"/g, "");
      }

      return url;
    },

    redirectExternalSite(url) {
      let urlStd = this.regDoubleQuote(url);

      window.location.href = urlStd;
    },
  },
};
</script>
<style lang="css" scoped>
.wishlist {
  overflow: visible;
}

table {
  width: 100%;
}

.product-thumbnail img {
  max-width: 86px;
  max-height: 86px;
}

.cart-main-area .product-wishlist-cart .remove-all {
  color: #fff;
  background-color: gray;
}

.cart-main-area .product-wishlist-cart .remove-all:hover {
  color: #fff;
  cursor: pointer;
  background-color: rgb(94, 93, 93);
}

.cart-main-area .product-delete .delete-one-product {
  color: rgb(177, 176, 176);
}

.delete-one-product:hover {
  cursor: pointer;
}

.product-delete:hover a {
  color: rgb(90, 90, 90);
  padding: 10px 16px;
  display: inline-block;
}

.cart-main-area .clear-all {
  margin: 0 auto;
  padding: 4px 10px 5px;
}

.cart-return {
  margin: 0 auto;
}

span.content-empty {
  line-height: 42px;
}

.cart-return a {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
  letter-spacing: 2px;
}

.cart-main-area button.cart-btn-2 {
  padding: 12px 24px 12px;
  margin-top: 26px;
  float: right;
}

.bg-notread {
  background-color: rgb(226, 225, 225) !important;
  cursor: not-allowed;
}
</style>
