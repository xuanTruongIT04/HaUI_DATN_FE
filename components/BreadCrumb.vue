<template>
  <!-- Breadcrumb Area Start -->
  <div class="breadcrumb-area bg-image-3 ptb-150">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h3 class="text-uppercase">{{ breadcrumbTitle }}</h3>
        <ul class="p-0 tpl-ff">
          <li><a href="/">Home</a></li>
          <li class="active text-capitalize">{{ breadcrumbTitle }}</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Breadcrumb Area End -->
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    breadcrumbTitle() {
      return this.title;
    },
  },
};
</script>

<style lang="css">
.tpl-ff {
  font-family: "Lora", serif !important;
}
</style>
