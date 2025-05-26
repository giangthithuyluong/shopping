<script setup>
    import { ref, watch, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import { useProductStore } from '@/stores/product.js'
    import { useCartStore } from '@/stores/cart'
    import Default from '@/layouts/Default.vue'
    import ProductModal from '../components/ProductModal.vue'
    const route = useRoute()
    const product = ref({})
    const quantity = ref(1)
    const open = ref(false)
    const productStore = useProductStore()
    const cartStore = useCartStore()
    onMounted(() => {
        let id = route.params.id
        console.log('pro', productStore.getWithId(id))
        product.value = productStore.getWithId(id)
    })
    watch(() => route.params.id, () => {
        let id = route.params.id
        product.value = productStore.getWithId(id)
    })
    function ToggleModal() {open.value = !open.value}
    function AddCart() {
        cartStore.add(product.value.id, quantity.value)
        quantity.value = 1
        open.value = false
    }
</script>
<template>
    <Default is-go-back>
        <div class="product-desc">
            <img :src="product.image" :alt="product.title">
            <div class="details">
                <h2>{{ product.title }}</h2>
                <p><strong>Phân loại:</strong> {{ product.category }}</p>
                <p><strong>Đánh giá:</strong> {{ product.rating?.rate }}</p>
                <p><strong>Số lượng hiện có:</strong> {{ product.rating?.count }}</p>
                <p><strong>Giá:</strong> {{ product.price }} VND</p>
                <button type="button" @click="ToggleModal">Thêm vào giỏ hàng</button>
            </div>
            <p>{{ product.description }}</p>
        </div>
        <template #modal>
            <ProductModal 
                v-show="open"
                :product="product"
                :quantity="quantity"
                :decrease="() => {quantity--}"
                :increase="() => {quantity++}"
                :close="ToggleModal"
                :complete="AddCart"
            />
        </template>
    </Default>
</template>

<style scoped>
.product-desc {
    max-width: 700px;
    width: 100%;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fafafa;
    display: grid;
    grid-template-columns: 30% 1fr;
    gap: 10px;
    img {
        width: 100%;
        object-fit: contain;
    }
    h1 {
        margin-bottom: 16px;
    }
    p {
        grid-column: 1 / span2;
    }
    button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: rgb(38, 190, 145);
        cursor: pointer;
    }
}
</style>