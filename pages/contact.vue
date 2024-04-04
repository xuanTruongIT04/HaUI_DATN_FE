<template lang="">
   <div>
    <div class="contact-us ptb-95">
            <div class="container">
                <div class="row">
					<!-- Contact Form Area Start -->
					<div class="col-lg-6">
						<div class="small-title mb-30">
							<h2>Contact Form</h2>
							<p>There are many variations of passages of Lorem Ipsum available, but the majority Lorem Ipsum available.</p>
						</div>
						<form id="contact-form" action="https://d29u17ylf1ylz9.cloudfront.net/sabujcha/assets/mail.php" method="post">
							<div class="row">
								<div class="col-lg-6">
									<div class="contact-form-style mb-20">
										<input name="name" placeholder="Full Name" type="text">
									</div>
								</div>
								<div class="col-lg-6">
									<div class="contact-form-style mb-20">
										<input name="email" placeholder="Email Address" type="email">
									</div>
								</div>
								<div class="col-lg-12">
									<div class="contact-form-style mb-20">
										<input name="subject" placeholder="Subject" type="text">
									</div>
								</div>
								<div class="col-lg-12">
									<div class="contact-form-style">
										<textarea name="message" placeholder="Message"></textarea>
										<button class="submit" type="submit">SEND MESSAGE</button>
									</div>
								</div>
							</div>
						</form>
						<p class="form-messege"></p>
					</div>
					<!-- Contact Form Area End -->
					<!-- Contact Address Strat -->
					<div class="col-lg-6">
						<div class="small-title mb-30">
							<h2>Contact Address</h2>
							<p>There are many variations of passages of Lorem Ipsum available, but the majority Lorem Ipsum available.</p>
						</div>
						<div class="row">
							<div class="col-lg-12 col-md-12">
								<div class="contact-information mb-30">
									<h4>Our Address</h4>
									<p>House. 9, Road. 12, Widgets. Orled. Sydney. Milaro.</p>
								</div>
							</div>
							<div class="col-lg-12 col-md-12">
								<div class="contact-information contact-mrg mb-30">
									<h4>Phone Number</h4>
									<p>
										<a href="tel:01234567890">0374 993 702</a>
										<a href="tel:01234567891">0374 993 702</a>
									</p>
								</div>
							</div>
							<div class="col-lg-12 col-md-12">
								<div class="contact-information contact-mrg mb-30">
									<h4>Web Address</h4>
									<p>
										<a href="mailto:info@example.com">info@example.com</a>
										<a href="www.example.com">www.example.com</a>
									</p>
								</div>
							</div>
						</div>
                    </div>
					<!-- Contact Address Strat -->
					<!-- Google Map Start -->
					<div class="col-md-12">
						<div id="store-location">
							<div class="contact-map pt-80">
								<div id="map" style="overflow:hidden; height: 700px!important;">
									<img 
									style="width: 100%; height: auto;"
									object-fit="contain"
									src="https://timviec365.vn/pictures/videos/2023/01/03/01672737779316099516_638692661412583_4411996143298775264_n.jpg" />
								</div>
							</div>
						</div>
					</div>
					<!-- Google Map Start -->
                </div>
            </div>
        </div>
   </div>
</template>
<script>
export default {
	layout: "page-detail",

}
</script>
<style lang="">
    
</style>