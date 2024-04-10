<template lang="">
  <div class="col-lg-3">
    <div class="shop-sidebar-wrapper gray-bg-7 shop-sidebar-mrg" v-if="!isLoadingSpinner">
      <div class="shop-widget">
        <h4 class="shop-sidebar-title">Shop By Categories</h4>
        <div class="shop-catigory">
          <ul id="faq">
            <MenuItem
              v-for="category in allCategories"
              :key="category.id"
              :category="category"
            />
          </ul>
        </div>
      </div>
      <!-- Start Slide range -->
      <div class="shop-price-filter mt-40 shop-sidebar-border pt-35">
        <h4 class="shop-sidebar-title">Price Filter</h4>
        <div class="price_filter mt-25">
          From $0 to ${{ maxPrice }}
          <vue-slider
            v-if="isDataLoaded"
            :min="0"
            :max="maxPrice"
            :value="priceValueCurrent"
            :interval="100"
            @change="handleSlideChange"
          ></vue-slider>
          <div class="price_slider_amount">
            <div class="label-input">
              <input
                type="text"
                id="amount"
                name="price"
                placeholder="Drag and drop to filter"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- End Slide range -->
      <div class="shop-widget mt-40 shop-sidebar-border pt-35">
        <h4 class="shop-sidebar-title">By Brand</h4>
        <div class="sidebar-list-style mt-20">
          <ul>
            <li v-for="brand in allBrands" :key="brand.id">
              <input
                type="checkbox"
                :id="'brand' + brand.id"
                @change="filterByBrand(brand.id)"
              />
              <label :for="'brand' + brand.id">{{ brand.name }}</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="shop-widget mt-40 shop-sidebar-border pt-35">
        <h4 class="shop-sidebar-title">By Color</h4>
        <div class="sidebar-list-style mt-20">
          <ul>
            <li
              v-for="color in allColors"
              :key="color.id"
              @change="filterByColor(color.id)"
            >
              <input type="checkbox" :id="'color' + color.id" />
              <label :for="'color' + color.id">{{ color.name }}</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="shop-widget mt-40 shop-sidebar-border pt-35">
        <h4 class="shop-sidebar-title">Compare Products</h4>
        <div class="compare-product">
          <p>You have {{ qtyProductCompare }} item to compare.</p>
          <div class="compare-product-btn">
            <span class="clear-all mt-2 d-inline-block" @click="clearAll()">Clear all</span>
            <a
              v-if="statusCompare && qtyProductCompare === 2"
              @click.prevent="openPopup()"
              tooltip="You have to choose 2 products!"
              title="You have to choose 2 products!"
              class="action-compare preview-product"
              data-target="#compareModel"
              data-toggle="modal"
              >Compare
              <i class="fa fa-check"></i>
            </a>
            <a
              v-else
              class="select-to-compare"
              @click.prevent="compareProduct()"
              tooltip="You have to choose 2 products to compare!"
              title="You have to choose 2 products to compare!"
              >Select to compare <i class="fa fa-hand-pointer-o"></i
            ></a>
          </div>
        </div>
      </div>
      <div class="shop-widget mt-40 shop-sidebar-border pt-35">
        <h4 class="shop-sidebar-title">Popular Tags</h4>
        <div class="shop-tags mt-25">
          <ul>
            <li
              v-for="tag in allTags"
              :key="tag.id"
              :class="{ active_tag: tag.id === activeTagId }"
              @click="filterByTag(tag.id, tag)"
            >
              <span>{{ tag.name }}</span>
            </li>
          </ul>
            <span @click="clearTag" class="clear-tag">Clear</span>
        </div>
      </div>
    </div>
    <div class="shop-sidebar-wrapper gray-bg-7 shop-sidebar-mrg" v-else>
      <Spinner v-if="isLoadingSpinner" />
    </div>
  </div>
</template>

