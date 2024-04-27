<template lang="html">
  <div class="slider-area" v-if="slides.length">
    <div class="slider-active owl-dot-style owl-carousel">
      <div
        class="single-slider ptb-240 bg-img"
        :style="`background-image: url(${slide.link})`"
        v-for="slide in slides"
        :key="slide.id"
      >
        <div class="container">
          <div class="slider-content slider-animated-1">
            <h1 class="animated">
              {{ slide.firstHalf }} <span class="theme-color">{{ slide.lastWordFH }}</span>
            </h1>
            <h1 class="animated">{{ slide.secondHalf }}</h1>
            <p>
              {{ slide.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.slides.forEach((slide) => {
      const words = slide.name.split(" ");
      const halfCount = Math.ceil(words.length / 2);
      slide.firstHalf = words.slice(0, halfCount - 1).join(" ");
      slide.secondHalf = words.slice(halfCount).join(" ");
      slide.lastWordFH = words[halfCount - 1];
    });
  },
};

</script>

<style lang=""></style>
