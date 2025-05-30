<template>
    <div class="overlay">
        <h2 class="section-title">Somos nosotros! ✨</h2>
        <div class="video-wrapper">
            <iframe
                src="https://www.youtube.com/embed/jOsckKh6HIY?si=24rz4yde_fgdo99J"
                title="Recuerdos Juntos"
                frameborder="0"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    margin: 1rem auto;
    width: 90%;
    max-width: 800px;
}

.video-wrapper iframe {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
}
</style>