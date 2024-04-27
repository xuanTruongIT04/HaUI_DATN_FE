<template>
  <div>
    <div
      v-if="hasBillData"
      class="section"
      id="order-success"
      style="font-family: 'Montserrat', sans-serif"
    >
      <div class="section-head">
        <p class="mess-order">
          <img
            class="img-alert"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1024px-Flat_tick_icon.svg.png"
            alt=""
          />
          <span>Đặt hàng thành công!</span>
        </p>
        <p>Cảm ơn quý khách đã đặt hàng tại hệ thống <b>Lotus Thé Shop</b>!</p>
        <p>
          Nhân viên chăm sóc <b>Lotus Thé Shop</b> sẽ liên hệ tới bạn sớm nhất có
          thể.
        </p>
      </div>
      <div class="section-detail mt-5">
        <h2 class="code_order" style="font-family: 'Montserrat', sans-serif">
          Mã đơn hàng: {{ bill.order.code }}
        </h2>
        <h3 class="info-customer">Thông tin khách hàng</h3>
        <table class="table table-border mt-1">
          <thead class="thead">
            <tr>
              <td>Họ KH</td>
              <td>Tên KH</td>
              <td>Số điện thoại</td>
              <td>Email</td>
              <td>Địa chỉ</td>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr class="center-vertical">
              <td>{{ bill.user.last_name }}</td>
              <td>{{ bill.user.first_name }}</td>
              <td>{{ bill.user.phone }}</td>
              <td>{{ bill.user.email }}</td>
              <td>{{ bill.order.address_delivery }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="section-detail mt-5">
        <h3 class="info-customer">Sản phẩm đã mua</h3>
        <table class="table table-border product-bought mt-1">
          <thead class="thead">
            <tr>
              <td>STT</td>
              <td>Ảnh sản phẩm</td>
              <td>Tên sản phẩm</td>
              <td>Giá sản phẩm</td>
              <td>Số lượng</td>
              <td>Thành tiền</td>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="(detailCart, index) in bill.order.cart.detail_carts"
              :key="index"
              class="center-vertical"
            >
              <td>{{ index + 1 }}</td>
              <td class="image-product-order">
                <img
                  :src="detailCart.product.mainImage"
                  :alt="detailCart.product.name"
                />
              </td>
              <td>{{ detailCart.product.name }}</td>
              <td>{{ detailCart.product.price_sale }}</td>
              <td>{{ detailCart.product.quantity }}</td>
              <td>${{ detailCart.product.subTotal }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="total-price">Giảm:</td>
              <td>-${{ pricePromotion }}</td>
            </tr>
          </tbody>
          <tfoot class="tfoot">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="total-price">Tổng:</td>
              <td>${{ bill.order.total_mount }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div id="order-end" class="end-order">
        <p>
          Trước khi giao hàng, nhân viên sẽ gọi quý khách để xác nhận thông tin
          đơn hàng.
        </p>
        <p>
          Khi cần trợ giúp vui lòng gọi cho chúng tôi vào hotline:
          <a href="tel:0374993702"><i>0374.993.702</i></a>
        </p>
        <a href="/" class="home">về trang chủ</a>
        <a href="https://mail.google.com/" class="btn-check-mail"
          >Kiểm tra email</a
        >
      </div>
    </div>

    <div
      v-else
      class="section"
      id="order-failed"
      style="font-family: 'Montserrat', sans-serif"
    >
      <div class="section-head">
        <p class="mess-order">
          <img
            style="opacity: 0.7"
            class="img-alert"
            src="~static/img/product/sign-x.png"
            alt=""
          />
          <span>Đặt hàng thất bại!</span>
        </p>
        <p style="margin-bottom: 6px">
          <b>Lotus Thé Shop</b> rất hân hạnh khi được phục vụ quý khách
        </p>
        <p>Vui lòng kiểm tra lại giỏ hàng của quý khách</p>
      </div>
      <div id="order-end" class="end-order">
        <img
          src="~static/img/product/empty-cart.png"
          style="margin: 0 auto 20px; max-width: 360px"
          alt=""
        />
        <div class="mess-order-2">
          <p style="max-width: 700px; margin: 10px auto 0">
            Nếu nó trống, hãy quay lại trang chủ và thêm vào giỏ hàng của mình
            những sản phẩm bạn thích nhé!
          </p>
        </div>
        <a href="/" class="home">về trang chủ</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalPrice: 0,
    };
  },
  computed: {
    bill() {
      let bill = this.$store.getters.getBillData;
      bill?.order?.cart?.detail_carts.forEach((item) => {
        item.product.price_sale = item.price_sale;
        item.product.quantity = item.quantity;
        item.product.subTotal = (
          item.product.quantity * item.product.price_sale
        ).toFixed(2);
        this.totalPrice += parseFloat(item.product.subTotal);
        const mainImage = item.product.images.find(
          (image) => image.level === 0
        );
        item.product.mainImage = mainImage ? mainImage.link : null;
      });
      return bill;
    },
    hasBillData() {
      return Object.keys(this.bill).length > 0;
    },
    pricePromotion() {
      if (this.bill?.order?.coupon?.percent) {
        return (
          (this.totalPrice / 100) *
          this.bill?.order?.coupon?.percent
        ).toFixed(2);
      }
      return "0";
    },
  },
};
</script>

