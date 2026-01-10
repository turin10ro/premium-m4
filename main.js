/**
 * Datos del Menú: Array de objetos que representa la carta del restaurante
 */
const menuData = [
    {
        id: 1,
        name: "Carpaccio de Res",
        category: "entradas",
        price: "18.50",
        description: "Finas láminas de solomillo con alcaparras, lascas de parmesano y aceite de trufa blanca.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Salmón al Eneldo",
        category: "principales",
        price: "29.00",
        description: "Salmón noruego a la parrilla con costra de hierbas, acompañado de espárragos trigueros.",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Risotto de Hongos",
        category: "principales",
        price: "24.00",
        description: "Arroz arborio cremoso con selección de hongos silvestres y aceite de porcini.",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Mousse de Chocolate",
        category: "postres",
        price: "12.00",
        description: "70% cacao belga con un toque de sal marina y frutos rojos frescos.",
        image: "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Cóctel de Autor",
        category: "bebidas",
        price: "14.50",
        description: "Ginebra premium infusionada con botánicos, tónica artesanal y cítricos deshidratados.",
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        name: "Burrata Pugliese",
        category: "entradas",
        price: "16.00",
        description: "Corazón cremoso con tomates cherry confitados y pesto de albahaca fresca.",
        image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=800&q=80"
    }
];

/**
 * Función para renderizar dinámicamente los platos en el HTML
 */
function renderMenu(items) {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-card animate-fade group" data-category="${item.category}">
            <div class="relative overflow-hidden h-48">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute top-4 right-4 bg-white/90 dark:bg-black/80 px-3 py-1 rounded-full font-bold text-[var(--accent)]">
                    $${item.price}
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-serif font-bold">${item.name}</h3>
                </div>
                <button 
                    onclick="toggleDescription(this)" 
                    class="text-xs uppercase tracking-widest text-[var(--accent)] font-bold mb-3 focus:outline-none"
                >
                    Ver Detalles
                </button>
                <div class="description">
                    <p class="text-[var(--text-muted)] text-sm leading-relaxed">
                        ${item.description}
                    </p>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Lógica de filtrado por categoría
 */
function filterMenu(category, btn) {
    // Actualizar estado visual de los botones
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filtrar los datos
    const filtered = category === 'todos' 
        ? menuData 
        : menuData.filter(item => item.category === category);
    
    // Animación de salida y entrada del grid
    const grid = document.getElementById('menu-grid');
    grid.style.opacity = '0';
    
    setTimeout(() => {
        renderMenu(filtered);
        grid.style.opacity = '1';
    }, 300);
}

/**
 * Función para mostrar/ocultar la descripción del plato
 */
function toggleDescription(btn) {
    const desc = btn.nextElementSibling;
    const isShowing = desc.classList.contains('show');
    
    desc.classList.toggle('show');
    btn.textContent = isShowing ? "Ver Detalles" : "Ocultar Detalles";
}

/**
 * Lógica del Modo Oscuro con persistencia en localStorage
 */
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * Inicialización al cargar la ventana
 */
window.onload = () => {
    // Aplicar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Cargar menú completo al inicio
    renderMenu(menuData);
};

/**
 * Efecto visual del Header al hacer scroll
 */
window.onscroll = () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('shadow-md', 'py-2');
        header.classList.remove('py-4');
    } else {
        header.classList.remove('shadow-md', 'py-2');
        header.classList.add('py-4');
    }
};