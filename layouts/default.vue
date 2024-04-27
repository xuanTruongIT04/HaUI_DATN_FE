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
        { rel: "stylesheet", href: "/css/animate.css" },
        { rel: "stylesheet", href: "/css/owl.carousel.min.css" },
        { rel: "stylesheet", href: "/css/owl.theme.default.min.css" },
        { rel: "stylesheet", href: "/css/slick.css" },
        { rel: "stylesheet", href: "/css/chosen.min.css" },
        { rel: "stylesheet", href: "/css/font-awesome.min.css" },
        { rel: "stylesheet", href: "/css/themify-icons.css" },
        { rel: "stylesheet", href: "/css/ionicons.min.css" },
        { rel: "stylesheet", href: "/css/jquery-ui.css" },
        { rel: "stylesheet", href: "/css/meanmenu.min.css" },
        { rel: "stylesheet", href: "/css/style.css" },
        { rel: "stylesheet", href: "/css/responsive.css" },
      ],
      script: [
        { src: "/js/vendor/modernizr-2.8.3.min.js" },
        { src: "/js/vendor/jquery-1.12.0.min.js" },
        { src: "/js/popper.js" },
        { src: "/js/bootstrap.min.js" },
        { src: "/js/imagesloaded.pkgd.min.js" },
        { src: "/js/isotope.pkgd.min.js" },
        { src: "/js/ajax-mail.js" },
        { src: "/js/owl.carousel.min.js" },
        { src: "/js/plugins.js" },
        { src: "/js/main.js" },
      ],
    };
  },
};
</script>
