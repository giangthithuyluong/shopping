<script setup>
    import { onMounted, ref } from 'vue'
    import Default from '@/layouts/Default.vue'
    import ProductItem from '@/components/ProductItem.vue'
    import { useProductStore } from '@/stores/product.js'
    const products = ref([])
    products.value = Array(9).fill({})
    onMounted(() => {
        const productStore = useProductStore()
        products.value = productStore.items
    })
</script>

<template>
    <Default>
        <div class="products-page">
            <h1>Danh sách sản phẩm</h1>
            <ul class="product-list">
                <li v-for="product in products" :key="product.id">
                    <ProductItem :product="product" />
                </li>
            </ul>
        </div>
    </Default>
</template>

<style scoped>
.products-page {
    h1 {
        margin-bottom: 16px;
    }
    .product-list {
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
    }
}
</style>