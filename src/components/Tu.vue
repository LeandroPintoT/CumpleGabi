<template>
    <div class="overlay">
        <h2 class="section-title">Solo quería decirte…</h2>

        <div class="final-content">
            <div class="video-wrapper">
                <div class="video-overlay"></div>
                <iframe
                    src="https://www.youtube.com/embed/y23x1Qir92A?si=83P0ILwaGIjj6Rvm"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>

            <div class="message-container" @click="mostrarMensaje = true">
                <div class="message-cover" v-if="!mostrarMensaje">
                    <p class="cover-text">Ve el video y luego toca aquí 🎁</p>
                </div>
                <p class="final-text">
                    Eres lo mejor que me pudo pasar en la vida.<br>  
                    Gracias por ser tú 🌷<br>
                    Feliz cumpleaños ❤️
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const mostrarMensaje = ref(false);
</script>

<style scoped>
.final-message {
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-family: "Playfair Display", serif;
}

.final-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  position: relative;
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 16px;
  z-index: 1;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
  border-radius: 16px;
}

.final-text {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  background: rgba(198, 161, 212, 0.452);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  font-style: italic;
}

.message-container {
  position: relative;
  margin-top: 1rem;
  max-width: 600px;
  margin-inline: auto;
}

.message-cover {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  z-index: 2;
  transition: opacity 0.4s ease;
}

.cover-text {
  color: #fff;
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
}
</style>