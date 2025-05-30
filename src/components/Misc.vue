<template>
    <div class="overlay">
        <h2 class="section-title">Fotos y videos random 📸🎥</h2>
        <div class="grid-gallery">
            <div
                v-for="(item, index) in media"
                    :key="index"
                    class="thumb"
                    @click="openViewer(item)"
            >
                <img v-if="item.type === 'image'" :src="item.src" :alt="item.alt" />
                <div v-else class="video-thumb">
                    <video :src="item.src" muted playsinline></video>
                    <div class="play-icon">▶</div>
                </div>
            </div>
        </div>

        <div v-if="selected" class="viewer" @click="selected = null">
            <img v-if="selected.type === 'image'" :src="selected.src" />
            <video v-else :src="selected.src" autoplay controls></video>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const imageModules = import.meta.glob('@/assets/fotos/otras/*.{jpg,jpeg,png,webp}', { eager: true })
const videoModules = import.meta.glob('@/assets/fotos/otras/*.{mp4,webm}', { eager: true })

const media = [
    ...Object.entries(imageModules).map(([path, mod]) => ({
        src: mod.default,
        type: 'image',
        alt: path.split('/').pop(),
    })),
    ...Object.entries(videoModules).map(([path, mod]) => ({
        src: mod.default,
        type: 'video',
        alt: path.split('/').pop(),
    })),
]

const selected = ref(null)
const openViewer = (item) => {
    selected.value = item
}
</script>

<style scoped>
.otras-fotos {
    padding: 2rem;
    background: rgba(0, 0, 0, 0.4);
    text-align: center;
    width: 100%;
}

.section-title {
    font-family: "Playfair Display", serif;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #333;
}

.grid-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
    width: 100%;
}

@media (max-width: 600px) {
    .grid-gallery {
        grid-template-columns: repeat(3, 1fr);
    }
}

.thumb {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
}

.thumb img,
.thumb video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.video-thumb {
    position: relative;
    width: 100%;
    height: 100%;
}

.video-thumb video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 2rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 0.2em 0.4em;
    pointer-events: none;
}

.viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
}

.viewer img,
.viewer video {
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 10px;
}
</style>