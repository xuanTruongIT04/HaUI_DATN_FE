<template lang="">
  <div>
    <!-- Product Deatils Area Start -->
    <div class="product-details pt-100 pb-95">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="product-details-img">
              <img
                class="thumb-main"
                v-if="product && product.images && product.images[0]"
                :src="product?.images[0]?.link"
                alt="zoom"
              />
              <div id="gallery" class="mt-20 product-dec-slider owl-carousel">
                <a
                  class="sub-thumb-contain"
                  v-if="product?.sub_thumb"
                  v-for="item in product?.sub_thumb"
                  :key="item.id"
                  @click="changeMainImage(item?.link)"
                >
                  <img :src="item?.link" class="sub-thumb" :alt="item?.title" />
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="product-details-content">
              <h4>{{ product?.name ? product?.name : "" }}</h4>
              <span>${{ priceNew }}</span>
              <div class="in-stock">
                <p>
                  Available: <span>{{ statusStock }}</span> <br>
                  Quantity in stock: <span><b>{{ qtyInStock }}</b> product</span>
                </p>
              </div>
              <p v-html="product?.description"></p>
              <div class="pro-dec-feature">
                <ul class="list-options-tea">
                  <li>
                    <label for="express"><span class="stt mr-2">1. </span>
                      Express Delivery: 1-2 day</label>
                  </li>
                  <li>
                    <label for="tea-set"><span class="stt mr-2">2. </span>Tea Set</label>
                  </li>
                  <li>
                    <label for="gift-box">
                     <span class="stt mr-2">3. </span>Gift Box beautiful and elegant </label
                    >
                  </li>
                  <li>
                    <label for="tea-infuser">
                      <span class="stt mr-2">4. </span>Tea Infuser</label
                    >
                  </li>
                  <li>
                    <label for="tea-accessories-kit">
                      <span class="stt mr-2">5. </span>Tea Accessories Kit
                     </label
                    >
                  </li>
                </ul>
              </div>
              <div class="quality-add-to-cart" v-if="isInStock">
                <div class="quality">
                  <label>Qty:</label>
                  <input
                    class="cart-plus-minus-box"
                    type="number"
                    name="qtybutton"
                    :min="numberOrder"
                    :max="qtyRemain(product?.qty_import, product?.qty_sold)"
                    @change="setMaxQty(product?.qty_import, product?.qty_sold)"
                    v-model="numberOrder"
                  />
                </div>
                <div class="shop-list-cart-wishlist">
                  <a
                    class="icon-cart action-cart"
                    title="Add To Cart"
                    @click="addCart(product?.id)"
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </a>
                  <a
                    class="action-wishlist"
                    title="Wishlist"
                    :class="{ active_favorite: isActive }"
                    @click="toggleAction(product.id)"
                  >
                    <i class="fa fa-heart"></i>
                  </a>
                </div>
              </div>
              <div class="quality-add-to-cart" v-else>
                <h4>Out stock</h4>
              </div>
              <div class="pro-dec-categories mt-3">
                <ul v-if="product?.category">
                  <li class="categories-title">Category:</li>
                  <li>
                    <a @click="searchByCategory(product?.category.id)">
                      {{ product?.category.title }}
                    </a>
                  </li>
                </ul>
              </div>
              <div class="pro-dec-categories mt-1">
                <ul>
                  <li class="categories-title">Tags:</li>
                  <li
                    v-if="product?.product_tags?.length > 0"
                    v-for="(item, index) in product?.product_tags"
                    :key="item.id"
                  >
                    <a @click="searchByTag(item.tag.id)" class="tag-name mr-2"
                      >{{ item.tag.name
                      }}<span v-if="product?.product_tags?.length - 1 !== index"
                        >,
                      </span>
                    </a>
                  </li>
                  <li v-if="product?.product_tags?.length === 0">
                    <u><i>This product has no tags available...</i></u>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Deatils Area End -->
    <div class="description-review-area pb-70">
      <div class="container">
        <div class="description-review-wrapper">
          <div class="description-review-topbar nav text-center">
            <a class="active" data-toggle="tab" href="#des-details1">Description</a>
            <a data-toggle="tab" href="#des-details2">Detail</a>
            <a data-toggle="tab" href="#des-details3">Tags</a>
          </div>
          <div class="tab-content description-review-bottom">
            <div id="des-details1" class="tab-pane active">
              <div class="product-description-wrapper" v-html="product?.description"></div>
            </div>

            <div id="des-details2" class="tab-pane">
              <div class="product-description-wrapper" v-html="product?.detail"></div>
            </div>

            <div id="des-details3" class="tab-pane">
              <div class="product-anotherinfo-wrapper">
                <ul>
                  <li class="categories-title">Tags:</li>
                  <li
                    v-if="product?.product_tags?.length > 0"
                    v-for="(item, index) in product?.product_tags"
                    :key="item.id"
                  >
                    <a class="mr-2" @click="searchByTag(item.tag.id)" >
                      {{ item.tag.name
                      }}<span v-if="product?.product_tags?.length - 1 != index"
                        >,
                      </span></a
                    >
                  </li>

                  <li v-if="product?.product_tags?.length === 0">
                    <u><i>This product has no tags available...</i></u>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-area pb-100">
      <div class="container">
        <div class="product-top-bar section-border mb-35">
          <div class="section-title-wrap">
            <h3 class="section-title section-bg-white">Related Products</h3>
          </div>
        </div>
        <div class="hot-flower owl-carousel product-nav related-products">
          <div
            class="product-grid"
            v-for="item in productsRelated"
            :key="item.id"
          >
            <ProductCard
              v-if="product"
              :product="item"
              @previewProduct="previewProduct"
              @addCart="addCart"
              @showProductPreview="handleShowProductPreview"
            />
          </div>
        </div>
      </div>
    </div>
    <ModelPreviewProduct
      :productPreview="productPreview"
      :showProductPreview="showProductPreview"
      @closePreviewProduct="closePreviewProduct"
      @showSuccessModal="handleShowSuccessModal"
    />
    <SuccessModal v-if="showSuccessModal" @closeModal="handleCloseModal" />
    <!-- Loader -->
    <Loader :isLoading="isLoading"/>
    <!-- End Loader -->
  </div>
