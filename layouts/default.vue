<template>
  <div>
    <Navbar />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/img/favicon.png" },
        { rel: "stylesheet", href: "/css/bootstrap.min.css" },
      ],
      script: [
        { src: "/js/bootstrap.min.js" },
        { src: "/js/owl.carousel.min.js" },
      ],
    };
  },
};
</script>
