<template>
  <div class="comfirm-overlay" v-if="isModalOpen">
    <div class="comfirm">
      <img
        src="~static/img/product/confirm-order.png"
        alt="Attention icon"
        class="image-submit-order"
      />
      <h3>{{ message }}</h3>
      <div class="comfirm-buttons">
        <button class="cancelled" @click="cancel">Tạm huỷ</button>
        <button @click="confirm">Xác nhận</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.comfirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.comfirm {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 680px;
  width: 80%;
  margin-bottom: 120px;
}

.comfirm h3 {
  max-width: 580px;
  margin: 20px auto 30px;
  font-family: "Lora, serif";
  line-height: 31px;
  color: rgb(212, 5, 5);
}

.comfirm-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.comfirm-buttons button {
  margin: 0 20px;
  padding: 12px 24px;
  font-size: 15px;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

.comfirm-buttons button.cancelled {
  background-color: #4672a1;
}

.comfirm-buttons button:hover {
  background-color: #0056b3;
}

.image-submit-order {
  max-width: 500px;
  height: 300px;
}
</style>
