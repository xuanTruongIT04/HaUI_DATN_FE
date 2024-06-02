<template lang="">
  <div class="cart-main-area ptb-100">
    <div class="container">
      <h3 class="page-title">Quản lý đơn hàng</h3>
      <div class="row" v-if="orderList">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <form action="#">
            <div
              class="table-content table-striped table-responsive order-list"
            >
              <table>
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Địa chỉ giao hàng</th>
                    <th>Phương thức thanh toán</th>
                    <th>Tổng tiền</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in orderList" :key="item.id">
                    <td class="order-price-cart">
                      <span class="code">{{ briefName(item.code, 20) }}</span>
                    </td>
                    <td class="order-name">
                      <span
                        v-if="item.address_delivery"
                        class="address-delivery"
                        >{{ briefName(item.address_delivery, 30) }}</span
                      >
                      <span v-else class="address-delivery text-muted small"
                        ><i>Đang cập nhật...</i></span
                      >
                    </td>
                    <td class="order-price-cart">
                      <span
                        class="payment-method badge badge-light"
                        v-if="item.payment_method == paymentMethodValue['CASH']"
                        >{{ getPaymentMethodText(item.payment_method) }}</span
                      >
                      <span class="payment-method badge badge-info" v-else>{{
                        getPaymentMethodText(item.payment_method)
                      }}</span>
                    </td>
                    <td class="product-subtotal">
                      <span>{{ convertUSDToVND(item.total_mount) }}</span>
                    </td>
                    <td class="order-date">
                      <span>{{ item.order_date }}</span>
                    </td>
                    <td class="order-status">
                      <span
                        class="badge badge-info"
                        v-if="item.status == statusOrderValue['ORDERD']"
                        >{{ getStatusOrderText(item.status) }}</span
                      >
                      <span
                        class="badge badge-primary"
                        v-else-if="
                          item.status == statusOrderValue['PROCESSING']
                        "
                        >{{ getStatusOrderText(item.status) }}</span
                      >
                      <span
                        class="badge badge-warning"
                        v-else-if="item.status == statusOrderValue['PAID']"
                        >{{ getStatusOrderText(item.status) }}</span
                      >
                      <span class="badge badge-danger" v-else>{{
                        getStatusOrderText(item.status)
                      }}</span>
                    </td>

                    <!-- v-if="item.status < statusOrderValue['PAID'] -->
                    <td class="order-detail">
                      <button
                        @click.prevent="showOrderDetail(item.id)"
                        class="btn btn-success order-detail badge badge-light"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-lg-9 col-md-9 col-sm-9 col-9 mx-auto my-0 text-center">
          <img
            src="~static/img/product/empty-order.png"
            alt="Không tồn tại đơn hàng nào trong danh sách yêu thích"
            style="max-height: 380px; max-width: 460px"
          />
          <h3 class="text-center text-danger mt-3">
            Không tồn tại đơn hàng nào, vui lòng trở lại trang chủ để thêm những
            đơn hàng tuyệt vời của bạn..!
          </h3>
        </div>
      </div>
    </div>
    <!-- Modal -->

    <ModalDetailOrder
      :showDetailOrder="showDetailOrder"
      :infoListProductOrder="infoListProductOrder"
      :infoListDetailOrder="infoListDetailOrder"
      :infoCoupon="infoCoupon"
      :infoOrder="infoOrder"
      @closeDetailOrder="closeDetailOrder"
    />
    <!-- <SuccessModal v-if="showSuccessModal" @closeModal="handleCloseModal" /> -->
    <!-- Modal end -->

    <!-- Loader -->
    <Loader :isLoading="isLoading" />
    <!-- End Loader -->
  </div>
</template>
<script>
import globalMixin from "~/mixins/global";
import { StatusOrderValue, PaymentMethodValue } from "~/helpers/Constant";
import { CheckoutMethods } from "~/helpers/Constant";

