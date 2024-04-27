<template>
  <div>
    <Navbar />
    <BreadCrumb :title="titleBreadCrumbCP" />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import globalMixin from "~/mixins/global";
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
        { src: "/js/vendor/modernizr-2.8.3.min.js", defer: true },
        { src: "/js/vendor/jquery-1.12.0.min.js", defer: true },
        { src: "/js/popper.js", defer: true },
        { src: "/js/bootstrap.min.js", defer: true },
        { src: "/js/imagesloaded.pkgd.min.js", defer: true },
        { src: "/js/isotope.pkgd.min.js", defer: true },
        { src: "/js/ajax-mail.js", defer: true },
        { src: "/js/owl.carousel.min.js", defer: true },
        { src: "/js/plugins.js", defer: true },
        { src: "/js/main.js", defer: true },
      ],
    };
  },
  mixins: [globalMixin],
  data() {
    return {
      titleBreadCrumb: "",
    };
  },
  watch: {
    $route(to, from) {
      this.titleBreadCrumb = this.getTitleBreadCrumb();
    },
  },
  mounted() {
    this.titleBreadCrumb = this.getTitleBreadCrumb();

    this.$nuxt.$on("titleBreadCrumb", ($event) => {
      this.titleBreadCrumb = $event;
    });
  },
  computed: {
    titleBreadCrumbCP() {
      return this.titleBreadCrumb;
    },
  },
};
</script>
