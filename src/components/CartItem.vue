<script setup>
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const props = defineProps({
        cart: {
            type: Object,
            require: true
        },
        increase: Function,
        decrease: Function,
        delete: Function
    })
</script>

<template>
    <div class="cart-item">
        <div class="image">
            <img v-if="cart.image" :src="cart.image" :alt="cart.title" class="cart-item-image" />
            <div v-else class="cart-item-image no-data" />
        </div>
        <div class="cart-item-details">
            <div v-if="cart.title" class="details">
                <h3 class="cart-item-title">{{ cart.title }}</h3>
                <p class="cart-item-price">{{ cart.price > 0 ? cart.price.toFixed(2) + ' VND' : '' }}</p>
                <p class="cart-item-count">Số lượng: {{ cart.quantity }}</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary" @click="decrease">Giảm</button>
                <button class="btn btn-secondary" @click="increase">Tăng</button>
            </div>
        </div>
        <button class="cart-delete" @click="delete">Bỏ</button>
    </div>
</template>

<style scoped>
    .cart-item {
        width: 90%;
        height: 150px;
        max-width: 600px;
        margin: 0 auto 10px;
        border: 1px solid #ccc;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 2px;
        overflow: hidden;
        .image {
            height: 90%;
            width: 30%;
            border-radius: 8px;
            overflow: hidden;
            .cart-item-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        .cart-item-details {
            width: 60%;
            height: 90%;
            h3 {
                line-clamp: 1;
            }
            .actions button {
                padding: 10px;
                margin: 0 10px;
                border: none;
                border-radius: 5px;
                color: #fff;
                &.btn-primary {
                    background-color: #22ad68;
                }
                &.btn-secondary {
                    background-color: #6f26b3;
                }
            }
        }
        .cart-delete {
            border: none;
            width: 50px;
            height: 100%;
            color: #fff;
            background-color: rgb(201, 51, 31);
        }
    }
    .no-data::after {
        content: '';
        display: block;
        width: 400%;
        height: 100%;
        background: linear-gradient(150deg, #fcfcfc, #e6e6e6);
        animation: dataloading 3s linear 0s infinite alternate-reverse forwards;
    }
</style>