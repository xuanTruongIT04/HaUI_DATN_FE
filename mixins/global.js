export default {
  methods: {
    getTitleBreadCrumb() {
      const path = this.$nuxt.$route.path;
      const parts = path.split("/").filter(part => !!part);

      const lastPart = parts[parts.length - 1];
      const isNumber = !isNaN(lastPart);

      const processedLastPart = isNumber ? lastPart : lastPart.replace(/-/g, " ");

      if (isNumber || processedLastPart.length > 50) {
        return (parts.length > 1) ? parts.slice(0, -1).join(" ") : processedLastPart;
      } else {
        return processedLastPart;
      }
    },
    briefName(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      } else {
        return text.slice(0, maxLength) + "...";
      }
    },
  },
};

