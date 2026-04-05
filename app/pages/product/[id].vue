<script setup>
const route = useRoute()
const id = route.params.id

const { personaje, cargarPersonaje, formatearPrecio } = usePersonaje()

await cargarPersonaje(id)
</script>

<template>
    <div class="min-h-screen bg-[#0a0a0a] text-white py-12">
        <UContainer>
            <div class="flex flex-col lg:flex-row gap-12 items-center lg:items-start bg-[#1a1a1a] p-8 rounded-3xl border-2 border-[#333] shadow-2xl relative overflow-hidden">
                
                <div class="absolute top-5 right-[-20px] bg-[#f1c40f] px-12 py-1 transform rotate-12 text-[#1a1a1a] font-black italic">
                    ID: {{ personaje.id }}
                </div>

                <div class="w-full lg:w-1/2 bg-gradient-to-t from-[#222] to-transparent p-10 rounded-2xl flex justify-center border border-[#333]">
                    <img :src="personaje.image" :alt="personaje.name" class="max-h-[600px] drop-shadow-[0_0_30px_rgba(255,140,0,0.4)]">
                </div>

                <div class="w-full lg:w-1/2 space-y-6">
                    <h1 v-if="personaje" class="text-6xl font-black italic uppercase text-[#ff8c00] tracking-tighter">{{ personaje.name }}</h1>
                    
                    <div class="flex gap-4">
                        <UBadge color="gray" variant="solid" class="italic">{{ personaje.race }}</UBadge>
                        <UBadge color="blue" variant="solid" class="italic">{{ personaje.gender }}</UBadge>
                        <UBadge color="orange" variant="outline" class="italic">{{ personaje.affiliation }}</UBadge>
                    </div>

                    <div class="ki-detail-box w-full max-w-md">
                        <div class="ki-label-large">KI POWER</div>
                        <div class="ki-value-large font-black italic text-2xl px-6">
                            {{ personaje.ki }}
                        </div>
                    </div>

                    <p class="text-gray-400 text-lg leading-relaxed border-l-4 border-[#ff8c00] pl-6 py-2 bg-white/5 italic">
                        {{ personaje.description }}
                    </p>

                    <div class="pt-10">
                        <p class="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold">Valor de mercado</p>
                        <p class="text-5xl font-black text-[#27ae60] drop-shadow-[0_0_10px_rgba(39,174,96,0.3)] mt-2">
                            {{ formatearPrecio(personaje.ki) }}
                        </p>
                    </div>

                    <UButton to="/products" color="gray" variant="ghost" icon="i-heroicons-arrow-left" class="mt-10">
                        Volver a la tienda
                    </UButton>
                </div>
            </div>
        </UContainer>
    </div>
</template>

<style scoped>
.ki-detail-box {
    display: flex;
    align-items: center;
    transform: skewX(-15deg);
}

.ki-label-large {
    background: #e74c3c;
    color: white;
    padding: 10px 20px;
    font-weight: 900;
    font-style: italic;
    border-right: 4px solid white;
}

.ki-value-large {
    background: linear-gradient(90deg, #3498db, #2980b9);
    height: 100%;
    padding: 10px 40px;
    flex-grow: 1;
    color: white;
    box-shadow: inset 0 0 15px rgba(255,255,255,0.2);
}
</style>