<template lang="">
  <div class="product-top-bar section-border mb-55">
    <div class="section-title-wrap text-center">
      <h3 class="section-title">{{ title }}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang=""></style>