<style scoped>
#order-success .section-head .mess-order {
  color: #0dbf00;
  font-size: 30px;
  text-align: center;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#order-success .section-head .mess-order > .img-alert {
  width: 50px;
  display: inline-block;
  height: 40px;
  object-fit: contain;
  margin-right: 8px;
}

#order-success {
  width: 1170px;
  margin: 20px auto 60px;
}

#order-success .section-head .mess-order ~ p,
#order-end .mess-order-2 p {
  text-align: center;
  font-size: 18px;
  color: #494242;
  margin-bottom: 12px;
}

#order-end .mess-order-2 p {
  margin-bottom: 16px;
}

#order-success .section-detail .table-border {
  border: 1px solid #cccccc94;
}

#order-success .section-detail .code_order {
  font-weight: 550;
  margin-top: 15px;
  font-size: 14px;
}

#order-success .section-detail .info-customer {
  font-size: 16px;
  color: green;
  margin-top: 18px;
  margin-bottom: 6px;
}

#order-success .section-detail .info-customer ~ img.image-product-order {
  width: 100px;
}

.image-product-order img {
  max-width: 70px;
}

#order-success .section-detail .product-bought .tfoot {
  text-transform: uppercase;
  font-weight: bold;
}

#order-success .section-detail .product-bought .tfoot .total-price {
  text-align: left;
}

#order-success #order-end {
  text-align: center;
  margin-top: 20px;
}

#order-success #order-end .home {
  display: inline-block;
  padding: 10px 40px;
  text-transform: uppercase;
  border-radius: 3px;
  font-weight: normal;
  border: none;
  outline: none;
  background: #1c59f5cd;
  color: #fff;
  transition: all 0.3s;
  margin-top: 24px;
}

#order-success #order-end .home:hover {
  background: #2f00ffc0;
}

.btn-check-mail {
  display: inline-block;
  padding: 10px 40px;
  text-transform: uppercase;
  border-radius: 3px;
  font-weight: normal;
  border: none;
  outline: none;
  background: #7b9662;
  color: #fff;
  transition: all 0.3s;
  margin-top: 24px;
  margin-left: 20px;
}

.btn-check-mail:hover {
  background: #5f5761;
  color: #fff;
}

.product-bought tbody tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.2s;
}

#order-failed {
  margin: 0 auto;
  text-align: center;
}

#order-failed .section-head .mess-order {
  color: #bf2424;
  font-size: 30px;
  text-align: center;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#order-failed .section-head .mess-order > .img-alert {
  width: 40px;
  display: inline-block;
  height: 40px;
  object-fit: contain;
  margin-right: 12px;
}

#order-failed {
  width: 1170px;
  margin: 20px auto 60px;
}

#order-failed .section-head .mess-order ~ p {
  text-align: center;
  font-size: 18px;
  color: #494242;
}

#order-failed #order-end {
  text-align: center;
  margin-top: 30px;
}

#order-failed #order-end .home {
  display: inline-block;
  padding: 10px 40px;
  text-transform: uppercase;
  border-radius: 3px;
  font-weight: normal;
  border: none;
  outline: none;
  background: #1c59f5cd;
  color: #fff;
  transition: all 0.3s;
  margin-top: 24px;
}

#order-failed #order-end .home:hover {
  background: #2f00ffc0;
}

.product-bought tbody tr:hover {
  background-color: #f0f0f0;
  transition: background-color 0.2s;
}

tr.center-vertical td {
  vertical-align: middle;
}

.thead {
  font-weight: 550;
  background-color: rgba(3, 185, 3, 0.712);
}

.thead td {
  color: #fff;
}
</style>
