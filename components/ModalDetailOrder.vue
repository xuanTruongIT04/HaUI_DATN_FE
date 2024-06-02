<template lang="">
  <div
    class="modal"
    id="previewModel"
    tabindex="-1"
    @click.self="handleCloseDetailOrder"
    :class="{ active: detailOrder }"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chi tiết đơn hàng</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="handleCloseDetailOrder"
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="information-coupon mb-4">
            <div class="card card-primary" v-if="infoListDetailOrder">
              <div class="card-header bg-primary">
                <h6 class="card-title m-0 text-light">Thông tin sản phẩm</h6>
              </div>
              <div class="card-body p-0">
                <table class="table table-striped table-checkall">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Ảnh sản phẩm</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Giá gốc</th>
                      <th scope="col">Khuyến mãi (%)</th>
                      <th scope="col">Giá khuyến mại</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="row-in-list"
                      v-for="(item, index) in infoListDetailOrder"
                      :key="item.id"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <a
                          :href="`http://localhost:3000/product/${item.product.slug}`"
                          class="thumbnail"
                          v-if="item?.product.images && item?.product.images[0]"
                        >
                          <img
                            class="image-order"
                            :src="item?.product.images[0].link"
                            id="thumbnail_img"
                          />
                        </a>
                      </td>
                      <td>{{ item?.product.name }}</td>
                      <td>{{ convertUSDToVND(item?.product.price) }}</td>
                      <td>{{ item?.product.discount }}%</td>
                      <td>{{ convertUSDToVND(item.price_sale) }}</td>
                      <td>{{ item?.quantity }}</td>
                      <td>
                        {{ convertUSDToVND(item.quantity * item.price_sale) }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="bg-info">
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <th class="text-light">TỔNG</th>
                      <th class="text-light">TỔNG</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <b>{{ totalQuantity }}</b>
                      </td>
                      <td>
                        <b>{{ convertUSDToVND(totalPrice) }}</b>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="card card-primary" v-else>
              <h5 class="text-muted">Không tồn tại sản phẩm nào!</h5>
            </div>
          </div>

          <div class="information-coupon mb-4">
            <div class="card card-primary">
              <div class="card-header bg-warning">
                <h6 class="card-title text-success m-0">Phiếu giảm giá</h6>
              </div>
              <div class="card-body p-0" id="information-order">
                <table
                  class="table table-striped table-checkall"
                  v-if="infoCoupon"
                >
                  <thead>
                    <tr>
                      <th scope="col">Tên phiếu</th>
                      <th scope="col">Mã phiếu</th>
                      <th scope="col">Khuyến mãi (%)</th>
                      <th scope="col">Khuyến mãi (VNĐ)</th>
                      <th scope="col">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="row-in-list">
                      <td>
                        <span>{{ infoCoupon.name }}</span>
                      </td>
                      <td>{{ infoCoupon.code }}</td>
                      <td>{{ infoCoupon.percent }}</td>
                      <td>
                        {{
                          convertUSDToVND(
                            (
                              (infoOrder.total_mount * infoCoupon.percent) /
                              100
                            ).toFixed(3)
                          )
                        }}
                      </td>
                      <td>
                        <b>{{ convertUSDToVND(infoOrder.total_mount) }}</b>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table v-else>
                  <tr>
                    Không tồn tại phiếu giảm giá nào!
                  </tr>
                </table>
              </div>
            </div>
            <div class="card-footer"></div>
          </div>

          <div class="detail-infor-order mb-4">
            <div class="card card-primary">
              <div class="card-header bg-success">
                <h6 class="card-title text-light m-0">Thông tin đơn hàng</h6>
              </div>
              <div class="card-body" id="information-order">
                <form action="" method="POST">
                  <div class="row">
                    <div class="col-6">
                      <div class="form-group">
                        <h6 class="order-code">Mã đơn hàng</h6>
                        <span class="detail">{{ infoOrder.code }}</span>
                      </div>

                      <div class="form-group">
                        <h6 class="address-delivery">
                          Địa chỉ nhận hàng / Số điện thoại
                        </h6>
                        <span class="detail"
                          >{{ infoOrder.address_delivery }} / </span
                        ><span class="detail">{{
                          infoOrder?.bill?.user.phone
                        }}</span>
                      </div>
                    </div>

                    <div class="col-6" v-if="this.infoOrder.status < 2">
                      <div class="form-group">
                        <h6 class="order-status">
                          <label for="status" class="fw-550">
                            <i class="fas fa-chart-area"></i>Trạng thái đơn hàng
                          </label>
                        </h6>
                        <select
                          class="form-control"
                          name="status"
                          id="status"
                          v-model="typeOfPaymentMethod"
                        >
                          <option value="ORDERED">Đã đặt hàng</option>
                          <option value="BANKING_ONLINE">
                            Thanh toán chuyển khoản
                          </option>
                          <option value="CANCEL">Huỷ đơn</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-6" v-else>
                      <div class="form-group">
                        <h6 class="order-status">
                          <label for="status" class="fw-550">
                            <i class="fas fa-chart-area"></i>Trạng thái đơn hàng
                          </label>
                        </h6>
                        <span
                          v-if="this.infoOrder.status == 2"
                          class="badge badge-warning text-status-order"
                        >
                          {{ statusOrder[this.infoOrder.status] }}
                        </span>
                        <span
                          v-else
                          class="badge badge-danger text-status-order"
                        >
                          {{ statusOrder[this.infoOrder.status] }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <input
                    name="btn_update"
                    v-if="infoOrder.status == 0 || infoOrder.status == 1"
                    @click.prevent="updateOrder(infoOrder.id)"
                    class="btn btn-primary float-right mt-1 btn-update"
                    value="Cập nhật"
                  />
                  <input
                    name="btn_update"
                    v-else
                    @click.prevent="notDisableOrder"
                    class="btn btn-secondary float-right mt-1 btn-update btn-disabled"
                    value="Chỉ xem"
                  />
                </form>
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
</template>
<script>
import globalMixin from "~/mixins/global";
import { StatusOrderValue, StatusOrder } from "~/helpers/Constant";
import { hashSignature } from "~/helpers/Encryption";
import {
  domainCheckoutOnline,
  apiKey,
  clientId,
  checksumKey,
} from "~/config/envConfig";

export default {
  props: {
    showDetailOrder: {
      type: Boolean,
      required: false,
    },
    infoListProductOrder: {
      required: true,
    },
    infoListDetailOrder: {
      required: true,
    },
    infoCoupon: {
      required: false,
    },
    infoOrder: {
      required: true,
    },
  },
  data() {
    return {
      thumbMainColor: "",
      listThumbSubColor: [],
      numberOrder: 1,
      subOrderCode: "",
      isLoading: true,
      statusOrder: StatusOrder,
    };
  },

  async beforeCreate() {
    this.isLoading = true;
  },

  created() {
    this.updatePaymentMethod();
    this.isLoading = false;
  },

  async asyncData({ $axios, query }) {
    try {
      let orderInfo = {};
      const resStatus = await $axios.get("/order/get-status");
      const status = resStatus?.data?.data?.status || false;

      if (status) {
        const res = await $axios.get(`/order/get-info/`);
        orderInfo = res?.data?.data || {};
      }

      return {
        orderCode: orderInfo.code || "",
        subOrderCode: orderInfo.id || "",
      };
    } catch (error) {
      console.error(error);
      return {};
    }
  },

  mounted() {
    this.isLoading = false;
    this.infoListDetailOrder.map((item) => {
      item.subtotal = item.quantity * item.price_sale;
      return item;
    });

    window.addEventListener("keydown", this.handleEscKey);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleEscKey);
  },
  mixins: [globalMixin],
  computed: {
    detailOrder() {
      if (this.showDetailOrder) return this.showDetailOrder;
      return false;
    },
    totalQuantity() {
      if (!this.infoListDetailOrder || this.infoListDetailOrder.length === 0) {
        return 0;
      }
      return this.infoListDetailOrder.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    totalPrice() {
      return this.infoListDetailOrder.reduce((total, item) => {
        return total + Number(item.price_sale);
      }, 0);
    },
  },
  watch: {
    infoOrder: {
      deep: true,
      handler() {
        this.updatePaymentMethod();
      },
    },
  },
  methods: {
    updatePaymentMethod() {
      if (this.infoOrder.status == StatusOrderValue["CANCEL"]) {
        this.typeOfPaymentMethod = "CANCEL";
      } else if (this.infoOrder.status == StatusOrderValue["BANKING_ONLINE"]) {
        this.typeOfPaymentMethod = "BANKING_ONLINE";
      } else {
        this.typeOfPaymentMethod = "ORDERED";
      }
    },

    handleCloseDetailOrder() {
      this.$emit("closeDetailOrder");
    },

    handleEscKey(event) {
      if (event.keyCode === 27) {
        this.handleCloseDetailOrder();
      }
    },
    async updateOrder(id) {
      if (this.typeOfPaymentMethod == "CANCEL") {
        const confirmCancel = window.confirm(
          "Bạn có chắc chắn muốn huỷ đơn hàng không?"
        );
        if (!confirmCancel) return;

        const dataUpdate = {
          status: StatusOrderValue["CANCELLED"],
        };
        const payload = JSON.stringify(dataUpdate);
        const resUpdate = await this.$axios.put(
          `/order/update/${id}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.isLoading = false;
        let status = resUpdate?.data?.data?.update;
        if (status) {
          this.$toast.success("Cập nhật đơn hàng thành công!");
          this.$nuxt.refresh();
          this.handleCloseDetailOrder();
        } else {
          let errorMessage = resUpdate?.data?.data?.error;
          this.$toast.error(errorMessage);
        }
      } else if (this.typeOfPaymentMethod == "BANKING_ONLINE") {
        // Get info user
        this.isLoading = true;
        const getInformationUser = await this.$axios.get(`/check-infor/`);
        let infoUser = getInformationUser?.data?.data?.info;

        const orderCodeNumber = this.parseNumber(
          this.infoOrder.id,
          this.infoOrder.code
        );

        let itemsForBanking = [];
        this.infoListDetailOrder.forEach((item) => {
          let bankingItem = { ...item.product, quantity: item.quantity };
          itemsForBanking.push(bankingItem);
        });

        const amount = 2000;

        var randomNumber = Math.floor(Math.random() * 100);

        var orderCode = orderCodeNumber + randomNumber;

        let data = {
          orderCode: orderCode,
          amount: amount,
          description: "THANH TOAN DON HANG LOTUS",
          buyerName: infoUser.first_name,
          buyerEmail: infoUser.email,
          buyerPhone: infoUser.phone,
          buyerAddress: this.infoOrder.address_delivery,
          items: itemsForBanking,
          cancelUrl: "http://localhost:3000/manage-order",
          returnUrl: "http://localhost:3000/manage-order",
          expiredAt: 1917281589, //  5 minutes,
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

        this.isLoading = true;

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
          this.$localStorage.setItem("orderIdUpdate", this.infoOrder.id);

          this.redirectExternalSite(dataCheckout.checkoutUrl);
        }
      } else {
        this.handleCloseDetailOrder();
      }
    },
    notDisableOrder() {
      this.$toast.error(
        "Bạn không thể cập nhật trạng thái cho đơn hàng đã thanh toán hoặc đã huỷ"
      );
    },
    parseNumber(subOrderCode, orderCode) {
      const regex = /\d+/g;
      let match = orderCode.match(regex);
      let numbers = [subOrderCode];
      numbers.push(...match);
      let combined = numbers ? numbers.join("") : "";
      return parseInt(combined.slice(0, 10));
    },
    redirectExternalSite(url) {
      let urlStd = this.regDoubleQuote(url);

      window.location.href = urlStd;
    },
    regDoubleQuote(url) {
      if (url && url.includes('"')) {
        url = url.replace(/"/g, "");
      }

      return url;
    },

    timeNowToSeconds() {
      return Math.floor(Date.now() / 1000);
    },
  },
};
</script>
<style lang="css" scoped>
.tab-content,
.tab-content .tab-pane img {
  height: 250px;
}

.owl-item {
  display: flex;
}

.thumb-image,
.owl-item a {
  width: 70px;
  height: 70px;
  display: block;
}

.owl-stage-outer,
.owl-item {
  width: 2000px !important;
}

.color-name {
  color: #000;
}

.color-name:hover {
  cursor: pointer;
  color: #fff !important;
  background: rgb(160, 160, 55);
  padding-left: 8px;
  padding-right: 8px;
}

.active {
  display: block !important;
}

.modal-body {
  height: 600px;
  overflow-y: auto;
}

#previewModel .modal-dialog {
  margin: 1% auto;
  max-width: 1170px;
  width: 1170px;
}

#previewModel .modal-content {
  padding: 20px;
}

.tab-content,
.tab-content .tab-pane img {
  height: 250px;
}

.owl-item {
  display: flex;
}

.thumb-image,
.owl-item a {
  width: 70px;
  height: 70px;
  display: block;
}

.owl-stage-outer,
.owl-item {
  width: 2000px !important;
}

.color-name {
  color: #000;
}

.color-name:hover {
  cursor: pointer;
  color: #fff !important;
  background: rgb(160, 160, 55);
  padding-left: 8px;
  padding-right: 8px;
}

.active {
  display: block !important;
}

.btn-update {
  max-width: 190px;
  height: 48px;
  border-radius: 4px;
}

.btn-update:hover {
  cursor: pointer;
}

.image-order {
  max-width: 70px;
  max-height: 70px;
}

.btn-disabled:hover {
  cursor: default;
}

.text-status-order {
  font-size: 16px;
}
</style>
