<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'
    import { useProductStore } from '@/stores/product'
    import { useCartStore } from '@/stores/cart'

    const router = useRouter()
    const auth = useAuthStore()
    const isPass = ref(true)
    const username = ref('mor_2314')
    const password = ref('83r5^_')

    function handlePass() {isPass.value = !isPass.value}

    async function handleSignin() {
        try {
            await auth.Login(username.value, password.value)
        } finally {
            if (auth.isLogin) {
                alert('Đăng nhập thành công!')
                await useProductStore().fetchProducts()
                await useCartStore().fetchCart()
                router.push('/home')
            } else {
                alert(auth.error)
            }
        }
    }

</script>

<template>
    <div class="signin">
        <h1>Đăng nhập</h1>
        <form @submit.prevent="handleSignin">
            <div>
                <label for="username">Tài khoản:</label>
                <input type="username" v-model="username" id="username" required />
            </div>
            <div>
                <label for="password">Mật khẩu:</label>
                <div class="password">
                    <input 
                        :type="isPass ? 'password' : 'text'" 
                        v-model="password" 
                        id="password" 
                        required />
                    <button 
                        type="button" 
                        :class="isPass ? 'hide-password' : 'unhide-password'"
                        @click="handlePass"
                    ></button>        
                </div>    
            </div>
            <div>
                <button type="button" @click="router.push('/signup')" class="signup">Đăng ký</button>
            </div>
            <button v-if="auth.isLoading" type="button" class="submit">Đang đăng nhập...</button>
            <button v-else type="submit" class="submit">Đăng nhập</button>
            <p v-show="auth.error != null">{{ auth.error }}</p>
        </form>
    </div>
</template>

<style scoped>
.signin {
    width: 400px;
    max-width: 100vw;
    margin: 40px auto;
    padding: 24px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
.signin h1 {
    text-align: center;
    margin-bottom: 24px;
}
.signin form div {
    margin-bottom: 16px;
}
.signin label {
    display: block;
    margin-bottom: 4px;
}
.signin input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
.signin .password {
    width: 100%;
    display: flex;
    input[type="password"] {
        flex-grow: 1;
    }
    button {
        width: 50px;
        border: 1px solid black;
        background-color: #fff;
        &.hide-password {
            background-color: #000;
        }
    }
}
.signin button.signup {
    padding: 10px 0;
    border: none;
    float: right;
    font-size: 1rem;
    background-color: transparent;
    &:hover {
        color: var(--xanh-dam);
    }
}
.signin button.submit {
    width: 100%;
    padding: 10px;
    background: var(--xanh);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &[type='button'] {
        background-color: var(--xanh-dam);
    }
    &[type='submit']:hover {
        background: var(--xanh-dam);
    }
}
@media only screen and (max-width: 768px) {
    .signin {
        border: none;
    }
}
</style>