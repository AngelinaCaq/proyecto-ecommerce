<script setup>
const props = defineProps({
    personaje: {
        type: Object,
        required: true
    }
})

const { formatearPrecio } = usePersonaje()

onMounted(() => {
    console.log(`Tarjeta de ${props.personaje.name} lista`)
})
</script>
<template>
    <UCard class="db-card-tcg overflow-hidden group border-2 border-[#f1c40f] hover:border-[#ff8c00] transition-all">
        <NuxtLink :to="`/product/${personaje.id}`">
            <div class="relative bg-gradient-to-b from-[#2c3e50] to-[#1a1a1a] p-4 flex justify-center h-52">
                <div class="absolute inset-0 bg-[radial-gradient(circle,_rgba(241,196,15,0.1)_0%,_transparent_70%)] group-hover:opacity-100 opacity-0 transition-opacity"></div>
                <img :src="personaje.image" :alt="personaje.name" class="h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300">
            </div>

            <div class="p-4 bg-[#222]">
                <h3 class="text-[#f1c40f] font-black uppercase text-lg italic tracking-tighter truncate">{{ personaje.name }}</h3>
                
                <div class="ki-container mt-2">
                    <div class="ki-label">KI</div>
                    <div class="ki-value-bar">
                        <span class="relative z-10 px-4 italic font-bold">
                            {{ personaje.ki.toLowerCase() === 'unknown' ? '???' : personaje.ki }}
                        </span>
                    </div>
                </div>

                <div class="flex justify-between items-center mt-4">
                    <span class="text-xs text-gray-400 font-mono tracking-widest uppercase">ID: {{ personaje.id }}</span>
                    <span class="text-[#27ae60] font-bold text-xl drop-shadow-[0_0_5px_rgba(39,174,96,0.3)]">{{ formatearPrecio(personaje.ki) }}</span>
                </div>
            </div>
        </NuxtLink>
    </UCard>
</template>

<style scoped>
/* Estilo del Paralelogramo de Ki */
.ki-container {
    display: flex;
    align-items: center;
    filter: drop-shadow(0 0 5px rgba(52, 152, 219, 0.4));
}

.ki-label {
    background: #e74c3c; /* Rojo ataque */
    color: white;
    padding: 0 10px;
    font-weight: 900;
    font-style: italic;
    transform: skewX(-15deg);
    border-right: 2px solid white;
    z-index: 20;
}

.ki-value-bar {
    background: linear-gradient(90deg, #3498db 0%, #2980b9 100%); /* Azul Ki */
    color: white;
    flex-grow: 1;
    height: 24px;
    display: flex;
    align-items: center;
    transform: skewX(-15deg);
    margin-left: -5px;
    position: relative;
    overflow: hidden;
}

.ki-value-bar::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: ki-flow 2s infinite linear;
}

@keyframes ki-flow {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
}

.db-card-tcg {
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
}
</style>