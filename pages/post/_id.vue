<template lang="">
    <div>
        <div class="blog-page-area ptb-100">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="blog-details-wrapper">
                            <div class="single-blog-wrapper">
                                <div class="blog-img mb-30">
                                    <img :src="post?.link" alt="">
                                </div>
                                <div class="blog-content">
                                    <h2>{{post.title}}</h2>
                                    <div class="blog-date-categori">
                                        <ul>
                                            <li>{{post.updated_at}} </li>
                                            <li>Admin</li>
                                        </ul>
                                    </div>
                                    <div class="blog-content-body" v-html="post.content">
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- Loader -->
    <Loader :isLoading="isLoading"/>
    <!-- End Loader -->
    </div>
</template>
<script>
export default {
    layout: "page-detail",
    data() {
        return {
            isLoading: true,
        }
    },
    mounted() {
        this.isLoading = false;
    },
    async asyncData({ $axios, params }) {
        try {
            const resPost = await $axios.get(`/post/detail/${params.id}`);
            const post = resPost?.data?.data;
            return {
                post: post,
            };
        } catch (e) {
            console.log(e);
            return {};
        }
    },
}
</script>
<style lang="css" scoped>
.blog-img {
    max-height: 400px;
    overflow: hidden;
}
</style>