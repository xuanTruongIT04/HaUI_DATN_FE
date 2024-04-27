<template>
  <transition name="modal-fade">
    <div class="success-modal">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="icon-container">
          <div class="tick"></div>
        </div>
        <h3 class="title">THÀNH CÔNG!</h3>
        <div class="message">
          Chúc mừng bạn đã thêm sản phẩm vào giỏ hàng thành công
        </div>
        <div class="button-container">
          <button class="continue-button" @click="continueShopping">
            Mua tiếp
          </button>
          <button class="cart-button" @click="goToCart">Giỏ hàng</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    continueShopping() {
      this.$emit("closeModal");
    },
    goToCart() {
      this.$router.push("/cart-page");
    },
  },
};
</script>

<style scoped>
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98;
}

.modal-content {
  background-color: rgba(252, 252, 255, 1);
  padding: 0 40px 40px;
  text-align: center;
  border-radius: 20px;
  width: 570px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.3);
  bottom: 10%;
  z-index: 99;
  animation: fadeIn 0.3s;
}

.title {
  margin-bottom: 20px;
}

.tick {
  width: 130px;
  height: 140px;
  background-image: url("~static/img/product/icon-success-order.gif");
  background-repeat: no-repeat;
  background-size: contain;
  margin: 10px auto;
  animation-duration: 0.0002s;
}

.message {
  font-size: 20px;
  margin-bottom: 46px;
  color: #333;
  margin-top: 8px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.continue-button,
.cart-button {
  padding: 12px 36px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.continue-button {
  margin-right: 20px;
  background-color: #27ae60;
  color: #fff;
  margin-right: 20px;
}

.cart-button {
  background-color: #2980b9;
  color: #fff;
  margin-left: 20px;
}

.continue-button:hover,
.cart-button:hover {
  background-color: #1d8348;
}

button:focus {
  outline: none;
}

.modal-fade-enter-active {
  animation: fadeIn 0.3s;
}

.modal-fade-leave-active {
  animation: fadeOut 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
