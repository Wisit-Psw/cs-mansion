<script setup>
import { reactive } from 'vue';

const menuReactive = reactive({isShow:false});

const onMenuIconClick = () =>{
    if(menuReactive.isShow){
        menuReactive.isShow = false;
        document.getElementById("Menu").style.display = "none";
        document.getElementById("logout").style.display = "none";
    }else{
        menuReactive.isShow = true;
        document.getElementById("Menu").style.display = "block";
        document.getElementById("logout").style.display = "flex";
    }
}
</script>

<template>
    <div class="navContainer">
        <div class="logo">
            <p class="text">cs mansion</p>
            <div class="icon" @click="onMenuIconClick">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="menu-list" id="Menu">
            <router-link to="/">
                <div class="menu-wrap">
                    หน้าแรก
                </div>
            </router-link>
            <router-link to="/bill">
                <div class="menu-wrap">
                    บิลค่าเช่า
                </div>
            </router-link>
            <router-link to="/room">
                <div class="menu-wrap">
                    ห้องพัก
                </div>
            </router-link>
            <router-link to="/user">
                <div class="menu-wrap">
                    ผู้เช่า
                </div>
            </router-link>
            <router-link to="/createbill">
                <div class="menu-wrap">
                    สร้างบิล
                </div>
            </router-link>
        </div>
        <router-link to="/login">
            <div class="logout-wrap" id="logout">
                ออกจากระบบ
            </div>
        </router-link>
    </div>
</template>

<style scoped>
.navContainer {
    width: 100%;
    height: 100vh;
    text-align: space-between;
    background-color: white;
}

.logo {
    width: 90%;
    height: 3rem;
    margin: 1rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5rem;
    background-color: var(--menuColor);
    border-radius: 0.3rem;
    color: white;
    margin-bottom: 0.5rem;
}

.logo>.text,
.icon {
    margin: 0 0.5rem;
}
.icon{
    width: 1.5rem;
    height:1.5rem;
}
.icon > div {
    height: 5px;
    width:100%;
    background-color: white;
    border-radius: 3rem;
    margin: 3px auto;
}
.menu-list {
    height: fit-content;
    display: none;
    margin: 0 auto;
}

.menu-wrap {
    width: 80%;
    height: 2rem;
    color: var(--textColor);
    align-items: center;
    display: flex;
    justify-content: space-around;
    padding: 0.5rem;
    border-radius: 0.2rem;
    margin: 0 auto;
}

.menu-wrap:hover {
    background-color: var(--menuSelectedColor);
    cursor: pointer;
}

.logout-wrap {
    width: 80%;
    height: 2rem;
    color: var(--textColor);
    display: none;
    align-items: center;
    padding: 0.5rem;
    padding-bottom: 0;
    border-radius: 0.2rem;
    justify-content: space-around;
    margin: 0 auto;
}

.logout-wrap:hover {
    background-color: var(--menuSelectedColor);
    cursor: pointer;
}

@media screen and (min-width:826px) {
    .logo {
        justify-content: space-around;
    }
    .icon{
        display:none;
    }
    .menu-list {
        height: 80vh;
        display: block;
    }

    .menu-wrap {
        justify-content: left;
    }

    .logout-wrap {
        justify-content: left;
        display: block;
    }
}</style>
