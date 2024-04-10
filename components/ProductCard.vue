<template lang="">
  <div class="product-contain product-wrapper">
    <div class="product-img">
      <a v-if="statusCompare" class="compare-product-contain">
        <img alt="" :src="product.images ? product.images[0]?.link : ''" />
        <span
          v-if="!statusProductCompareLimit && !existsInPCL(product.id)"
          class="compare-product-button"
          @click="selectItemCompare(product.id)"
          ><i class="fa fa-plus-circle"></i>
          <i v-if="listProductCompare"
            >Add to compare list ({{ listProductCompare.length }} in 2)</i
          >
        </span>
        <span
          v-else-if="
            (!statusProductCompareLimit && existsInPCL(product.id)) ||
            (statusProductCompareLimit && existsInPCL(product.id))
          "
          class="compare-product-button-delete"
          @click="unSelectItemCompare(product.id)"
          ><i class="fa fa-minus-circle"></i>
          <i v-if="listProductCompare">Delete this product from LPC</i>
        </span>
        <span v-else class="compare-product-button-x">
          <i class="fa fa-times"></i>
          <i
            >List product comparation (LPC) is limited to a maximum of 2
            products</i
          >
        </span>
      </a>
      <a v-else :href="`product/${product.slug}`">
        <img alt="" :src="product.images[0]?.link" />
      </a>
      <span v-if="product.discount">-{{ product.discount }}%</span>
      <div class="product-action">
        <a
          class="action-wishlist"
          title="Add to wishlist"
          :class="{ active: isActive }"
          @click="toggleItemWishlist(product.id)"
        >
          <i class="ion-android-favorite-outline"></i>
        </a>
        <a
          class="action-cart"
          title="Add To Cart"
          @click.prevent="addCart(product.id)"
          v-if="statusStock(product.qty_import, product.qty_sold)"
        >
          <i class="ion-ios-shuffle-strong"></i>
        </a>
        <a
          class="action-cart"
          title="Sold out"
          @click.prevent="titleSoldOut"
          v-else
        >
          <i class="ion-close"></i>
        </a>
        <a class="action-compare preview-product" title="Quick View">
          <button
            class="btn-preview-product ion-ios-search-strong"
            role="dialog"
            @click="previewProduct(product.id)"
          ></button>
        </a>
      </div>
    </div>
    <div class="product-content text-left">
      <div class="product-hover-style">
        <div class="product-title">
          <h4>
            <a :href="`product/${product.slug}`">{{
              limitCharacters(product.name, 24)
            }}</a>
          </h4>
        </div>
        <div class="cart-hover">
          <h4> <a
          class="action-cart"
          title="Add To Cart"
          @click.prevent="addCart(product.id)"
          v-if="statusStock(product.qty_import, product.qty_sold)"
        >
        + Add to cart
        </a>
        <a :href="`product/${product.slug}`" v-else>View product details</a>
        </h4>
        </div>
      </div>
      <div class="product-price-wrapper">
        <span style="margin-right: 10px">${{ priceNew }}</span>
        <span class="product-price-old" v-if="product.price !== priceNew">
          ${{ product.price.toFixed(2) }}
        </span>
      </div>
    </div>
    <div class="product-list-details">
      <h4>
        <a :href="`product/${product.slug}`">{{ product.name }}</a>
      </h4>
      <div class="product-price-wrapper">
        <span style="margin-right: 10px">${{ priceNew }}</span>
        <span class="product-price-old" v-if="product.price !== priceNew">
          ${{ product.price }}
        </span>
      </div>
      <p v-html="product.description"></p>
      <div class="shop-list-cart-wishlist">
        <a
          class="action-wishlist"
          title="Add to wishlist"
          :class="{ active: isActive }"
          @click.prevent="toggleItemWishlist(product.id)"
          ><i class="ion-android-favorite-outline"></i
        ></a>
        <a
          class="action-cart"
          title="Add To Cart"
          @click.prevent="addCart(product.id)"
          v-if="statusStock(product.qty_import, product.qty_sold)"
          ><i class="ion-ios-shuffle-strong"></i
        ></a>
        <a
          class="action-cart"
          title="Sold out"
          @click.prevent="titleSoldOut"
          v-else
        >
          <i class="ion-close"></i>
        </a>
        <a class="preview-product" title="Quick View">
          <button
            class="btn-preview-product ion-ios-search-strong"
            role="dialog"
            @click="previewProduct(product.id)"
          ></button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import character from "~/mixins/character";
