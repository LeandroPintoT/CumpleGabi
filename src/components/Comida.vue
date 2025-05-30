<template>
    <section class="section food-section">
        <h2 class="section-title">La mejor parte 🍜✨</h2>
        <div class="my-carousel-container">
            <div class="my-carousel">
                <div
                    v-for="(image, index) in images"
                    :key="index"
                    class="my-carousel-item"
                >
                    <img :src="image.src" :alt="image.alt" />
                    <p class="caption">{{ image.caption }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const imageModules = import.meta.glob('@/assets/fotos/comida/*.{jpg,jpeg,png,webp}', { eager: true });

const images = Object.entries(imageModules).map(([path, module]) => {
    const name = path.split('/').pop().split('.')[0];
    return {
        src: module.default,
        alt: name,
        caption: generarCaptionBonita(name),
    };
});

function generarCaptionBonita(nombre) {
    const captions = {
        bar1: "En el Garden 🍸",
        bar2: "La primera vez en Conclave 🍷",
        bar3: "Ese pediste tu 💅🏻",
        bar4: "Ese era de cafe 🤤",
        bar5: "En San Pedro, la unica vez que fui 😅",
        bar6: "El Conclave, dijiste que parecia padre 🙄",
        bar7: "El barño, mi foto de las papas 😎",
        bar8: "En el Mirror, yo no tome ese dia 🚗",
        burger1: "Cuando me llevaste al Fat Kid 🫃🏻",
        burger2: "Las hamburguesas del Conclave 🍔",
        burger3: "Me llevaste al Johnny Rockets 👯‍♀️",
        burger4: "Volvimos al Fat Kid 😅",
        burger5: "En el McDonalds con Benja y Geral 🎢",
        burger6: "Fuimos de nuevo al Johnny Rockets 🪩",
        cafe1: "La Morada Alegre, me costo encontrarlo 😂",
        cafe2: "La primera vez que fuimos al Café Rosa ☕",
        cafe3: "Uno que pillamos en valpo 🚬",
        cafe4: "Café Rosa y ajedrez ♟️",
        cafe5: "Good Nick + Coccolino ☕ y después a Intrigma 🕵🏻",
        cafe6: "Esa fue mi primera derrota 🥹",
        cafe7: "El Pasaje, nunca buscaron a Wally 🔍",
        cafe8: "Coccolino nuevo 🆕",
        desayuno1: "Desayuno con los chiquillos 🥞",
        donas1: "Nos echaron del Muelle Vergara 🎣",
        juegos1: "No aprendimos a jugar el Scrabble 🅿️",
        juegos2: "Primera vez en la Cafetera de Juegos 🎲",
        juegos3: "Me destruyes siempre en Carcassonne 😭",
        juegos4: "También como mafiosa 🔫",
        juegos5: "Perdiendo en horizontal ⬅️➡️",
        juegos6: "Hasta haciendo casas me ganaste 🏚️",
        mochi1: "Probaste el mochi de menta chips (creo 😅)",
        mochi2: "Y yo el de oreo nutella 😋",
        picado1: "Experiencia de vino, quesos y perfumes 🍷🧀",
        pizza1: "Fuimos a la playa con la pizza del Under 🍕",
        pizza2: "Me mostraste el Masamá 🍕",
        pizza3: "Y fuimos de nuevo 😋",
        pizza4: "Y otra vez más 😂",
        postre1: "Un postrecito del Johnny Rockets 🍨",
        ramen1: "El ramen que nos acordamos hace poco 🍜",
        ramen2: "Y el del Tsuki 🍜",
        ramen3: "Yo me pedi unos onigiri 🍙",
        ramen4: "En el Mito Sushi, habia una pareja muy amorosa en la calle 🤮",
        starbucks1: "Una de las tantas ☕🍨",
        starbucks2: "Y otra, ese día no almorcé 🥖",
        starbucks3: "Otra más, como no 🧜🏻‍♀️",
        starbucks4: "Cuando tiraron los refresher nuevos 🥤",
        waffle1: "Cuando probaste el Buffalo Waffles 🧇",
    };
    return captions[nombre] || "¡Un delicioso recuerdo!";
}
</script>

<style scoped>
.food-section {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    text-align: center;
}

.my-carousel-container {
    width: 100%;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 10vw;          /* centra cada snap */
    -webkit-overflow-scrolling: touch;
    display: flex;
    align-items: center;
}

.my-carousel {
    display: flex;
    gap: 1rem;
}

.my-carousel-item {
    flex: 0 0 80vw;                       /* ocupa 80% viewport */
    max-width: 100%;
    height: 100%;
    scroll-snap-align: center;
    scroll-snap-stop: always;
    box-sizing: border-box;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
}

.my-carousel-item img {
    width: 100%;
    max-height: 60vh;
    object-fit: cover;
}

.caption {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    font-style: italic;
    color: #555;
    padding: 0 0.5rem 0;
}
</style>
