<template>
  <li>
    <a data-toggle="collapse" :href="'#shop-category-' + category.id" @click="selectCategory(category.id)">
      {{ category.title }}
      <i class="ion-ios-arrow-down" v-if="category.children && category.children.length">
      </i>
    </a>
    <ul :id="'shop-category-' + category.id" class="panel-collapse collapse">
      <MenuItem v-for="childCategory in category.children" :key="childCategory.id" :category="childCategory" />
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectCategory(categoryId) {
      this.$bus.$emit("categorySelected", categoryId);
    },
  },
};
</script>

<style scoped></style>
