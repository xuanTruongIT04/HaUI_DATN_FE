<template lang="">
  <div class="cart-main-area ptb-100">
    <div class="container">
      <h3 class="page-title">Your wishlist items</h3>
      <div class="row" v-if="wishlist.length > 0 && !ordered">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <form action="#">
            <div class="table-content table-responsive wishlist">
              <table>
                <thead>
                  <tr>
                    <th>Product Thumb</th>
                    <th>Product Name</th>
                    <th>Until Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in wishlist" :key="item.id">
                    <td class="product-thumbnail">
                      <a :href="`product/${item.slug}`"
                        ><img :src="`${item?.images[0]?.link}`" alt=""
                      /></a>
                    </td>
                    <td class="product-name">
                      <a :href="`product/${item.slug}`">{{ item.name }}</a>
                    </td>
                    <td class="product-price-cart">
                      <span class="amount">${{ item.discountedPrice }}</span>
                    </td>
                    <td class="product-quantity">
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
                    </td>
                    <td class="product-subtotal">${{ item.subtotal }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="bg-light">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total quantity</td>
                    <td>Total price</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{{ totalQtyOrder }} products</td>
                    <td>${{ totalPriceOrder }}</td>
                  </tr>
                </tfoot>
              </table>
              <div class="float-right product-wishlist-cart mt-5">
                <a @click="removeAllProduct" class="pl-4 pr-4 mr-3 remove-all"
                  >remove all product</a
                >
                <a @click.prevent="addMultiToCart" href="#" class="pl-4 pr-4"
                  >add to cart</a
                >
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row" v-else-if="wishlist.length === 0 && !ordered">
        <div class="col-lg-9 col-md-9 col-sm-9 col-9 mx-auto my-0 text-center">
          <img
            src="~static/img/product/empty.jpg"
            alt="Không tồn tại sản phẩm nào trong danh sách yêu thích"
            style="max-height: 380px; max-width: 460px"
          />
          <h3 class="text-center text-danger mt-3">
            Không tồn tại sản phẩm nào, vui lòng trở lại trang chủ để thêm những
            sản phẩm yêu thích của bạn..!
          </h3>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-lg-8 col-md-8 col-sm-8 col-8 mx-auto my-0 text-center">
          <img
            src="~static/img/product/ordered.jpg"
            alt="Hãy đến giỏ hàng để tiếp tục đến với thủ tục thanh toán và thông tin
            nhận hàng"
            style="max-height: 200px; max-width: 350px"
          />
          <h3 class="text-center text-success mt-2 content-go-to-cart">
            Đã thêm vào giỏ hàng thành công, hãy đến giỏ hàng để tiếp tục đến
            với thủ tục thanh toán và thông tin nhận hàng
          </h3>
          <NuxtLink to="/cart-page"
            class="btn btn-success mt-5"
            id="button-go-to-cart"
            >Xem giỏ hàng</NuxtLink
          >
        </div>
      </div>
    </div>
    <!-- Loader -->
    <Loader :isLoading="isLoading"/>
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
      const response = await $axios.get("/favorite/");
      const wishlist = response?.data?.data || [];

      wishlist.forEach((item) => {
        item.qtyOrder = 1;
        let discountedPrice;
        if (item.discount !== null) {
          discountedPrice = (
            (item.price * (100 - item.discount)) /
            100
          ).toFixed(2);
        } else {
          discountedPrice = item.price;
        }
        item.discountedPrice = discountedPrice;
        item.subtotal = (item.qtyOrder * item.discountedPrice).toFixed(2);
      });

      return {
        wishlist: wishlist,
      };
    } catch (error) {
      console.error(error);
      return {
        wishlist: [],
      };
    }
  },

  mounted() {
    this.isLoading = false;
  },

  computed: {
    totalQtyOrder() {
      let sumQty = 0;
      this.wishlist.forEach((item) => {
        sumQty += parseInt(item.qtyOrder);
      });
      return sumQty;
    },
    totalPriceOrder() {
      let subtotal = 0;
      let sumPriceOrder = 0;
      this.wishlist.forEach((item) => {
        subtotal = (item.qtyOrder * item.discountedPrice).toFixed(2);
        sumPriceOrder += parseFloat(subtotal);
      });
      return sumPriceOrder.toFixed(3);
    },
  },
  methods: {
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
    async changeQtyOrder(item) {
      try {
        if (!parseInt(item.qtyOrder)) {
          this.wishlist = this.wishlist.filter(
            (wishlistItem) => wishlistItem.id !== item.id
          );
          this.isLoading = true;
          const resDelete = await this.$axios.post(
            `favorite/delete/${item.id}`
          );
          this.isLoading = false;
          let status = resDelete?.data?.data?.delete;
          if (status)
            this.$toast.info(
              "Xoá thành công sản phẩm khi đặt số lượng đặt về 0"
            );
          else
            this.$toast.error("Xoá thất bại, hãy kiểm tra lại sau giây lát!");
        }
        item.subtotal = (item.qtyOrder * item.discountedPrice).toFixed(2);
      } catch (e) {
        this.isLoading = false;
        this.$toast.error("Xoá thất bại, hãy kiểm tra lỗi: " + e);
      }
    },

    async removeAllProduct() {
      this.isLoading = true;
      const resDelete = await this.$axios.post(`favorite/delete/`);
      this.isLoading = false;
      let status = resDelete?.data?.data?.delete;
      if (status)
        this.$toast.success("Xoá thành công tất cả sản phẩm yêu thích của bạn");
      else this.$toast.error("Xoá thất bại, hãy kiểm tra lại sau giây lát!");
      this.wishlist = [];
    },

    async addMultiToCart() {
      try {
        let dataCreate = {};
        this.wishlist.forEach((item) => {
          dataCreate[item.id] = parseInt(item.qtyOrder);
        });
        const payload = JSON.stringify(dataCreate);
        this.isLoading = true;
        const resCreate = await this.$axios.post(
          `/favorite/add-to-cart/`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.isLoading = false;
        let status = resCreate?.data?.data?.add;
        if (status) {
          this.ordered = true;
          this.$bus.$emit("addProductToCart");
        } else {
          this.$toast.error(
            "Thêm sản phẩm vào giỏ hàng thất bại, hãy kiểm tra và thử lại sau giây lát!"
          );
        }
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
  },
};
</script>
<style lang="css">
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
