<template lang="">
  <!-- Footer style Start -->
  <footer class="footer-area pt-75 gray-bg-3">
    <div class="footer-top gray-bg-3 pb-35">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6 pdy-0 pdx-15">
            <div class="footer-widget mb-40">
              <div class="footer-title mb-25">
                <h4>Tài khoản</h4>
              </div>
              <div class="footer-content">
                <ul>
                  <li><NuxtLink to="/my-account">Tài khoản</NuxtLink></li>
                  <li><NuxtLink to="/about-us">Về chúng tôi</NuxtLink></li>
                  <li><NuxtLink to="/wishlist">Yêu thích</NuxtLink></li>
                  <li><NuxtLink to="">Bản tin</NuxtLink></li>
                  <li><NuxtLink to="/about-us">Về chúng tôi</NuxtLink></li>
                  <li><NuxtLink to="/#">Đơn đặt hàng quốc tế</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 pdy-0 pdx-15">
            <div class="footer-widget mb-40">
              <div class="footer-title mb-25">
                <h4>Thông tin</h4>
              </div>
              <div class="footer-content">
                <ul>
                  <li><NuxtLink to="/about-us">Về chúng tôi</NuxtLink></li>
                  <li><NuxtLink to="">Thông tin vận chuyển</NuxtLink></li>
                  <li><NuxtLink to="">Chính sách bảo mật</NuxtLink></li>
                  <li><NuxtLink to="">Điều khoản & Điều kiện</NuxtLink></li>
                  <li><NuxtLink to="">Dịch vụ khách hàng</NuxtLink></li>
                  <li><NuxtLink to="">Chính sách hoàn trả</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 pdy-0 pdx-15">
            <div class="footer-widget mb-40">
              <div class="footer-title mb-25">
                <h4>Đường Dẫn Nhanh</h4>
              </div>
              <div class="footer-content">
                <ul>
                  <li><NuxtLink to="">Trung tâm hỗ trợ</NuxtLink></li>
                  <li><NuxtLink to="">Điều khoản & Điều kiện</NuxtLink></li>
                  <li><NuxtLink to="">Vận chuyển</NuxtLink></li>
                  <li><NuxtLink to="">Chính sách bảo mật</NuxtLink></li>
                  <li><NuxtLink to="">Trợ giúp</NuxtLink></li>
                  <li><NuxtLink to="">Câu hỏi thường gặp</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 pdy-0 pdx-15">
            <div
              class="footer-widget footer-widget-red footer-black-color mb-40"
            >
              <div class="footer-title mb-25">
                <h4>Liên hệ chúng tôi</h4>
              </div>
              <div class="footer-about">
                <p>Địa chỉ hiện tại, Quận Từ Liêm, Thành phố Hà Nội</p>
                <div class="footer-contact mt-20">
                  <ul>
                    <li>0374 993 702</li>
                    <li>0348 080 722</li>
                  </ul>
                </div>
                <div class="footer-contact mt-20">
                  <ul>
                    <li>nxt160602@gmail.com</li>
                    <li>www.lotusthe.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom pb-25 pt-25 gray-bg-2">
      <div class="container">
        <div class="row">
          <div class="col-md-6 pdy-0 pdx-15">
            <div class="copyright">
              <p>
                <a target="_blank" to="https://www.templateshub.net"
                  >Lotus <b>THÉ</b></a
                >
              </p>
            </div>
          </div>
          <div class="col-md-6 pdy-0 pdx-15">
            <div class="payment-img f-right">
              <a>
                <img alt="" src="~/static/img/icon-img/payment.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer style End -->
</template>
<script>
export default {};
</script>
<style lang="css">
footer {
  font-family: "Lora", serif !important;
}
.footer-widget ul {
  padding-left: 0;
}
.footer-widget ul li a {
  color: #242424;
}
</style>