import { StatusFavotes } from "~/helpers/Constant";
export default {
  mixins: [character],
  props: {
    product: {
      type: Object,
      required: true,
    },
    statusProductCompareLimit: {
      type: Boolean,
    },
    listProductCompare: {
      type: Array,
    },
  },
  data() {
    return {
      statusCompare: false,
      statusPCL: false,
      wishListClicked: [],
      showProductPreview: false,
      isActive: false,
    };
  },
  created() {
    this.$bus.$on("statusCompare", this.statusCompareProduct);
    if (
      this.product.favorites &&
      this.product.favorites[0] &&
      this.product.favorites[0].product_id === this.product.id &&
      this.product.favorites[0].status === StatusFavotes.ACTIVE
    ) {
      this.isActive = true;
    }
  },
  methods: {
    previewProduct(idProduct) {
      this.$emit("previewProduct", idProduct);
      this.showProductPreview = true;
      this.$emit("showProductPreview", this.showProductPreview);
    },
    statusCompareProduct(statusCompare) {
      this.statusCompare = statusCompare;
    },
    selectItemCompare(idProduct) {
      this.$emit("selectItemCompare", idProduct);
    },
    unSelectItemCompare(idProduct) {
      this.$emit("unSelectItemCompare", idProduct);
    },
    existsInPCL(idProduct) {
      if (this.listProductCompare) {
        if (this.listProductCompare.includes(idProduct)) return true;
      }
      return false;
    },
    toggleItemWishlist(productId) {
      const token = this.$cookies.get("token");
      const remember_me = this.$cookies.get("remember_me");
      if (token || remember_me) {
        this.$bus.$emit("isLoading3Dot", true);
        this.$axios
          .post(`favorite/toggle/${this.product.id}`, {
            product_id: this.product.id,
          })
          .then((res) => {
            if (res.data?.data?.add) {
              this.wishListClicked.push(productId);
              this.$bus.$emit("isLoading3Dot", false);
              this.toggleClass();
              this.$toast.success(
                "Thêm '" +
                  this.product.name +
                  "' vào danh sách yêu thích thành công"
              );
            } else {
              const index = this.wishListClicked.indexOf(productId);
              this.wishListClicked.splice(index, 1);
              this.$bus.$emit("isLoading3Dot", false);
              this.toggleClass();
              this.$toast.info(
                "Xoá '" +
                  this.product.name +
                  "' khỏi danh sách yêu thích thành công"
              );
            }
          })
          .catch((error) => {
            console.error(error);
            this.$bus.$emit("isLoading3Dot", false);
            this.$toast.error(
              "Thêm sản phẩm vào danh sách yêu thích thất bại, hãy kiểm tra và thực hiện sau giây lát!"
            );
          });
      } else {
        this.$bus.$emit("isLoading3Dot", false);
        this.$toast.error(
          "Thêm sản phẩm vào danh sách yêu thích thất bại, bạn phải đăng nhập trước khi thực hiện!"
        );
      }
    },

    toggleClass() {
      this.isActive = !this.isActive;
    },

    addCart(productId) {
      this.$emit("addCart", productId);
    },

    statusStock(qty_import, qty_sold) {
      if (qty_import > qty_sold) return true;
      return false;
    },
    titleSoldOut() {
      this.$toast.info(
        "Sản phẩm này tạm thời hết hàng, xin vui lòng tham khảo sản phẩm khác"
      );
    },
  },
  computed: {
    priceNew() {
      if (this.product.discount !== null) {
        const discountedPrice =
          (this.product.price * (100 - this.product.discount)) / 100;
        return discountedPrice.toFixed(2);
      }
      return this.product.price.toFixed(2);
    },
  },
};
</script>
<style lang="css" scoped>
a.preview-product {
  display: inline-block;
}

a:hover .btn-preview-product {
  color: #fff;
}

.btn-preview-product {
  border: none;
  background: none;
  cursor: pointer;
  color: #242424;
  font-size: 17px;
  width: 100%;
}

.action-wishlist:hover,
.action-cart:hover {
  cursor: pointer;
}

.action-wishlist:hover i,
.action-cart:hover i {
  color: #fff;
}

.compare-product-contain {
  display: block;
  position: relative;
}

.compare-product-button,
.compare-product-button-x,
.compare-product-button-delete {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80%;
  text-align: center;
  transform: translate(-50%, -50%);
  display: inline-block;
  z-index: 1;
  padding: 10px;
}

.compare-product-button {
  background-color: #ffffffbe;
  color: #000;
}

.compare-product-button-x {
  background-color: #d19c9c;
  text-decoration: underline;
  color: #000;
}

.compare-product-button-delete {
  background-color: #000;
  color: #ffffffbe;
}

.compare-product-button:hover,
.compare-product-button-delete:hover {
  background-color: #000;
  color: #fff;
  cursor: pointer;
}

.active {
  background-color: red !important;
  color: #fff !important;
}
</style>
