<script setup>
    import { defineProps } from 'vue';
    defineProps({
        quantity: {
            type: Number,
            default: 1
        },
        increase: Function,
        decrease: Function,
        product: {
            type: Object,
            require: true
        },
        close: Function,
        complete: Function
    })
</script>

<template>
    <div class="product-modal">
        <div class="product-modal-background" @click="close" />
        <div class="product-modal-content">
            <button type="button" @click="close" class="modal-close">Đóng</button>
            <h3 class="product-category">{{ product.category }}</h3>
            <img :src="product.image" :alt="product.title">
            <div class="product-details">
                <h3>{{ product.title }}</h3>
                <p>Giá: {{ product.price }} VND</p>
                <div class="actions">
                    <button type="button" class="btn-decrease" :disabled="quantity <= 1" @click="decrease">-</button>
                    <span>{{ quantity }}</span>
                    <button type="button" class="btn-increase" @click="increase">+</button>
                </div>
            </div>
            <button type="button" class="modal-complete" @click="complete">Thêm vào giỏ hàng</button>
        </div>
    </div>
</template>

<style>
    .product-modal {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,.2);
        z-index: 2;
        .product-modal-background {
            width: 100%;
            height: 100%;
        }
        .product-modal-content {
            width: 500px;
            max-width: 100%;
            height: max-content;
            padding: 10px;
            background-color: #fff;

            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto auto;
            gap: 10px;

            position: absolute;
            top: 50%;
            left: 50%;
            translate: -50% -50%;
            z-index: 3;
            .modal-close {
                background-color: var(--do);
                grid-row: 1 / span 1;
                grid-column: 2 / span 1;
                place-self: end;
            }
            .product-category {
                grid-row: 2 / span 1;
                grid-column: 1 / span 2;
                text-transform: uppercase;
            }
            img {
                grid-row: 3 / span 1;
                grid-column: 1 / span 1;
                width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            .product-details {
                grid-row: 3 / span 1;
                grid-column: 2 / span 1;
                .actions {
                    * {
                        margin: 0 10px;
                    }
                    .btn-decrease {
                        background-color: var(--do);
                    }
                }
            }
            .modal-complete {
                grid-row: 4 / span 1;
                grid-column: 1 / span 2;
            }
        }
        button {
            padding: 10px;
            border: none;
            border-radius: 5px;
            color: #fff;
            background-color: var(--xanh);
        }
    }
    @media only screen and (max-width: 768px) {
        .product-modal > .product-modal-content {
            width: 100%;
            max-height: 60vh;
            grid-template-rows: auto auto 50% auto;
            left: 0;
            bottom: 0;
            top: unset;
            translate: unset;
        }
    }
</style>