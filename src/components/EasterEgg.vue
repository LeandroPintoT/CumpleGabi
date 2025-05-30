<template>
    <section class="easter-egg-section">
        <h2 class="easter-title">🎁 ¿Llegaste hasta aquí?</h2>
        <p class="easter-subtitle">Entonces desbloqueaste este regalo secreto...</p>
        <img :src="imagenSorpresa.src" :alt="imagenSorpresa.alt" class="easter-image" />
        <p class="easter-caption">{{ imagenSorpresa.caption }}</p>
    </section>
</template>

<script setup>
const imagenSorpresa = {
    src: new URL('@/assets/fotos/easteregg/sorpresa.png', import.meta.url).href,
    alt: 'Imagen secreta',
    caption: 'Te lo ganaste ✨',
};
</script>

<style scoped>
.easter-egg-section {
    padding: 1rem;
    background: #f4fafe;
    border-radius: 10px;
    color: #3a2f2f;
    text-align: center;
    font-family: 'Playfair Display', serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: fadeIn 1.2s ease;
}

.easter-title {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
}

.easter-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
    font-style: italic;
    color: #6b4e4e;
}

.easter-image {
    width: 80%;
    max-width: 320px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    margin-bottom: 1rem;
    object-fit: cover;
}

.easter-caption {
    font-size: 0.95rem;
    color: #7a5c5c;
    font-style: italic;
}

/* Animación de entrada */
@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateY(24px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>