<template lang="">
  <div>
    <!-- Slider Start -->
    <SectionSlider :slides="slides" />
    <!--Slider End -->
    <!-- Product Area Start -->
    <div class="product-area bg-image-1 pt-100 pb-95" v-if="products.length">
      <div class="container">
        <div
          class="featured-product-active hot-flower owl-carousel product-nav"
        >
          <div
            class="product-grid"
            v-for="product in products"
            :key="product.id"
          >
            <ProductCard
              v-if="product"
              :product="product"
              @previewProduct="previewProduct"
              @addCart="addCart"
              @showProductPreview="handleShowProductPreview"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Product Area End -->
    <!-- Banner Start -->
    <div class="banner-area pt-100 pb-70">
      <div class="container">
        <div class="banner-wrap">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="single-banner img-zoom mb-30">
                <a>
                  <img src="~/static/img/banner/banner-1.png" alt="" />
                </a>
                <div class="banner-content">
                  <h4>-15% Sale</h4>
                  <h5>Summer Vacation</h5>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="single-banner img-zoom mb-30">
                <a>
                  <img src="~/static/img/banner/banner-2.png" alt="" />
                </a>
                <div class="banner-content">
                  <h4>-14% Sale</h4>
                  <h5>Winter Vacation</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Banner End -->
    <!-- New Products Start -->
    <div class="product-area gray-bg pt-90 pb-65">
      <div class="container">
        <SectionTitle title="New Products" />
        <div class="tab-content jump">
          <div class="tab-pane active">
            <div class="featured-product-active owl-carousel product-nav">
              <div
                class="product-wrapper-single"
                v-for="product in productsLatest"
                :key="product.id"
              >
                <div class="product-grid mb-30">
                  <ProductCard
                    v-if="product"
                    :product="product"
                    @previewProduct="previewProduct"
                    @addCart="addCart"
                    @showProductPreview="handleShowProductPreview"
                  />
                </div>
              </div>
            </div>

            <div class="featured-product-active owl-carousel product-nav">
              <div
                class="product-wrapper-single"
                v-for="product in productsLatestNext"
                :key="product.id"
              >
                <div class="product-grid mb-30">
                  <ProductCard
                    v-if="product"
                    :product="product"
                    @previewProduct="previewProduct"
                    @addCart="addCart"
                    @showProductPreview="handleShowProductPreview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- New Products End -->
    <!-- Testimonial Area Start -->
    <div class="testimonials-area bg-img pt-100 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <div class="testimonial-active owl-carousel">
              <div class="single-testimonial text-center">
                <div class="testimonial-img">
                  <img alt="" src="~/static/img/icon-img/testi.png" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisici elit, sed do
                  eiusmod tempor incididunt ut labore
                </p>
                <h4>Gregory Perkins</h4>
                <h5>Customer</h5>
              </div>
              <div class="single-testimonial text-center">
                <div class="testimonial-img">
                  <img alt="" src="~/static/img/icon-img/testi.png" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisici elit, sed do
                  eiusmod tempor incididunt ut labore
                </p>
                <h4>Khabuli Teop</h4>
                <h5>Marketing</h5>
              </div>
              <div class="single-testimonial text-center">
                <div class="testimonial-img">
                  <img alt="" src="~/static/img/icon-img/testi.png" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisici elit, sed do
                  eiusmod tempor incididunt ut labore
                </p>
                <h4>Lotan Jopon</h4>
                <h5>Admin</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Testimonial Area End -->
    <!-- News Area Start -->
    <div class="blog-area bg-image-1 pt-90 pb-70" v-if="postLatest.length">
      <div class="container"><SectionTitle title="Latest News" /></div>
      <div class="container">
        <div class="row">
          <div
            class="col-lg-4 col-md-6"
            v-for="post in postLatest"
            :key="post.id"
          >
            <BlogCard v-if="post" :blog="post" />
          </div>
        </div>
      </div>
    </div>
    <!-- News Area End -->
    <!-- Newsletter Area Start -->
    <div class="newsletter-area bg-image-2 pt-90 pb-100">
      <div class="container">
        <SectionTitle title="Join to our Newsletter" />
      </div>
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-lg-6 col-md-10 col-md-auto">
            <div class="footer-newsletter">
              <div id="mc_embed_signup" class="subscribe-form">
                <form
                  action="http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  class="validate"
                  target="_blank"
                  novalidate
                >
                  <div id="mc_embed_signup_scroll" class="mc-form">
                    <input
                      type="email"
                      value=""
                      name="EMAIL"
                      class="email"
                      placeholder="Your Email Address*"
                      required
                    />
                    <div class="mc-news" aria-hidden="true">
                      <input
                        type="text"
                        name="b_6bbb9b6f5827bd842d9640c82_05d85f18ef"
                        tabindex="-1"
                        value=""
                      />
                    </div>
                    <div class="submit-button">
                      <input
                        type="submit"
                        value="Subscribe"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        class="button"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Newsletter Araea End -->
    <!-- Modal -->
    <ModelPreviewProduct
      :productPreview="productPreview"
      :showProductPreview="showProductPreview"
      @closePreviewProduct="closePreviewProduct"
      @showSuccessModal="handleShowSuccessModal"
    />
    <SuccessModal v-if="showSuccessModal" @closeModal="handleCloseModal" />
    <!-- Modal end -->
      <!-- Loader -->
    <Loader :isLoading="isLoading"/>
    <!-- End Loader -->
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      //SLIDE
      const resSlide = await $axios.get("/slide/list");
      //PRODUCT
      const resProduct = await $axios.get("/product/list");
      const products = resProduct.data.data?.filter(
        (product) => product?.images.length > 0
      );

      //PRODUCT LATEST
      const resProductLatest = await $axios.get("/product/list-latest");
      const productsLatest = resProductLatest.data.data?.filter(
        (product) => product?.images.length > 0
      );

      // POST LATEST
      const resPostLatest = await $axios.get("/post/list-latest");
      // RETURN
      return {
        slides: resSlide.data.data,
        allProducts: products.length ? products : [],
        products: products.length ? products.slice(0, 8) : [],
        productsLatest: productsLatest.length ? productsLatest.slice(0, 8) : [],
        productsLatestNext: productsLatest.length
          ? productsLatest.slice(7, 16)
          : [],
        postLatest: resPostLatest.data.data.length
          ? resPostLatest.data.data.slice(0, 6)
          : [],
      };
    } catch (e) {
      console.log(e);
      return {};
    }
  },
  data() {
    return {
      slides: [],
      products: [],
      productsLatest: [],
      productsLatestNext: [],
      postLatest: [],
      productPreview: {},
      showSuccessModal: false,
      showProductPreview: false,
      isLoading: true,
    };
  },

  mounted() {
    this.isLoading = false;
  },

  methods: {
    async previewProduct(idProduct) {
      try {
        this.isLoading = true;
        const resImagePC = await this.$axios.get(
          `image/get-image-pc/${idProduct}`
        );
        this.isLoading = false;
        // PROPS PRODUCT PREVIEW
        let dataImagePC = resImagePC.data.data;
        this.productPreview = dataImagePC.product;
        this.productPreview.colors = dataImagePC.colors;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
    async addCart(idProduct, numberOrder = 1) {
      try {
        this.isLoading = true;
        const token = this.$cookies.get("token");
        const remember_me = this.$cookies.get("remember_me");
        if (token || remember_me) {
          const resAdd = await this.$axios.post(
            `/cart/add/${idProduct}/${numberOrder}`
          );
          this.isLoading = false;
          let cart = resAdd?.data?.data?.cart;
          this.$bus.$emit("addProductToCart", idProduct);
          if (cart) {
            this.handleShowSuccessModal();
          } else {
            this.isLoading = false;
            this.$toast.error(
              "Thêm sản phẩm vào giỏ hàng thất bại, hãy kiểm tra và thử lại sau giây lát!"
            );
          }
        } else {
          this.isLoading = false;
          this.$toast.error(
            "Thêm sản phẩm vào giỏ hàng thất bại, bạn phải đăng nhập trước khi thực hiện!"
          );
        }
      } catch (error) {
        this.isLoading = false;
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
  },
};
</script>

<style lang="css" scoped>
.owl-carousel {
  display: block;
}
</style>
