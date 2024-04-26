<template>
    <div class="container">
        <div class="row my-4">
            <h2 class="mb-3 mx-auto">Tìm mã giảm giá theo ngày</h2>
            <div class="date-filter d-flex justify-content-center align-items-center w-100">
                <div class="form-group time-filter-item">
                    <label for="" class="d-block font-weight-bold">Ngày bắt đầu</label>
                    <input type="datetime-local" v-model="date_start" class="form-control">
                </div>
                <div class="form-group time-filter-item">
                    <label for="" class="d-block font-weight-bold">Đến</label>
                    <input type="datetime-local" v-model="date_end" class="form-control">
                </div>
            </div>
            <div class="col-md-12" v-if="paginatedCoupons && paginatedCoupons.length > 0">
                <div class="coupon-list">
                    <div v-for="(coupon, index) in paginatedCoupons" :key="index" class="coupon-item mr-5">
                        <h3 class="coupon-header">{{ coupon.name }}</h3>
                        <hr>
                        <div class="coupon-body">
                            <p>Mã: {{ coupon.code }}</p>
                            <p>Phần trăm giảm: {{ coupon.percent }}%</p>
                            <p>Bắt đầu từ: {{ formatDateTime(coupon.start_date) }}</p>
                            <p>Kết thúc vào: {{ formatDateTime(coupon.end_date) }}</p>
                            <button @click="copyCouponCode(coupon.code)" class="btn btn-success">Lấy mã</button>
                        </div>
                    </div>
                </div>
                <div class="cart-shiping-update cart-return mt-1 mb-3  d-flex justify-content-center">
                    <NuxtLink to="/cart-page">Return shopping cart</NuxtLink>
                </div>

                <div class="pagination-total-pages">
                    <paginate :page-count="totalPages" :container-class="'pagination-style'" :page-class="'page-item'"
                        :prev-class="'prev-next prev'" :next-class="'prev-next next'" :active-class="'active'"
                        :click-handler="changePage" v-model="currentPage"></paginate>

                    <div class="total-pages">
                        <div class="total-pages">
                            <p>
                                Showing {{ startIndex }} - {{ endIndex }} of
                                {{ totalResults }} results
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7" style="margin:10px auto 40px;" v-else>
                <img src="~static/img/product/empty.jpg" alt="Không tồn tại mã giảm giá nào" style="max-width: 100%" />
                <h3 class="text-center text-danger">
                    Không tồn tại mã giảm giá nào, vui lòng thử lại..!
                </h3>
                <div class="cart-shiping-update-wrapper">
                    <div class="cart-shiping-update cart-return">
                        <NuxLink to="/cart-page">Return shopping cart</NuxLink>
                    </div>
                </div>
            </div>
        </div>
        <Loader :isLoading="isLoading" />
    </div>
</template>

<script>
import { format } from 'date-fns';
let Paginate;
if (process.client) {
    Paginate = require("vuejs-paginate");
}
export default {
    layout: "page-detail",
    components: {
        Paginate,
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 6,
            date_start: null,
            date_end: null,
            isLoading: true,
        };
    },
    async asyncData({ $axios }) {
        try {
            const resCoupon = await $axios.get("/coupon/list");
            return {
                coupons: resCoupon?.data?.data.length ? resCoupon?.data?.data : [],
            };
        } catch (e) {
            console.log(e);
            return {};
        }
    },

    mounted() {
        this.isLoading = false;
    },
    computed: {
        //  Paginate
        totalResults() {
            if (this.coupons) {
                return this.coupons.length;
            }
            return 0;
        },

        startIndex() {
            return (this.currentPage - 1) * this.pageSize + 1;
        },

        endIndex() {
            const endIndex = this.currentPage * this.pageSize;
            return Math.min(endIndex, this.totalResults);
        },

        paginatedCoupons() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            if (this.totalResults > 0) {
                return this.filteredCoupons.slice(start, end);
            }
            return [];
        },

        totalPages() {
            return Math.ceil(this.totalResults / this.pageSize);
        },
        filteredCoupons() {
            const startDate = new Date(this.date_start);
            const endDate = new Date(this.date_end);

            if (this.date_start && this.date_end) {
                return this.coupons.filter(coupon => {
                    const couponDate = new Date(coupon.start_date);
                    return couponDate >= startDate && couponDate <= endDate;
                });
            } else if (this.date_start && !this.date_end) {
                return this.coupons.filter(coupon => {
                    const couponDate = new Date(coupon.start_date);
                    return couponDate >= startDate;
                });
            } else if (!this.date_start && this.date_end) {
                return this.coupons.filter(coupon => {
                    const couponDate = new Date(coupon.start_date);
                    return couponDate <= endDate;
                });
            }
            return this.coupons;
        },
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        },

        returnCurrentPage() {
            this.currentPage = 1;
        },

        changePageSize() {
            this.returnCurrentPage();
        },
        formatDateTime(dateTimeString) {
            const formattedDateTime = format(new Date(dateTimeString), 'MM/dd/yyyy-HH:mm:ss');
            return formattedDateTime;
        },
        async copyCouponCode(code) {
            try {
                await navigator.clipboard.writeText(code);
                this.$toast.success('Đã sao chép thành công mã: ' + code);
            } catch (error) {
                this.$toast.fail('Đã sao chép thất bại mã: ', error);
            }
        },
    },
};
</script>

<style lang="css" scoped>
.coupon-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.coupon-item {
    border: 1px solid #ccc;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 280px;
}

.pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
}

.coupon-header {
    text-align: center;
}

.coupon-body {
    padding: 20px;
}


.coupon-item h3 {
    padding: 10px 14px;
    font-size: 14px;
    margin-bottom: 0;
    background: #e9e942;
}

.coupon-item p {
    margin-bottom: 5px;
    font-size: 12px;
}

.coupon-item button {
    margin-top: 10px;
}

.coupon-item button:hover {
    cursor: pointer;
}

hr {
    padding: 0;
    margin: 0;

}

.date-filter {
    margin-bottom: 20px;
}

.time-filter-item {
    width: 400px;
    margin-right: 30px;
}

.cart-shiping-update>a {
    padding: 14px 16px;
}
</style>