<script setup>
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    const router = useRouter()
    const auth = useAuthStore()

    function handleLogout() {
        router.push('/signin')
        auth.Logout()
    }

    defineProps({
        isGoBack: {
            type: Boolean,
            default: false
        }
    })
</script>

<template>
    <div class="default-layout">
        <nav>
            <div>
                <input type="checkbox" name="routerLink" id="router-link">
                <router-link to="/home">Trang chủ</router-link>
                <router-link to="/products">Sản phẩm</router-link>
                <router-link to="/search">Tìm kiếm</router-link>
                <router-link to="/cart">Giỏ hàng</router-link>
            </div>
            <button v-if="auth.isLogin" @click="handleLogout">Logout</button>
        </nav>
        <main>
            <button v-if="isGoBack" @click="router.back()" class="go-back">Quay lại</button>
            <slot></slot>
        </main>
        <footer>
            <p>&copy; 2025 Giang Thi Thuy Luong</p>
            <a href="https://github.com/giangthithuyluong">Github</a>
        </footer>
    </div>
</template>

<style>
    :root {
        --nav-height: 50px;
    }
    .default-layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        nav {
            width: 100%;
            height: var(--nav-height);
            padding: 16px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            background-color: #f8f8f8;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: fixed;
            z-index: 1;
            & > div {
                max-width: 400px;
                width: 50%;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            input#router-link{
                display: none;
            }
            button {
                padding: 10px 20px;
                background-color: #42b983;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
        }
        main{
            flex-grow: 1;
            padding-top: var(--nav-height);
            .go-back {
                margin: 10px;
                padding: 10px 20px;
                background-color: #42b983;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                &:hover {
                    background-color: #369870;
                }
            }
        }
        footer {
            padding: 10px;
            text-align: center;
            color: #f8f8f8;
            background-color: #181818;
        }
    }
    @media screen and (max-width: 768px) {
        nav > div{
            display: none;
        }
    }
</style>