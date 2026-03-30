# FlashNightRun 2.0 - Landing Page

Landing page moderna y funcional para anunciar una carrera nocturna "FlashNightRun 2.0".

## 🏃‍♂️ Características

### Diseño
- ✅ **Dark Theme** con colores neón (naranja, azul eléctrico, amarillo)
- ✅ **100% Responsive** - se adapta a todos los dispositivos
- ✅ **Animaciones suaves** y efectos visuales modernos
- ✅ **Tipografía Orbitron** para títulos (estilo tecnológico/futurista)
- ✅ Partículas flotantes en el hero section

### Secciones
1. **Navegación** - Sticky con menú hamburguesa en móvil
2. **Hero** - Impactante con información clave y call-to-action
3. **El Evento** - 4 cards explicando la experiencia
4. **Categorías** - 3 distancias (5K, 10K, 21K) con precios
5. **Inscripción** - Formulario wizard de 3 pasos con validación
6. **Cronograma** - Timeline vertical del evento
7. **FAQ** - Acordeón con preguntas frecuentes
8. **Contacto** - Formulario y métodos de contacto
9. **Footer** - Links, newsletter, redes sociales

### Funcionalidades
- ✅ **Formulario Wizard** (3 pasos con validación)
- ✅ **Generación de código de confirmación**
- ✅ **Animación de números** (estadísticas)
- ✅ **FAQ Accordion** interactivo
- ✅ **Scroll suave** entre secciones
- ✅ **Back to Top** button
- ✅ **Validación de formularios** completa
- ✅ **Navbar** que cambia al hacer scroll
- ✅ **Partículas animadas** en hero
- ✅ **Modal** para mensajes

## 📁 Estructura de Archivos

```
flashnightrun-2.0/
├── index.html   # Estructura HTML completa
├── styles.css   # Todos los estilos CSS
├── script.js    # Funcionalidades JavaScript
└── README.md    # Este archivo
```

## 🚀 Cómo Usar

### Opción 1: Abrir directamente
1. Abre `index.html` en tu navegador
2. ¡Listo! La página está completamente funcional

### Opción 2: Servidor local
```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js
npx serve .

# PHP
php -S localhost:8000
```
Luego abre `http://localhost:8000`

## 🎨 Personalización

### Colores
Edita las variables CSS en `styles.css` (líneas 1-20):
```css
:root {
    --primary: #ff6b35;        /* Naranja principal */
    --secondary: #00d4ff;      /* Azul eléctrico */
    --accent: #ffd700;         /* Amarillo dorado */
    --dark: #0a0a1a;           /* Fondo oscuro */
}
```

### Contenido
- **Texto, fechas y precios**: Editarlos directamente en `index.html`
- **Distancias y precios**: Modificar en `script.js` función `getDistanciaPrecio`
- **Cronograma**: Editar en la sección `#cronograma` del HTML

### Imágenes
Para agregar imágenes, reemplaza los emojis (📍, ⏰, 📅) con:
```html
<img src="ruta/imagen.jpg" alt="Descripción">
```

## ✅ Formulario de Inscripción

El formulario incluye:
1. **Paso 1**: Datos personales (nombre, email, teléfono, fecha nac, género)
2. **Paso 2**: Selección de distancia y talla de camiseta
3. **Paso 3**: Datos médicos y contacto de emergencia

**Validaciones**:
- Campos requeridos
- Formato de email válido
- Selección obligatoria de distancia y talla
- Checkbox de términos y condiciones
- Formateo automático de teléfono

**Resultado**: Genera código de confirmación único en formato `FNR-XXXXXX-XXXX`

## 📱 Mobile Responsive

- Menu hamburguesa en pantallas < 768px
- Stack vertical de elementos en móvil
- Botones a ancho completo
- Timeline adaptado a una sola columna

## 🔧 Debug

Abre la consola del navegador (F12) para ver:
- Logs de envío de formulario
- Códigos de confirmación generados
- Datos capturados

## 🎯 Funcionalidades Destacadas

1. **Efecto parallax** en hero section
2. **Stats animados** cuando se hacen visibles
3. **Particles flotantes** con CSS animations
4. **Form wizard validado** paso a paso
5. **FAQ interactivo** con transiciones suaves
6. **Navbar glassmorphism** con backdrop-filter
7. **Gradients CSS** en botones y efectos
8. **Easter egg** con el código Konami

## 📝 ToDos (Opcional)

Si quieres extender la landing page:

- [ ] Conectar formulario con backend real
- [ ] Integrar pasarela de pagos (Stripe, PayPal)
- [ ] Agregar mapa interactivo de la ruta
- [ ] Sistema de referidos
- [ ] Área de participantes (login)
- [ ] App de seguimiento de entrenamiento
- [ ] Galería de fotos de ediciones anteriores
- [ ] Live tracking el día de la carrera

## 📄 Licencia

Este proyecto está listo para usar. Modifícalo según tus necesidades.

---

**Desarrollado con ❤️ para FlashNightRun 2.0**
