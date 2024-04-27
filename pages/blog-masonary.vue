<template lang="">
    <div>
         <div class="blog-page-area masonary-style ptb-100">
            <div class="container">
                <div class="row blog-grid" style="height: auto!important;" v-if="paginatedPosts && paginatedPosts.length > 0">
                    <div class="col-lg-4 col-md-6 blog-grid-item" v-for="post in paginatedPosts" :key="post.id">
                        <div class="single-blog-wrapper mb-40">
                            <div class="blog-img mb-30">
                                <NuxtLink :to="`post/${post.id}`">
                                    <img :src="post.link" :alt="post.title" :title="post.title" class="post-image">
                                </NuxtLink>
                            </div>
                            <div class="blog-content">
                                <h2><NuxtLink :to="`post/${post.id}`" :title="post.title">{{post.title}}</NuxtLink></h2>
                            </div>
                            <p class="mt-3" v-html="briefName(post.description, 90)"></p>
                        </div>
                    </div>
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
        </div>
        <Loader :isLoading="isLoading" />
    </div>
</template>
<script>
import globalMixin from "~/mixins/global";
let Paginate;
if (process.client) {
    Paginate = require("vuejs-paginate");
}
export default {
    mixins: [globalMixin],
    layout: "page-detail",
    components: {
        Paginate,
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 12,
            isLoading: true,
            listPosts: [],
        }
    },
    async asyncData({ $axios }) {
        try {
            const response = await $axios.get("/post/list");
            return {
                listPosts: response?.data?.data.length ? response?.data?.data : [],
            };
        } catch (error) {
            console.error(error);
            return {};
        }
    },
    mounted() {
        this.isLoading = false;
    },
    computed: {
        totalResults() {
            if (this.listPosts) {
                return this.listPosts.length;
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

        paginatedPosts() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            if (this.totalResults > 0) {
                return this.listPosts.slice(start, end);
            }
            return [];
        },

        totalPages() {
            return Math.ceil(this.totalResults / this.pageSize);
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
    }
}
</script>

<style lang="css" scoped>
.blog-grid {
    align-content: flex-start;
}

.blog-page-area {
    padding-top: 40px;
}

.blog-grid-item {
    height: 460px;
}

.info-post-1 {
    width: 90px;
    display: inline-block;
    font-style: italic;
}

.post-image {
    width: 370px;
    height: 250px;
}
</style>