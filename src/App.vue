<template>
    <div class="app">
        <TheWelcome />
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import TheWelcome from './components/TheWelcome.vue'

function actualizarAlturaReal() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}

onMounted(() => {
    actualizarAlturaReal()
    window.addEventListener('resize', actualizarAlturaReal)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', actualizarAlturaReal)
})
</script>

<style>

</style>
