<template>
  <div class="banking-overlay" v-if="isModalBankingOpen">
    <div class="banking container">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="create-qr-heading">Tạo QR Code</h2>
        </div>
        <div class="col-sm-6">
          <div class="row text-start info-banking">
            <div class="col-md-12">
            </div>
            <div class="col-lg-12 col-md-12">
              <div class="form-control-a">
                <label for="amount">Số tiền chuyển khoản</label>
                <input
                  type="amount"
                  id="amount"
                  v-model="amountToVNDString"
                  readonly="readonly"
                  disabled
                  class="readonly"
                />
                <span class="amount-string">
                  Thành chữ: <b>{{ currencyAmountString }}</b>
                </span>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-control-a">
                <label for="desc">Nội dung thanh toán</label>
                <input id="desc" type="text" placeholder="Tối đa 150 ký tự" maxlength="150" v-model="desc" />
              </div>
            </div>

            <div class="col-md-12">
              <div class="mb-3 text-center create-qr">
                <button type="submit" class="btn btn-primary create-qr-button" @click.prevent="createQRCode">
                  <i class="fa fa-qrcode" aria-hidden="true"></i>
                  Tạo QR
                </button>
            </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 text-center">
          <div class="row">
            <div class="col-12 mb-2 pl-0 pr-0">
              <div>
                <img class="me-2" style="max-width: 79px;" src="https://qr.sepay.vn/assets/img/banklogo/OCB.png" alt="Ngân hàng TMCP Phương Đông logo">
                <span class="text-truncate">OCB - Ngân hàng TMCP Phương Đông</span>
              </div>
            </div>

            <div class="col-12 qr-code">
              <img v-if="isCreatedNew == false" src="~static/img/checkout/QR-template.png"/>
              <!-- <img v-else :src="'https://qr.sepay.vn/img?acc=' + accountNumber + '&bank=' + bankName + '&amount=' + amountQR + '&des=' + descQR" /> -->
              <img v-else :src="'https://qr.sepay.vn/img?acc=' + accountNumber + '&bank=' + bankName + '&amount=' + 2000 + '&des=' + descQR" />
            </div>

            <div class="info-vendor-account col-12 mt-4">
              <span for="account-name">Chủ tài khoản: <b>{{ accountName }}</b></span>
              <span for="account-number">Số tài khoản: <b>{{ accountNumber }}</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountName: 'NGUYEN XUAN TRUONG',
      accountNumber: 'SEPLOTUS',
      bankName: 'OCB',
      amountQR: "",
      descQR: "CHUYEN KHOAN DEN LOTUS THE SHOP",
      desc: "CHUYEN KHOAN DEN LOTUS THE SHOP",
      isCreatedNew: false,
    };
  },
  props: {
    isModalBankingOpen: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    }
  },
  computed: {
    amountToVND() {
      return (this.amount * 25415).toFixed(0);
    },
    amountToVNDString() {
      return this.formatCurrency(this.amountToVND);
    },
    currencyAmountString() {
      return this.readCurrency(this.amountToVND);
    }
  },
  methods: {
    confirmBanking() {
      this.$emit("confirmBanking");
    },
    cancel() {
      this.$emit("cancel");
    },
    createQRCode() {
      this.isCreatedNew = true;
      this.amountQR = this.amountToVND ?? "";
      this.descQR = this.desc ?? "";
    },
    formatCurrency(amount) {
      const formattedAmount = (amount / 1000).toLocaleString('vi-VN');
      return `${formattedAmount} VND`;
    },
    readCurrency(amount) {
      const units = ['', 'nghìn, ', 'triệu, ', 'tỉ, '];
      const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

      function read3Digits(num) {
        const hundred = Math.floor(num / 100);
        const ten = Math.floor((num % 100) / 10);
        const one = num % 10;

        let result = '';
        if (hundred > 0) {
          result += digits[hundred] + ' trăm, ';
        }

        if (ten > 1) {
          result += digits[ten] + ' mươi ';
          if (one > 0) {
            result += digits[one];
          }
        } else if (ten === 1) {
          result += 'mười ';
          if (one > 0) {
            result += digits[one];
          }
        } else {
          if (one > 0) {
            result += digits[one];
          }
        }

        return result.trim();
      }

      const parts = [];
      while (amount > 0) {
        const threeDigits = amount % 1000;
        amount = Math.floor(amount / 1000);
        parts.push(read3Digits(threeDigits)); // Thêm vào cuối mảng để đảm bảo thứ tự đúng
      }

      let result = '';
      for (let i = 0; i < parts.length; i++) {
        if (parts[i] !== '') {
          result = parts[i] + ' ' + units[i] + ' ' + result;
        }
      }

      return this.capitalizeLetter(result.trim()) + ' đồng';
    },
    capitalizeLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
};
</script>

<style scoped>
.banking-overlay {
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

.banking {
  background-color: #fff;
  padding: 20px 36px !important;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 680px;
  width: 80%;
  margin-bottom: 120px;
}

.banking h3 {
  max-width: 580px;
  margin: 20px auto 30px;
  font-family: "Lora, serif";
  line-height: 31px;
  color: rgb(212, 5, 5);
}

.info-banking {
  margin-top: 60px !important;
}

.create-qr-heading {
  margin-bottom: 32px;
  text-align: center;
  font-family: "Lora, serif";
  font-size: 56px;
  font-weight: 550;
}

.banking-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.banking-buttons button {
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

.banking-buttons button.cancelled {
  background-color: #4672a1;
}

.banking-buttons button:hover {
  background-color: #0056b3;
}

.image-submit-order {
  max-width: 500px;
  height: 300px;
}

.info-vendor-account span{
  display: block;
  font-size: 14px;
  background-color: #6a4b52;
  color: #FFF;
  padding-left: 8px;
  text-align: center;
}

.readonly {
  cursor: not-allowed;
}

.create-qr-button {
  cursor: pointer;
  width: 120px;
  height: 40px;
  border-radius: 4px;
  background-color: #6a4b52;
  color: #FFF;
  transition: 0.2s all linear;
}


.create-qr-button:hover {
  font-weight: 550;
  box-shadow: 0px 0px 10px 1px rgb(0, 0, 0);
}

.create-qr-button i {
  margin-right: 4px;
}

.qr-code img {
  max-width: 340px;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
