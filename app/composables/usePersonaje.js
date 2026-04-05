export const usePersonaje = () => {
    const personaje = useState('personaje', () => null)
    const personajes = useState('personajes', () => [])
    const pagina = useState('pagina', () => 1)
    const totalPages = useState('totalPages', () => 1)
    
    const loading = useState('loading', () => false)
    const error = useState('error', () => null)

    const filtro = useState('filtro', () => ({
        race: '',
        gender: '',
        affiliation: '',
    }))

    const cargarMas = async () => {
        if (pagina.value > totalPages.value || loading.value) return

        loading.value = true
        error.value = null

        try {
            const data = await $fetch(`https://dragonball-api.com/api/characters?page=${pagina.value}`)
            
            if (pagina.value === 1) {
                personajes.value = data.items
            } else {
                personajes.value = [...personajes.value, ...data.items]
            }
            
            totalPages.value = data.meta.totalPages
            pagina.value++
        } catch (err) {
            error.value = "No se pudieron cargar los personajes. Intente más tarde."
                console.error(err)
            } finally {
                loading.value = false
            }
        }

        const cargarPersonaje = async (id) => {
            loading.value = true
            try {
                const data = await $fetch(`https://dragonball-api.com/api/characters/${id}`)
                personaje.value = data
            } catch (err) {
                error.value = "Error al obtener detalles del personaje."
            } finally {
                loading.value = false
            }
        }

        const aplicarFiltros = async () => {
            loading.value = true
            error.value = null
            
            const params = new URLSearchParams()
            if (filtro.value.race) params.append('race', filtro.value.race)
            if (filtro.value.gender) params.append('gender', filtro.value.gender)
            if (filtro.value.affiliation) params.append('affiliation', filtro.value.affiliation)

            try {
                const data = await $fetch(`https://dragonball-api.com/api/characters?${params.toString()}`)
                
                const resultados = Array.isArray(data) ? data : data.items
                personajes.value = resultados

                if (resultados.length === 0) {
                    error.value = "No se encontraron personajes con esos filtros."
                }

                totalPages.value = 0 
            } catch (err) {
                error.value = "Error al aplicar los filtros."
        } finally {
            loading.value = false
        }
    }

    const formatearPrecio = (ki) => {
        if (!ki || ki.toString().toLowerCase() === 'unknown') return '$1.000'

        let kiString = ki.toString().toLowerCase()
        let kiNumero = 0

        if (kiString.includes('billion')) {
            kiNumero = parseFloat(kiString.replace('billion', '').trim()) * 1_000_000_000
        } else if (kiString.includes('million')) {
            kiNumero = parseFloat(kiString.replace('million', '').trim()) * 1_000_000
        } else {
            kiNumero = Number(kiString.replace(/\./g, ''))
        }

        if (isNaN(kiNumero) || kiNumero <= 0) return '$1.000'

        const precioCalculado = Math.floor(kiNumero / 100000)
        return precioCalculado < 1000 
            ? '$1.000' 
            : `$${precioCalculado.toLocaleString('es-CL')}`
    }

    return {
        personaje,
        personajes,
        filtro,
        pagina,
        totalPages,
        loading, 
        error,   
        cargarPersonaje,
        cargarMas,
        aplicarFiltros,
        formatearPrecio
    }
}