export default {
  layout: "page-detail",
  data() {
    return {
      qtyOrder: [],
      ordered: false,
      isLoading: true,
      statusOrderValue: StatusOrderValue,
      paymentMethodValue: PaymentMethodValue,
      showDetailOrder: false,
      infoListProductOrder: [],
      infoListDetailOrder: [],
      infoCoupon: [],
      infoOrder: {},
      orderIdUpdate: "",
    };
  },
  async created() {
    let query = this.$route.query;

    if (!query.cancel && query.status) {
      this.submitOrderAfterCheckout(query);
    } else if (query.cancel && query.status) {
      this.reloadPageWithNotify();
    }
  },

  mounted() {
    this.isLoading = false;
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get("/order/get-list-order");
      const orderList = response.data.data ?? [];

      return {
        orderList: orderList,
      };
    } catch (error) {
      console.error(error);
      return {
        orderList: [],
      };
    }
  },
  mixins: [globalMixin],
  methods: {
    showOrderDetail(id) {
      this.isLoading = true;
      this.showDetailOrder = true;
      this.getOrderDetailById(id);
      this.isLoading = false;
    },

    getOrderDetailById(id) {
      this.infoOrder = this.orderList.find((order) => order.id == id);

      if (this.infoOrder) {
        this.infoCoupon = this.infoOrder.coupon;

        this.infoListDetailOrder = this.infoOrder.detail_orders;

        this.infoListProductOrder = this.infoOrder.detail_orders.map(
          (detailOrder) => {
            return detailOrder.product;
          }
        );
      } else {
        this.$toast.error("Đơn hàng đang cập nhật, vui lòng thử lại sau!");
      }
    },

    closeDetailOrder() {
      this.showDetailOrder = false;
    },

    async submitOrderAfterCheckout(dataQuery = "") {
      this.isLoading = true;
      this.paymentMethod = CheckoutMethods.CASH;

      if (dataQuery) {
        if (!dataQuery?.cancel) {
          this.paymentMethod = CheckoutMethods.BANKING_INTERNET;
        }

        this.orderIdUpdate = this.regDoubleQuote(
          this.$localStorage.getItem("orderIdUpdate")
        );
      }

      const dataUpdate = {
        payment_method: this.paymentMethod,
        status: StatusOrderValue["PAID"],
      };

      const payload = JSON.stringify(dataUpdate);

      const resSubmit = await this.$axios.put(
        `/order/update/${this.orderIdUpdate}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      this.isLoading = false;
      let data = resSubmit?.data?.data;
      this.$toast.success(
        "Thanh toán đơn hàng, cập nhật trạng thái đơn hàng thành công!"
      );
      this.$router.push("/manage-order");

      // Delete local storage
      this.$localStorage.removeItem("orderIdUpdate");
    },

    reloadPageWithNotify() {
      this.$toast.error(
        "Bạn đã thoát khỏi trang thanh toán, quá trình cập nhật thất bại, vui lòng thử lại sai"
      );

      this.$router.push("/manage-order");
    },

    regDoubleQuote(url) {
      if (url && url.includes('"')) {
        url = url.replace(/"/g, "");
      }

      return url;
    },
  },
  computed: {},
};
</script>
<style lang="css">
.order-list {
  overflow: visible;
}

table {
  width: 100%;
}

.product-thumbnail img {
  max-width: 86px;
  max-height: 86px;
}

.cart-main-area .product-order-list-cart .remove-all {
  color: #fff;
  background-color: gray;
}

.cart-main-area .product-order-list-cart .remove-all:hover {
  color: #fff;
  cursor: pointer;
  background-color: rgb(94, 93, 93);
}

#button-go-to-cart {
  height: 40px;
  width: 150px;
  display: block;
  margin: 50px auto 0;
  line-height: 40px;
  border-radius: 2px;
}

.content-go-to-cart {
  line-height: 40px;
}

.order-detail:hover {
  cursor: pointer;
  color: #fff;
}
</style>
