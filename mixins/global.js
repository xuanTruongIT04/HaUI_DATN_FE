import { PaymentMethod, StatusOrder } from '~/helpers/Constant';
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
    convertUSDToVND(number, suffix = ' VND') {
      const exchangeRate = 25450.0;
      if (number !== null && number !== undefined) {
        const formattedNumber = (number * exchangeRate).toLocaleString('vi') + suffix;
        return formattedNumber;
      } else {
        return "<span class='text-muted'>Chưa cập nhật</span>";
      }
    },

    getPaymentMethodText(typePaymentMethod) {
      return PaymentMethod[typePaymentMethod] || 'Phương thức thanh toán không xác định';
    },

    getStatusOrderText(statusOrder) {
      return StatusOrder[statusOrder] || 'Trạng thái đơn hàng không xác định';
    }

  },
};

