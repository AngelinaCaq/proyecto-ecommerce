<template>
  <div class="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
    
    <h1 class="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-[#ff8c00] text-center drop-shadow-[0_2px_10px_rgba(255,140,0,0.5)] mb-12">
      Dragon Ball <span class="text-white">Card Shop</span>
    </h1>

    <UButton
      to="/products"
      size="xl"
      color="warning"
      variant="solid"
      class="font-black italic uppercase text-2xl px-12 py-5 rounded-none transform skew-x-[-15deg] hover:scale-110 transition-transform shadow-[0_5px_0_#e67e22] active:shadow-none active:translate-y-1"
    >
      Entrar a la tienda
      <UIcon name="i-lucide-zap" class="ml-2 w-7 h-7" />
    </UButton>

  </div>
</template>

<style scoped>
div {
  font-family: sans-serif;
}
</style>