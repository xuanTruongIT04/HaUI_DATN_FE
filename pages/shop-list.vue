<template lang="">
  <div>
    <!-- Shop Page Area Start -->
    <div class="shop-page-area ptb-100">
      <div class="container">
        <div class="row flex-row-reverse">
          <div
            class="col-lg-9"
            v-if="paginatedProducts && paginatedProducts.length > 0"
          >
            <div class="shop-topbar-wrapper">
              <div class="shop-topbar-left">
                <ul class="view-mode">
                  <li class="active">
                    <a class="tab-btn" data-view="product-grid"
                      ><i class="fa fa-th"></i
                    ></a>
                  </li>
                  <li>
                    <a class="tab-btn" data-view="product-list"
                      ><i class="fa fa-list-ul"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <div class="product-sorting-wrapper">
                <div class="product-shorting shorting-style">
                  <label>View:</label>
                  <select v-model="pageSize" @change="changePageSize">
                    <option
                      v-for="(option, index) in pageSizeOptions"
                      :value="option"
                      :key="option"
                      :selected="index === 0"
                      v-if="option"
                    >
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="product-show shorting-style">
                  <label>Sort by:</label>
                  <select v-model="orderBy" @change="changeSortOrder">
                    <option value="">Default</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="grid-list-product-wrapper">
              <div class="product-grid product-view pb-20">
                <div class="row">
                  <div
                    class="product-width col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 mb-30"
                    v-for="product in paginatedProducts"
                    :key="product.id"
                  >
                    <ProductCard
                      v-if="product"
                      :product="product"
                      :statusProductCompareLimit="statusProductCompareLimit"
                      :listProductCompare="listProductCompare"
                      @addCart="addCart"
                      @previewProduct="previewProduct"
                      @selectItemCompare="handleProductCompare"
                      @unSelectItemCompare="unHandleProductCompare"
                      @showProductPreview="handleShowProductPreview"
                    />
                  </div>
                </div>
              </div>
              <div class="pagination-total-pages">
                <paginate
                  :page-count="totalPages"
                  :container-class="'pagination-style'"
                  :page-class="'page-item'"
                  :prev-class="'prev-next prev'"
                  :next-class="'prev-next next'"
                  :active-class="'active'"
                  :click-handler="changePage"
                  v-model="currentPage"
                ></paginate>

                <div class="total-pages">
                  <div class="total-pages">
                    <p>
                      Showing {{ startIndex }} - {{ endIndex }} of
                      {{ totalResults }} results
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 text-center border" v-else>
            <img
              src="~static/img/product/empty.jpg"
              alt="Không tồn tại sản phẩm nào"
              style="max-width: 100%"
            />
            <h3 class="text-center text-danger">
              Không tồn tại sản phẩm nào, vui lòng thử lại sau..!
            </h3>
          </div>
          <SidebarFilterProduct
            @priceSatisfied="filterByPrice"
            @listBrandId="filterByBrand"
            @listColorId="filterByColor"
            @tagId="filterByTag"
            @clearAllPCL="clearAllPCL"
            :qtyProductCompare="qtyProductCompare"
          />
        </div>
      </div>
    </div>
    <!-- Shop Page Area End -->
    <!-- Modal -->
    <ModelPreviewProduct
      :productPreview="productPreview"
      :showProductPreview="showProductPreview"
      @closePreviewProduct="closePreviewProduct"
      @showSuccessModal="handleShowSuccessModal"
    />
    <PopupCompare v-if="productsCompare.length > 0" :productsCompare="productsCompare" />
    <SuccessModal v-if="showSuccessModal" @closeModal="handleCloseModal" />
    <!-- Modal end -->
     <!-- Loader -->
    <Loader :isLoading="isLoading"/>
    <!-- End Loader -->
  </div>
</template>
<script>
let Paginate;
if (process.client) {
  Paginate = require("vuejs-paginate");
}

