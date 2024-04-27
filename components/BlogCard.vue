<template>
  <div class="blog-single mb-30">
    <div class="blog-thumb">
      <NuxtLink :to="`post/${blog.id}`"
        ><img :src="`${blog.link}`" alt=""
      /></NuxtLink>
    </div>
    <div class="blog-content pt-25">
      <span class="blog-date">{{ blog.date }}</span>
      <h3>
        <NuxtLink :to="`post/${blog.id}`">
          {{ limitCharacters(blog.title, 55) }}
        </NuxtLink>
      </h3>
      <p v-html="limitCharacters(blog.description, 140)"></p>
      <NuxtLink :to="`post/${blog.id}`">Read More</NuxtLink>
    </div>
  </div>
</template>

<script>
import character from "~/mixins/character";
export default {
  mixins: [character],
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="css" scoped>
.blog-thumb {
  max-height: 600px;
}

img {
  width: 370px;
  height: 350px;
  max-width: 100%;
}
</style>