</template>
<script>
import { StatusFavotes } from "~/helpers/Constant";
export default {
  layout: "page-detail",
  async asyncData({ $axios, params }) {
    try {
      //PRODUCT
      const resProduct = await $axios.get(`/product/detail/${params.slug}`);
      const product = resProduct?.data?.data;
      const resProductRelated = await $axios.get(
        `/product/related/${product.id}`
      );
      const productsRelated = resProductRelated.data?.data.slice(0, 4);
      // RETURN
      return {
        product: product,
        productsRelated: productsRelated,
      };
    } catch (e) {
      console.log(e);
      return {};
    }
  },

  created() {
    this.$bus.$on("statusCompare", this.statusCompareProduct);
    if (
      this.product.favorites &&
      this.product.favorites[0] &&
      this.product.favorites[0].product_id === this.product.id &&
      this.product.favorites[0].status === StatusFavotes.ACTIVE
    )
      this.isActive = true;
  },
  data() {
    return {
      product: {},
      productPreview: {},
      showSuccessModal: false,
      wishListClicked: [],
      isActive: false,
      numberOrder: 1,
      showProductPreview: false,
      isLoading: true,
      productsRelated: [],
    };
  },
  mounted() {
    this.isLoading = false;
  },
  computed: {
    priceNew() {
      if (this.product?.discount !== null) {
        const discountedPrice =
          (this.product?.price * (100 - this.product?.discount)) / 100;
        return discountedPrice.toFixed(2);
      }
      return this.product?.price;
    },
    statusStock() {
      if (this.product.qty_sold < this.product.qty_import) return "In stock";
      return "Out stock";
    },
    isInStock() {
      if (this.product.qty_sold < this.product.qty_import) {
        return true;
      }
      return false;
    },
    qtyInStock() {
      if (this.product.qty_sold < this.product.qty_import) {
        return this.product.qty_import - this.product.qty_sold;
      }
      return 0;
    },
  },
  methods: {
    async previewProduct(idProduct) {
      this.isLoading = true;
      const resImagePC = await this.$axios.get(
        `image/get-image-pc/${idProduct}`
      );
      this.isLoading = false;
      // PROPS PRODUCT PREVIEW
      let dataImagePC = resImagePC.data.data;
      this.productPreview = dataImagePC.product;
      this.productPreview.colors = dataImagePC.colors;
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
    changeMainImage(imageLink) {
      $(".thumb-main").attr("src", imageLink);
      $(".thumb-main").on("load", () => {
        $(".thumb-main").removeClass("hide");
      });
    },

    toggleAction(productId) {
      this.toggleItemWishlist(productId);
      this.toggleClass();
    },

    toggleItemWishlist(productId) {
      const token = this.$cookies.get("token");
      const remember_me = this.$cookies.get("remember_me");
      if (token || remember_me) {
        this.isLoading = true;
        this.$axios
          .post(`favorite/toggle/${this.product.id}`, {
            product_id: this.product.id,
          })
          .then((res) => {
            if (res.data?.data?.add) {
              this.wishListClicked.push(productId);
              this.isLoading = false;
              this.$toast.success(
                "Thêm '" +
                  this.product.name +
                  "' vào danh sách yêu thích thành công"
              );
            } else {
              const index = this.wishListClicked.indexOf(productId);
              this.wishListClicked.splice(index, 1);
              this.isLoading = false;
              this.$toast.info(
                "Xoá '" +
                  this.product.name +
                  "' khỏi danh sách yêu thích thành công"
              );
            }
          })
          .catch((error) => {
            console.error(error);
            this.isLoading = false;
            this.$toast.error(
              "Thêm sản phẩm vào danh sách yêu thích thất bại, hãy kiểm tra và thực hiện sau giây lát!"
            );
          });
      } else {
        this.isLoading = false;
        this.$toast.error(
          "Thêm sản phẩm vào danh sách yêu thích thất bại, bạn phải đăng nhập trước khi thực hiện!"
        );
      }
    },

    toggleClass() {
      this.isActive = !this.isActive;
    },

    async addCart(idProduct) {
      try {
        const token = this.$cookies.get("token");
        const remember_me = this.$cookies.get("remember_me");
        if (token || remember_me) {
          this.isLoading = true;
          const resAdd = await this.$axios.post(
            `/cart/add/${idProduct}/${this.numberOrder}`
          );
          this.isLoading = false;
          let cart = resAdd?.data?.data?.cart;
          this.$bus.$emit("addProductToCart", idProduct);
          if (cart) {
            this.$emit("showSuccessModal", true);
            this.handleShowSuccessModal();
          } else {
            this.$toast.error(
              "Thêm sản phẩm vào giỏ hàng thất bại, hãy kiểm tra và thử lại sau giây lát!"
            );
          }
        } else {
          this.$toast.error(
            "Thêm sản phẩm vào giỏ hàng thất bại, bạn phải đăng nhập trước khi thực hiện!"
          );
        }
      } catch (error) {
        console.error(error);
      }
    },

    handleShowSuccessModal() {
      this.showSuccessModal = true;
    },
    handleCloseModal() {
      this.showSuccessModal = false;
    },
    handleShowProductPreview() {
      this.showProductPreview = true;
    },
    closePreviewProduct() {
      this.showProductPreview = false;
    },
    searchByCategory(categoryId) {
      this.$router.push({
        path: "/shop-list",
        query: { categoryId: categoryId },
      });
    },
    searchByTag(tagId) {
      this.$router.push({
        path: "/shop-list",
        query: { tagId: tagId },
      });
    },
  },
};
</script>
<style lang="css" scoped>
.owl-carousel {
  display: block;
}

#gallery {
  margin-top: 30px;
}

.list-options-tea li label {
  margin-bottom: 0;
}

.product-dec-slider .slick-slide img,
.product-details-img img {
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

.cart-plus-minus-box {
  width: 70px;
}

.active_favorite {
  background-color: red !important;
  color: #fff !important;
}

.quality-add-to-cart {
  padding: 10px 0;
}

.quality-add-to-cart h4 {
  color: red;
}
</style>
