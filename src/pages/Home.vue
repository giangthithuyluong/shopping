<script setup>
    import { ref, onMounted } from 'vue'
    import Default from '../layouts/Default.vue'
    import ProductItem from '@/components/ProductItem.vue'
    import { useAuthStore } from '@/stores/auth'
    import { useProductStore } from '@/stores/product.js'
    const auth = useAuthStore()
    const productStore = useProductStore()
    const category = ref({})
    onMounted(async () => {
        category.value = productStore.groupByCategory()
    })
</script>

<template>
    <Default>
        <div class="home">
            <h1>Trang Chủ</h1>
            <p>Chào mừng <span class="user-name">{{ auth.user?.fullname() }}</span> đến với trang chủ của ứng dụng Vue!</p>
            <p>
                Đây là Project Vue tạo ra bằng Vite và mô phỏng lại website sử dụng API
                <a href="https://fakestoreapi.com/" target="_blank">(Đây là API mở)</a>
                .
            </p>
        </div>
        <div v-for="(value, key) in category" class="category" :key="key">
            <h3>{{ key }}</h3>
            <ul>
                <li v-for="item in value">
                    <ProductItem :product="item"/> 
                </li>
            </ul>
        </div>
    </Default>
</template>

<style scoped>
.home {
    padding: 20px;
    .user-name {
        font-weight: bold;
        color: #42b983;
    }
}
.category {
    padding: 20px;
    & > h3 {
        border-left: 5px solid #42b983;
        padding-left: 10px;
        text-transform: uppercase;
    }
    ul {
        padding: 10px;
        width: 100%;
        display: flex;
        gap: 20px;
        overflow-x: scroll;
    }
}
</style>