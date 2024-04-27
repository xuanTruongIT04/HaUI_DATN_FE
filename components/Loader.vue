<template>
    <div class="loader-container" v-if="loading">
        <div class="loader">
            <div class="dot dot-1"></div>
            <div class="dot dot-2"></div>
            <div class="dot dot-3"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            internalsLoading: this.Loading
        }
    },
    computed: {
        loading() {
            return this.isLoading || this.internalsLoading;
        }
    },
    created() {
        this.$bus.$on("isLoading3Dot", (value) => this.internalsLoading = value);
    },

};
</script>

<style>
.loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.7);
}

.loader {
    margin-bottom: 10%;
    display: flex;
    align-items: center;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #FFF;
    margin: 12px;
    animation: loading-dots 0.4s infinite alternate ease-in-out;
}

.dot-1 {
    animation-delay: -0.3s;
}

.dot-2 {
    animation-delay: -0.15s;
}

@keyframes loading-dots {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(1.9);
    }
}
</style>