<script>
import Popup from "~/components/PopupCompare.vue";
export default {
  components: {
    VueSlider: process.client
      ? () =>
        Promise.all([
          import("vue-slider-component"),
          import("vue-slider-component/theme/default.css"),
        ]).then(([module]) => module.default)
      : null,
    Popup,
  },
  props: {
    qtyProductCompare: Number,
  },
  data() {
    return {
      allCategories: [],
      allBrands: [],
      allColors: [],
      allTags: [],
      isDataLoaded: false,
      isLoadingSpinner: true,
      maxPrice: 3000,
      priceValueCurrent: [0, 3000],
      selectedBrands: [],
      selectedColors: [],
      activeTagId: null,
      statusCompare: false,
    };
  },
  async created() {
    await this.fetchData();
    this.isDataLoaded = true;
    this.isLoadingSpinner = false;
  },
  methods: {
    handleSlideChange(value) {
      const minValue = value[0];
      const maxValue = value[1];
      const amountprice = document.getElementById("amount");
      amountprice.value = "$" + minValue + " - $" + maxValue;
      // Send emit up
      const priceSatisfied = [minValue, maxValue];
      this.$emit("priceSatisfied", priceSatisfied);
    },
    async fetchData() {
      try {
        this.$bus.$emit("isLoading3Dot", true);
        const [resCategories, resBrands, resColors, resTags, resMMPrice] =
          await Promise.all([
            this.$axios.get("/category/tree-list"),
            this.$axios.get("/brand/list"),
            this.$axios.get("/color/list"),
            this.$axios.get("/tag/list-popular"),
            this.$axios.get("/product/get-max-min-price"),
          ]);
        this.$bus.$emit("isLoading3Dot", false);

        let maxPrice = 3000;
        if (resMMPrice.data?.data?.max_price > 3000) {
          maxPrice = resMMPrice.data?.data?.max_price;
        }

        this.priceValueCurrent[1] = Math.ceil(maxPrice);
        this.allCategories = resCategories.data;
        this.allBrands = resBrands.data?.data;
        this.allColors = resColors.data?.data;
        this.allTags = resTags.data?.data?.slice(0, 5);
        this.maxPrice = maxPrice;
      } catch (error) {
        this.$bus.$emit("isLoading3Dot", false);
        console.error(error);
      }
    },
    filterByBrand(id) {
      const index = this.selectedBrands.indexOf(id);
      if (index === -1) {
        this.selectedBrands.push(id);
      } else {
        this.selectedBrands.splice(index, 1);
      }
      this.$emit("listBrandId", this.selectedBrands);
    },
    filterByColor(id) {
      const index = this.selectedColors.indexOf(id);
      if (index === -1) {
        this.selectedColors.push(id);
      } else {
        this.selectedColors.splice(index, 1);
      }
      this.$emit("listColorId", this.selectedColors);
    },
    filterByTag(id) {
      this.activeTagId = null;
      if (!this.activeTagId) {
        this.activeTagId = id;
        this.$emit("tagId", id);
      } else {
        this.activeTagId = null;
        this.$emit("tagId", null);
      }
    },
    compareProduct() {
      this.statusCompare = !this.statusCompare;
      this.$bus.$emit("statusCompare", this.statusCompare);
    },
    clearAll() {
      this.$emit("clearAllPCL");
      this.$localStorage.removeItem("listProductCompare");
    },
    clearTag() {
      this.$emit("tagId", null);
      this.activeTagId = null;
    },
    openPopup() {
      this.$emit("openPopup", true);
    },
  },
};
</script>

<style lang="css" scoped>
.active_tag {
  border: 1px solid #519f10;
  background-color: #519f10;
  outline: none;
  border: none;
}

.compare-product-btn a,
.active_tag span {
  color: #fff;
}

.clear-tag:hover {
  cursor: pointer;
}

.compare-product-btn a:hover,
.select-to-compare:hover {
  cursor: pointer;
}

.select-to-compare {
  color: #fff !important;
  background: rgba(0, 128, 0, 0.473);
}

.clear-all {
  transition: all 0.15s linear;
}

.clear-all:hover {
  cursor: pointer;
  background-color: #ccc;
  color: #000;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 2px;
}
</style>
