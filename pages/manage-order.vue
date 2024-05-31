<template lang="">
  <div class="cart-main-area ptb-100">
    <div class="container">
      <h3 class="page-title">Quản lý đơn hàng</h3>
      <div class="row" v-if="orderList">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <form action="#">
            <div class="table-content table-responsive order-list">
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
                      {{ item }}
                      <span class="amount">${{ item.code }}</span>
                    </td>
                    <td class="order-name">
                      <a :href="`order/${item.address_delivery}`">{{
                        item.address_delivery
                      }}</a>
                    </td>
                    <td class="order-price-cart">
                      <span class="payment-method"
                        >${{ item.payment_method }}</span
                      >
                    </td>
                    <!-- <td class="order-quantity">
                      <div class="pro-dec-cart">
                        <input
                          class="cart-plus-minus-box"
                          type="number"
                          min="0"
                          :max="qtyRemain(item.qty_import, item.qty_sold)"
                          :name="item.id"
                          @input="setMaxQty(item.qty_import, item.qty_sold)"
                          v-model="item.qtyOrder"
                          @change="changeQtyOrder(item)"
                        />
                      </div>
                    </td> -->
                    <td class="product-subtotal">
                      <span>{{ item.total_mount }}</span>
                    </td>
                    <td class="order-date">
                      <span>{{ item.order_date }}</span>
                    </td>
                    <td class="order-status">
                      <span>{{ item.status }}</span>
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
      <div class="row" v-else>
        <div class="col-lg-8 col-md-8 col-sm-8 col-8 mx-auto my-0 text-center">
          <!-- <img
            src="~static/img/product/ordered.jpg"
            alt="Hãy đến giỏ hàng để tiếp tục đến với thủ tục thanh toán và thông tin
            nhận hàng"
            style="max-height: 200px; max-width: 350px"
          /> -->
          <!-- <h3 class="text-center text-success mt-2 content-go-to-cart">
            Đã thêm vào giỏ hàng thành công, hãy đến giỏ hàng để tiếp tục đến
            với thủ tục thanh toán và thông tin nhận hàng
          </h3>
          <NuxtLink
            to="/cart-page"
            class="btn btn-success mt-5"
            id="button-go-to-cart"
            >Xem giỏ hàng</NuxtLink
          > -->
        </div>
      </div>
    </div>
    <!-- Loader -->
    <Loader :isLoading="isLoading" />
    <!-- End Loader -->
  </div>
</template>
<script>
export default {
  layout: "page-detail",
  data() {
    return {
      qtyOrder: [],
      ordered: false,
      isLoading: true,
    };
  },
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get("/order/get-list-order");
      const orderList = response.data.data ?? [];

      // orderList.forEach((item) => {
      //   item.qtyOrder = 1;
      //   let discountedPrice;
      //   if (item.discount !== null) {
      //     discountedPrice = (
      //       (item.price * (100 - item.discount)) /
      //       100
      //     ).toFixed(2);
      //   } else {
      //     discountedPrice = item.price;
      //   }
      //   item.discountedPrice = discountedPrice;
      //   item.subtotal = (item.qtyOrder * item.discountedPrice).toFixed(2);
      // });

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

  mounted() {
    this.isLoading = false;

    console.log(this.orderList);
  },

  computed: {},
  methods: {},
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
</style>
