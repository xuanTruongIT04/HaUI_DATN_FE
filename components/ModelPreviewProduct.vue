<template lang="">
  <div
    class="modal"
    id="previewModel"
    tabindex="-1"
    @click.self="handleClosePP"
    :class="{ active: previewProduct }"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="handleClosePP"
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-5 col-sm-5 col-xs-12">
              <!-- Thumbnail Large Image start -->
              <div class="tab-content">
                <div id="pro-1" class="tab-pane show active">
                  <img v-if="thumbMain" :src="thumbMain.link" alt="" />
                  <img v-else :src="listThumb" alt="" />
                </div>
                <div
                  v-if="listThumb"
                  v-for="item in listThumb"
                  :id="'pro-' + item.id"
                  class="tab-pane"
                >
                  <img :src="item.link" :alt="item.description" />
                </div>
              </div>
              <!-- Thumbnail Large Image End -->
              <!-- Thumbnail Image End -->
              Hình ảnh liên quan
              <div class="product-thumbnail">
                <div
                  class="thumb-menu owl-carousel nav nav-style"
                  role="tablist"
                  v-if="listThumb"
                >
                  <div class="owl-stage-outer">
                    <div class="owl-stage">
                      <div class="owl-item">
                        <a
                          data-toggle="tab"
                          :href="'#pro-' + item.id"
                          v-for="item in listThumb"
                          :key="item.id"
                        >
                          <img
                            v-if="item.link"
                            :src="item.link"
                            :alt="item.description"
                            class="thumb-image"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Thumbnail image end -->
            </div>
            <div class="col-md-7 col-sm-7 col-xs-12">
              <div class="modal-pro-content">
                <h3>{{ productPreview.name }}</h3>
                <div class="product-price-wrapper">
                  <span style="margin-right: 10px">${{ priceNew }}</span>
                  <span
                    class="product-price-old"
                    v-if="productPreview.price !== priceNew"
                  >
                    ${{ productPreview.price }}
                  </span>
                </div>
                <p v-html="productPreview.description"></p>
                <div class="quick-view-select">
                  <div class="quickview-color-wrap">
                    <label>List colors <small>(Pick color to show image related)</small>:</label>
                    <div
                      class="quickview-color-name"
                      v-if="productPreview.colors"
                    >
                      <ul>
                        <li
                          v-for="color in productPreview.colors"
                          v-if="color"
                          :key="color.id"
                        >
                          <a @click="getImageByPC(color.id)" class="color-name"
                            >- {{ color.name }}</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="product-quantity" v-if="statusStock">
                  <div class="cart-plus-minus">
                    <input
                      class="cart-plus-minus-box"
                      type="number"
                      min="1"
                      :max="qtyReamin"
                      name="qtybutton"
                      v-model="numberOrder"
                      @change="
                        setMaxQty(
                          productPreview.qty_import,
                          productPreview.qty_sold
                        )
                      "
                    />
                  </div>
                  <button
                    @click.prevent="addCart(productPreview.id, numberOrder)"
                  >
                    Add to cart
                  </button>
                </div>
                <span v-if="statusStock"
                  ><i class="fa fa-check"></i> In stock</span
                >
                <span v-else><i class="fa fa-times"></i> Out stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->
  </div>
</template>
<script>
export default {
  props: {
    productPreview: {
      type: Object,
      required: true,
    },
    showProductPreview: {
      type: Boolean,
      required: false,
    },
  },
  mounted() {
    window.addEventListener("keydown", this.handleEscKey);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleEscKey);
  },
  data() {
    return {
      thumbMainColor: "",
      listThumbSubColor: [],
      numberOrder: 1,
    };
  },
  computed: {
    priceNew() {
      if (this.productPreview.discount !== null) {
        const discountedPrice =
          (this.productPreview.price * (100 - this.productPreview.discount)) /
          100;
        return discountedPrice.toFixed(2);
      }
      return this.productPreview.price;
    },
    thumbMain() {
      if (this.thumbMainColor !== "") return this.thumbMainColor;

      if (this.productPreview.images) {
        const mainImage = this.productPreview.images.find(
          (item) => item.level === 0
        );
        if (mainImage) {
          return mainImage;
        }
      }
      return "";
    },
    listThumbSub() {
      if (this.listThumbSubColor) return this.listThumbSubColor;
      const productImages = this.productPreview?.images;
      const level1Images = Array.isArray(productImages)
        ? productImages.filter((item) => item?.level === 1)
        : [];
      return level1Images.filter(Boolean);
    },
    listThumb() {
      const thumbMain = this.thumbMain;
      const listThumbSub = this.listThumbSub;
      return [...listThumbSub, thumbMain];
    },
    statusStock() {
      if (this.productPreview.qty_sold < this.productPreview.qty_import)
        return true;
      return false;
    },
    qtyReamin() {
      if (this.productPreview.qty_sold < this.productPreview.qty_import)
        return this.productPreview.qty_import - this.productPreview.qty_sold;
      return false;
    },
    previewProduct() {
      if (this.showProductPreview) return this.showProductPreview;
      return false;
    },
  },
  methods: {
    getImageByPC(idColor) {
      try {
        let productPreviewTemp = { ...this.productPreview };
        const mainImage = productPreviewTemp.images.find(
          (item) => item.level === 0 && item.color_id === idColor
        );
        this.thumbMainColor = mainImage ? mainImage : "";

        const subImages = productPreviewTemp.images.filter(
          (item) => item.level === 1 && item.color_id === idColor
        );
        this.listThumbSubColor = subImages.length > 0 ? subImages : [];
      } catch (e) {
        console.log(e);
      }
    },
    setMaxQty(qty_import, qty_sold) {
      const input = event.target;
      const maxValue = qty_import - qty_sold;
      if (input.value > maxValue) {
        input.value = maxValue;
      }
    },
    async addCart(productId, numberOrder = 1) {
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

      handleClosePP() {
        this.$emit("closePreviewProduct");
      },

    handleEscKey(event) {
      if (event.keyCode === 27) {
        this.handleClosePP();
      }
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
</style>
