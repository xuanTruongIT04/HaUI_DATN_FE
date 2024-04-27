<template>
  <div class="modal fade" id="compareModel" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-around">
            <div
              v-for="item in productsCompare"
              :key="item?.id"
              class="col-md-5 col-sm-5 col-xs-12"
            >
              <div class="product-image">
                <img
                  class="image-compare"
                  :src="item?.images[0]?.link"
                  :alt="item?.name"
                />
              </div>
              <div class="product-info mt-2">
                <h3>{{ item?.name }}</h3>
                <div class="product-price-wrapper">
                  <span class="product-price">${{ item?.price }}</span>
                  <span
                    class="product-price-old"
                    v-if="item?.discount !== null"
                  >
                    ${{ (item?.price * (100 - item?.discount)) / 100 }}
                  </span>
                </div>
                <p v-html="briefName(item.description, 300)"></p>
                <div
                  class="product-quantity"
                  v-if="statusStock(item.qty_import, item.qty_sold)"
                >
                  <div class="cart-plus-minus">
                    <input
                      class="cart-plus-minus-box"
                      type="number"
                      min="0"
                      :max="qtyRemain(item.qty_import, item.qty_sold)"
                      name="qtybutton"
                      v-model="numberOrder"
                      @change="setMaxQty(item.qty_import, item.qty_sold)"
                    />
                  </div>
                  <button @click.prevent="addCart(item.id, numberOrder)">
                    Add to cart
                  </button>
                </div>
                <span v-if="statusStock(item.qty_import, item.qty_sold)"
                  ><i class="fa fa-check"></i> In stock</span
                >
                <span v-else><i class="fa fa-times"></i> Out stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalMixin from "~/mixins/global";
export default {
  mixins: [globalMixin],
  props: {
    productsCompare: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
        numberOrder: 1,
      }
  },

  methods: {
    statusStock(qty_import, qty_sold) {
      if (qty_import > qty_sold) return true;
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
    async addCart(productId, numberOrder) {
      try {
        const token = this.$cookies.get("token");
        const remember_me = this.$cookies.get("remember_me");
        if (token || remember_me) {
          this.$bus.$emit("isLoading3Dot", true);
          const resAdd = await this.$axios.post(
            `/cart/add/${productId}/${numberOrder}`
          );
          this.$bus.$emit("isLoading3Dot", false);
          this.$bus.$emit("addProductToCart", productId);
          let cart = resAdd?.data?.data?.cart;
          if (cart) {
            this.handleClosePP();
            this.$emit("showSuccessModal", true);
          } else {
            this.$bus.$emit("isLoading3Dot", false);
            this.$toast.error(
              "Thêm sản phẩm vào giỏ hàng thất bại, hãy kiểm tra và thử lại sau giây lát!"
            );
          }
        } else {
          this.$bus.$emit("isLoading3Dot", false);
          this.$toast.error(
            "Thêm sản phẩm vào giỏ hàng thất bại, bạn phải đăng nhập trước khi thực hiện!"
          );
        }
      } catch (error) {
        console.error(error);
      }
      this.numberOrder = 1;
    },
  },
};
</script>

<style lang="css" scoped>
.modal-body {
  padding: 20px;
}

.product-image {
  text-align: center;
}

.product-image img {
  width: 70%;
  height: auto;
  margin: 0 auto;
}

.product-info h3 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.product-price {
  margin-right: 10px;
  font-weight: bold;
}

.product-price-old {
  text-decoration: line-through;
  color: #999;
}
.product-price-wrapper {
  margin-top: 12px;
  margin-bottom: 12px;
}
</style>
