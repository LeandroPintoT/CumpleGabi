<template>
    <!-- Popup: solo en primera sección y sin fullscreen -->
    <div v-if="showPopup" class="popup-message">
        <p>¡Alto ahí mija!<br>Pónle pantalla completa ahí arriba a la derecha ↗️</p>
        <button @click="closePopup">Entendido</button>
    </div>

    <button class="boton-fullscreen" @click="alternarPantallaCompleta">
        {{ esPantallaCompleta ? '✖️' : '⛶' }}
    </button>
    
    <video class="video-bg" autoplay muted loop playsinline preload="metadata">
        <source :src="fondoVideoWebM" type="video/webm" />
        <source :src="fondoVideoMP4" type="video/mp4">
        Tu navegador no soporta videos en HTML5.
    </video>

    <!-- NAV lateral -->
    <nav class="nav-inferior">
        <button
            v-for="(section, i) in secciones"
            :key="i"
            :class="{ activo: seccionActual === section.id }"
            @click="irASeccion(section.id)"
            :title="section.titulo"
        >
            {{ section.icono }}
        </button>
    </nav>

    <!-- Secciones a pantalla completa -->
    <div class="contenedor-secciones">
        <section class="pantalla dummy-top"></section>

        <section
            v-for="section in secciones"
            :key="section.id"
            :id="section.id"
            class="pantalla"
        >
            <component :is="section.componente" />
        </section>

        <section :key="'easter'" id="easter" class="pantalla">
            <Easter />
        </section>
        <section class="pantalla dummy-bottom"></section>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import fondoVideoMP4 from '@/assets/videos/playa.mp4';
import fondoVideoWebM from '@/assets/videos/playa.webm';
import PresentacionP1 from './PresentacionP1.vue'
import PresentacionP2 from './PresentacionP2.vue'
import Comida from './Comida.vue'
import Nosotros from './Nosotros.vue'
import Misc from './Misc.vue'
import Tu from './Tu.vue'
import Easter from './EasterEgg.vue'

const esPantallaCompleta = ref(false)

function alternarPantallaCompleta() {
    const doc = document
    const el = document.documentElement

    if (!esPantallaCompleta.value) {
        if (el.requestFullscreen) el.requestFullscreen()
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
        else if (el.msRequestFullscreen) el.msRequestFullscreen()
    } else {
        if (doc.exitFullscreen) doc.exitFullscreen()
        else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen()
        else if (doc.msExitFullscreen) doc.msExitFullscreen()
    }
    window.setTimeout(() => {
        manejarCambioPantallaCompleta()
        checkPopup()
    }, 100)
}

// Escuchar cambios del estado fullscreen
function manejarCambioPantallaCompleta() {
    esPantallaCompleta.value =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
}

const secciones = [
    { id: 'intro', componente: PresentacionP1, icono: '🎉' },
    { id: 'intro2', componente: PresentacionP2, icono: '👁️' },
    { id: 'comida', componente: Comida, icono: '🍔' },
    { id: 'nosotros', componente: Nosotros, icono: '📸' },
    { id: 'misc', componente: Misc, icono: '🤭' },
    { id: 'tu', componente: Tu, icono: '🌹' }
]

const seccionActual = ref('intro')

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('dummy-top') && !entry.target.classList.contains('dummy-bottom')) {
                seccionActual.value = entry.target.id
                checkPopup() /* reevaluar popup al cambiar sección */
            }
        })
    },
    { threshold: 0.6 }
)

onMounted(() => {
    secciones.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
    })
    document.addEventListener('fullscreenchange', manejarCambioPantallaCompleta)
    document.addEventListener('webkitfullscreenchange', manejarCambioPantallaCompleta)
    document.addEventListener('msfullscreenchange', manejarCambioPantallaCompleta)
    manejarCambioPantallaCompleta()

    /* Popup scroll y fullscreen */
    window.addEventListener('scroll', checkPopup)

    irASeccion('intro')
})

onBeforeUnmount(() => {
    observer.disconnect()
    document.removeEventListener('fullscreenchange', manejarCambioPantallaCompleta)
    document.removeEventListener('webkitfullscreenchange', manejarCambioPantallaCompleta)
    document.removeEventListener('msfullscreenchange', manejarCambioPantallaCompleta)
    window.removeEventListener('scroll', checkPopup)
})

const irASeccion = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
}

/* Popup logic */
const showPopup = ref(false)
function checkPopup() {
    const inFirst = seccionActual.value === 'intro'
    const notFs = !esPantallaCompleta.value
    showPopup.value = inFirst && notFs
}

function closePopup() {
    showPopup.value = false
}
</script>

<style scoped>
.popup-message {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 0.8rem 1.2rem;
    border-radius: 10px;
    z-index: 9999;
    text-align: center;
    width: 70%;
    font-family: 'Poppins', sans-serif;
}

.popup-message button {
    margin-top: 0.5rem;
    background: #ffffff22;
    border: none;
    padding: 0.4rem 1rem;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.contenedor-secciones {
    scroll-snap-type: y mandatory;
    overflow-y: auto;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    -webkit-overflow-scrolling: touch;
}

.video-bg {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: calc(var(--vh, 1vh) * 100);
    width: auto;
    z-index: -1;
    object-fit: cover;
    pointer-events: none;
}

.pantalla {
    min-height: calc(var(--vh, 1vh) * 100);
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
}

.nav-inferior {
    position: fixed;
    bottom: calc(env(safe-area-inset-bottom, 0px) + 16px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(6px);
    border-radius: 20px;
    padding: 8px 12px;
    z-index: 10;
}

.nav-inferior button {
    background: transparent;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 18px;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
}

.nav-inferior button.activo {
    background: rgba(255, 255, 255, 0.9);
    color: black;
    box-shadow: 0 0 5px white;
}

.dummy-top,
.dummy-bottom {
  height: 20vh;
  background: transparent;
  scroll-snap-align: none; /* para que no atrape el scroll */
  pointer-events: none;
}

.boton-fullscreen {
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 20;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(4px);
    color: white;
    border: none;
    border-radius: 12px;
    width: 40px;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    transition: background 0.3s ease;
}

.boton-fullscreen:hover {
    background: rgba(255, 255, 255, 0.4);
}
</style>