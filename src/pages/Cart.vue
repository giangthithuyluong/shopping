<script setup>
    import { ref, watch, onMounted } from 'vue'
    import CartItem from '@/components/CartItem.vue'
    import Default from '@/layouts/Default.vue'
    import { useCartStore } from '@/stores/cart.js'
    const cartStore = useCartStore()
    const cart = ref([])
    const cartTotal = ref(cart.value.reduce((total, item) => total + item.price * item.quantity, 0))
    function Increase(id) {
        cartStore.increase(id)
        cart.value = cartStore.getProducts()
    }
    function Decrease(id) {
        cartStore.decrease(id)
        cart.value = cartStore.getProducts()
    }
    function Delete(id) {
        console.log(id);
        
        cartStore.deleteProduct(id)
        cart.value = cartStore.getProducts()
    }
    function Complete() {
        if(confirm('Sau khi nhấn thanh toán, giỏ hàng của bạn sẽ được làm mới, bạn chắc chứ?')) {
            cartStore.reloadCart()
            cart.value = []
        }
    }
    watch(cart, () => {
        cartTotal.value = cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
    }, {deep: true})
    onMounted(() => {
        cart.value = cartStore.getProducts()
    })
</script>

<template>
    <Default>
        <div class="cart-page">
            <h1>Giỏ Hàng</h1>
            <div v-if="cart.length === 0" class="empty-cart">
                Giỏ hàng của bạn đang trống.
            </div>
            <div v-else>
                <ul class="cart-list">
                    <li v-for="item in cart" :key="item.id" class="cart-item">
                        <CartItem 
                            :cart="item" 
                            :increase="() => Increase(item.id)"
                            :decrease="() => Decrease(item.id)"
                            :delete-product="() => Delete(item.id)"
                        />
                    </li>
                </ul>
                <div class="cart-total">
                    <strong>Tổng cộng: {{ cartTotal }} VND</strong>
                </div>
                <button class="checkout-btn" @click="Complete">Thanh toán</button>
            </div>
        </div>
    </Default>
</template>

<style scoped>
.cart-page {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px #eee;
}
.cart-list {
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;
}
.item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 16px;
    border-radius: 4px;
}
.item-info h2 {
    margin: 0 0 8px 0;
    font-size: 18px;
}
.cart-total {
    text-align: right;
    margin-bottom: 16px;
    font-size: 18px;
}
.checkout-btn {
    display: block;
    width: 100%;
    padding: 12px;
    background: var(--xanh);
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
}
.empty-cart {
    text-align: center;
    color: #888;
    font-size: 18px;
    margin: 40px 0;
}
@media only screen and (max-width: 768px) {
    .cart-page {
        max-width: unset;
        margin: 0;
        padding: 24px;
        border-radius: unset;
        box-shadow: unset;
    }
}
</style>