export default {
  layout: "page-detail",
  components: {
    Paginate,
  },
  data() {
    return {
      productPreview: {},
      allProducts: [],
      products: [],
      currentPage: 1,
      pageSize: 12,
      orderBy: "",
      selectedCategory: null,
      priceRange: [],
      selectedBrands: [],
      selectedColors: [],
      selectedTag: null,
      listProductCompare: [],
      statusProductCompareLimit: false,
      qtyProductCompareLimit: 2,
      productsCompare: [],
      showSuccessModal: false,
      showProductPreview: false,
      isLoading: true,
      categoryId: null,
      allCategories: {},
    };
  },

  async asyncData({ $axios, query }) {
    const resProduct = await $axios.get("/product/list");
    const productTemps = resProduct.data.data?.filter(
      (product) => product?.images.length > 0
    );
    let allProducts = productTemps.length ? productTemps : [];
    // Handle filter category
    let categoryId = query.categoryId;
    let products = [];
    if (categoryId) {
      products = allProducts.filter(
        (product) => product.category_id === parseInt(categoryId)
      );
    } else {
      products = allProducts;
    }

    // Handle filter tag
    let tagId = query.tagId;
    if (tagId) {
      products = allProducts.filter((product) => {
        return product.product_tags.some((item) => item?.tag_id == tagId);
      });
    } else {
      products = allProducts;
    }

    return {
      allProducts: allProducts,
      products: products,
    };
  },

  created() {
    this.$bus.$on("categorySelected", this.filterWithCategory);
    if (this.listProductCompare.length === 0) {
      this.listProductCompare =
        this.$localStorage.getArray("listProductCompare");
    }

    if (this.listProductCompare.length === this.qtyProductCompareLimit)
      this.statusProductCompareLimit = true;
  },

  mounted() {
    this.isLoading = false;
    this.$axios
      .get("/category/tree-list")
      .then((res) => {
        this.allCategories = res?.data;
      })
      .catch((e) => {
        console.error(e);
      });
  },

  methods: {
    async previewProduct(idProduct) {
      this.isLoading = true;
      const resImagePC = await this.$axios.get(
        `image/get-image-pc/${idProduct}`
      );
      this.isLoading = false;
      let dataImagePC = resImagePC.data.data;
      this.productPreview = dataImagePC.product;
      this.productPreview.colors = dataImagePC.colors;
    },

    changePage(page) {
      this.currentPage = page;
    },

    returnCurrentPage() {
      this.currentPage = 1;
    },

    changePageSize() {
      this.returnCurrentPage();
    },

    changeSortOrder() {
      if (this.orderBy === "name") {
        if (this.totalResults > 0) {
          this.products.sort((a, b) => a.name.localeCompare(b.name));
        }
      } else if (this.orderBy === "price") {
        if (this.totalResults > 0) {
          this.products.sort((a, b) => a.price - b.price);
        }
      }
      this.returnCurrentPage();
    },

    filterWithCategory(idCategory) {
      try {
        this.selectedCategory = idCategory;
        this.applyFilters();
        this.returnCurrentPage();
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
      }
    },

    filterByPrice(priceRange) {
      try {
        this.priceRange = priceRange;
        this.applyFilters();
        this.returnCurrentPage();
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
      }
    },

    filterByBrand(listBrandId) {
      try {
        this.selectedBrands = listBrandId;
        this.applyFilters();
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
      }
    },

    filterByColor(listColorId) {
      try {
        this.selectedColors = listColorId;
        this.applyFilters();
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
      }
    },

    filterByTag(idTag) {
      try {
        this.selectedTag = idTag;
        this.applyFilters();
        this.returnCurrentPage();
      } catch (error) {
        console.error("Lỗi xảy ra:", error);
      }
    },

    applyFilters() {
      let filteredProducts = this.allProducts;
      if (this.selectedCategory) {
        let parentCatId = this.allCategories.filter(
          (item) =>
            item.id === this.selectedCategory ||
            item.parent_id === this.selectedCategory
        );
        if (parentCatId.length > 0) {
          filteredProducts = filteredProducts.filter((product) => {
            return this.allCategories.some(
              (category) =>
                category.id === product.category_id ||
                category.children.some(
                  (item) => item.id === product.category_id
                )
            );
          });
        } else {
          filteredProducts = filteredProducts.filter(
            (product) => product.category_id === this.selectedCategory
          );
        }
      }

      if (this.priceRange.length > 0) {
        const minValue = this.priceRange[0];
        const maxValue = this.priceRange[1];
        filteredProducts = filteredProducts.filter((product) => {
          const productPrice = product.price;
          return productPrice >= minValue && productPrice <= maxValue;
        });
      }

      if (this.selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          this.selectedBrands.includes(product?.brand_id)
        );
      }

      if (this.selectedColors.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          product.images.some((image) =>
            this.selectedColors.includes(image.color_id)
          )
        );
      }

      if (this.selectedTag) {
        filteredProducts = filteredProducts.filter((product) =>
          product.product_tags.some((tag) => tag.tag_id === this.selectedTag)
        );
      }

      this.products = filteredProducts;
      this.returnCurrentPage();
    },

    handleProductCompare(idProduct) {
      // With Limit Quantity Is 2

      if (this.listProductCompare.length <= this.qtyProductCompareLimit) {
        this.listProductCompare.push(idProduct);
        this.$localStorage.addItemToArray("listProductCompare", idProduct);
      }
      if (this.listProductCompare.length === 0) {
        this.listProductCompare =
          this.$localStorage.getArray("listProductCompare");
      }

      if (this.listProductCompare.length >= this.qtyProductCompareLimit) {
        this.statusProductCompareLimit = true;
      }
      this.dataProductsCompare();
    },

    unHandleProductCompare(idProduct) {
      const index = this.listProductCompare.indexOf(idProduct);
      // Delete from reactive property
      if (index !== -1) {
        this.listProductCompare.splice(index, 1);
      }
      // Delete from local storage
      this.$localStorage.removeItemFromArray("listProductCompare", idProduct);
      if (
        this.listProductCompare.length < this.qtyProductCompareLimit ||
        this.$localStorage.getItem("listProductCompare").length ===
          this.qtyProductCompareLimit
      )
        this.statusProductCompareLimit = false;
    },

    clearAllPCL() {
      this.listProductCompare = [];
      this.$localStorage.removeItem("listProductCompare");
      this.$localStorage.setItem("statusProductCompareLimit", false);
      this.statusProductCompareLimit = false;
    },

    dataProductsCompare() {
      this.productsCompare = this.allProducts.filter((product) => {
        const images = product.images;
        const levelZeroImage = images.find((image) => image.level === 0);
        if (levelZeroImage) {
          product.images = [levelZeroImage];
        } else {
          const levelOneImage = images.find((image) => image.level === 1);
          product.images = [levelOneImage];
        }
        return this.listProductCompare.includes(product.id);
      });
    },

    async addCart(idProduct, numberOrder = 1) {
      try {
        const token = this.$cookies.get("token");
        const remember_me = this.$cookies.get("remember_me");
        if (token || remember_me) {
          this.isLoading = true;
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

  computed: {
    //  Paginate
    totalResults() {
      if (this.products) {
        return this.products.length;
      }
      return 0;
    },

    startIndex() {
      return (this.currentPage - 1) * this.pageSize + 1;
    },

    endIndex() {
      const endIndex = this.currentPage * this.pageSize;
      return Math.min(endIndex, this.totalResults);
    },

    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      if (this.totalResults > 0) {
        return this.products.slice(start, end);
      }
      return [];
    },

    totalPages() {
      return Math.ceil(this.totalResults / this.pageSize);
    },

    pageSizeOptions() {
      const step = Math.ceil(this.totalResults / 4);
      const start = Math.ceil(this.totalResults / 10);
      const end = this.totalResults;
      const options = [];
      if (end != 0) {
        for (let i = start; i <= end; i += step) {
          options.push(i);
        }
      }
      return options;
    },

    qtyProductCompare() {
      return this.listProductCompare.length;
    },
  },
};
</script>
<style lang="css" scoped>
.tab-btn:hover {
  cursor: pointer;
}

.tab-btn:hover i {
  color: #519f10;
}
</style>
