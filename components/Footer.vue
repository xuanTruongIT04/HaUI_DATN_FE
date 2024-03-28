<template lang="">
  <!-- Footer style Start -->
  <footer class="footer-area pt-75 gray-bg-3">
    <div class="footer-top gray-bg-3 pb-35">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6 pdy-0 pdx-15">
            <div class="footer-widget mb-40">
              <div class="footer-title mb-25">
                <h4>My Account</h4>
              </div>
              <div class="footer-content">
                <ul>
                  <li><NuxtLink to="/my-account">My Account</NuxtLink></li>
                  <li><NuxtLink to="/about-us">Order History</NuxtLink></li>
                  <li><NuxtLink to="/wishlist">WishList</NuxtLink></li>
                  <li><NuxtLink to="">Newsletter</NuxtLink></li>
                  <li><NuxtLink to="/about-us">Order History</NuxtLink></li>
                  <li><NuxtLink to="/#">International Orders</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 pdy-0 pdx-15">
            <div class="footer-widget mb-40">
              <div class="footer-title mb-25">
                <h4>Information</h4>
              </div>
              <div class="footer-content">
                <ul>
                  <li><NuxtLink to="/about-us">About Us</NuxtLink></li>
                  <li><NuxtLink to="">Delivery Information</NuxtLink></li>
                  <li><NuxtLink to="">Privacy Policy</NuxtLink></li>
                  <li><NuxtLink to="">Terms & Conditions</NuxtLink></li>
                  <li><NuxtLink to="">Customer Service</NuxtLink></li>
                  <li><NuxtLink to="">Return Policy</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 pdy-0 pdx-15">
            <div class="footer-widget mb-40">
              <div class="footer-title mb-25">
                <h4>Quick Links</h4>
              </div>
              <div class="footer-content">
                <ul>
                  <li><NuxtLink to="">Support Center</NuxtLink></li>
                  <li><NuxtLink to="">Term & Conditions</NuxtLink></li>
                  <li><NuxtLink to="">Shipping</NuxtLink></li>
                  <li><NuxtLink to="">Privacy Policy</NuxtLink></li>
                  <li><NuxtLink to="">Help</NuxtLink></li>
                  <li><NuxtLink to="">FAQS</NuxtLink></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6 pdy-0 pdx-15">
            <div
              class="footer-widget footer-widget-red footer-black-color mb-40"
            >
              <div class="footer-title mb-25">
                <h4>Contact Us</h4>
              </div>
              <div class="footer-about">
                <p>Your current address goes to here,120 haka, angladesh</p>
                <div class="footer-contact mt-20">
                  <ul>
                    <li>(+008) 254 254 254 25487</li>
                    <li>(+009) 358 587 657 6985</li>
                  </ul>
                </div>
                <div class="footer-contact mt-20">
                  <ul>
                    <li>yourmail@example.com</li>
                    <li>example@admin.com</li>
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
                  >Templates Hub</a
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
