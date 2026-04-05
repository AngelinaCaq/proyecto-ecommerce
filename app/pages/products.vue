<script setup>
const {
    personajes,
    cargarMas,
    aplicarFiltros,
    filtro,
    loading,
    error,
    pagina,
    totalPages
} = usePersonaje()

onMounted(async () => {
    if (personajes.value.length === 0) {
        await cargarMas()
    }
})
</script>
<template>
    <div class="min-h-screen bg-[#1a1a1a] text-white">
        <div class="bg-[#ff8c00] py-6 border-b-4 border-[#e67e22] shadow-2xl">
            <UContainer>
                <h1 class="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#1a1a1a] text-center">
                    Dragon Ball <span class="text-white">Card Shop</span>
                </h1>
            </UContainer>
        </div>

        <UContainer class="py-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#222] p-6 rounded-xl border-l-8 border-[#3498db] mb-10 shadow-2xl">
                
                <div class="flex flex-col gap-2">
                    <label class="text-[#3498db] font-black italic uppercase text-xs tracking-widest">Seleccionar Raza</label>
                    <select 
                        v-model="filtro.race" 
                        @change="aplicarFiltros"
                        class="bg-[#333] text-white border-2 border-[#444] rounded-md p-3 outline-none focus:border-[#ff8c00] font-bold italic appearance-none cursor-pointer"
                    >
                        <option value="" class="bg-[#222]">Todas las razas</option>
                        <option v-for="raza in ['Saiyan', 'Human', 'Namekian', 'Frieza Race', 'Android', 'Majin', 'God', 'Angel']" :key="raza" :value="raza" class="bg-[#222]">
                            {{ raza }}
                        </option>
                    </select>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-[#3498db] font-black italic uppercase text-xs tracking-widest">Seleccionar Género</label>
                    <select 
                        v-model="filtro.gender" 
                        @change="aplicarFiltros"
                        class="bg-[#333] text-white border-2 border-[#444] rounded-md p-3 outline-none focus:border-[#ff8c00] font-bold italic appearance-none cursor-pointer"
                    >
                        <option value="" class="bg-[#222]">Todos los géneros</option>
                        <option value="Male" class="bg-[#222]">Masculino</option>
                        <option value="Female" class="bg-[#222]">Femenino</option>
                        <option value="Unknown" class="bg-[#222]">Desconocido</option>
                    </select>
                </div>
            </div>

            <div v-if="loading && personajes.length === 0" class="text-center py-20 italic font-black text-[#3498db] animate-pulse text-2xl">
                CARGANDO SCOUTER...
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <ProductCard v-for="p in personajes" :key="p.id" :personaje="p" />
            </div>

            <div class="flex justify-center mt-16" v-if="pagina <= totalPages">
                <button 
                    @click="cargarMas"
                    :disabled="loading"
                    class="bg-[#ff8c00] hover:bg-[#ffae42] text-[#1a1a1a] font-black italic uppercase px-12 py-4 shadow-[0_5px_0_#e67e22] active:shadow-none active:translate-y-1 transition-all disabled:opacity-50"
                >
                    {{ loading ? 'SINCRONIZANDO...' : 'VER MÁS GUERREROS' }}
                </button>
            </div>
        </UContainer>
    </div>
</template>