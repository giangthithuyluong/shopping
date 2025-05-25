<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/stores/auth'

    const router = useRouter()
    const auth = useAuthStore()
    const username = ref('mor_2314')
    const password = ref('83r5^_')

    async function handleSignin() {
        try {
            await auth.Login(username.value, password.value)
        } finally {
            if (auth.isLogin) {
                alert('Đăng nhập thành công!')
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
                    <input type="password" v-model="password" id="password" required />
                    <input type="checkbox" onclick="password.type = this.checked ? 'text' : 'password'">        
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
    max-width: 400px;
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
    input[type="checkbox"] {
        width: 50px;
        accent-color: #000;
    }
}
.signin button.signup {
    padding: 10px 0;
    border: none;
    float: right;
    font-size: 1rem;
    background-color: transparent;
    &:hover {
        color: #369870;
    }
}
.signin button.submit {
    width: 100%;
    padding: 10px;
    background: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &[type='button'] {
        background-color: #369870;
    }
    &[type='submit']:hover {
        background: #369870;
    }
}
</style>