<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
    </div>
</template>

<script>

	export default {
		name: 'App'
	}
</script>

<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 300ms
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }

    .trgroup-move {
        transition: all 10s;
    }

    .trgroup-leave-to {
        transform: translateX(-700px);
        opacity: 0;
    }

    .trgroup-leave-active {
        position: relative;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    .container {
        width: 80%;
        max-width: 640px;
        margin: 0 auto;

         & > button {
            background-color: #009688;
            margin-bottom: 20px;
            color: white;
        }
    }
</style>
