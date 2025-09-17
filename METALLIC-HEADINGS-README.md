# Metaliczne Nagłówki z Animacją Wyjścia z Cienia

## Opis
Implementacja metalicznego, prestiżowego stylu fontu dla wszystkich nagłówków na stronie z płynną animacją "reveal from shadow" (wyjście z cienia). Efekt jest lekki, nowoczesny i zoptymalizowany pod kątem wydajności.

## Funkcjonalności

### 🎨 Metaliczny Styl Fontu
- **Gradient metaliczny**: Wielowarstwowy gradient imitujący metal
- **Efekt świecenia**: Subtelne cienie i blask dla prestiżowego wyglądu
- **Responsywność**: Automatyczne dostosowanie do różnych rozmiarów ekranu
- **Czcionka**: Orbitron + Urbanist dla nowoczesnego, technologicznego wyglądu

### ✨ Animacja Wyjścia z Cienia
- **Reveal from shadow**: Nagłówki pojawiają się z cienia z efektem rozmycia
- **Intersection Observer**: Nowoczesne API do wykrywania widoczności
- **Staggered animation**: Opóźnione animacje dla wielu nagłówków
- **Smooth transitions**: Płynne przejścia z cubic-bezier easing

### ⚡ Optymalizacja Wydajności
- **Hardware acceleration**: Wykorzystanie GPU do animacji
- **Lazy loading**: Animacje uruchamiane tylko gdy potrzebne
- **Reduced motion support**: Respektowanie preferencji użytkownika
- **Lightweight**: Minimalny wpływ na wydajność strony

## Pliki

### CSS (`assets/css/metallic-headings.css`)
```css
.metallic-heading {
  /* Metaliczny gradient i efekty */
  background: linear-gradient(135deg, #ffffff 0%, #495057 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.metallic-heading.reveal-from-shadow {
  /* Stan przed animacją */
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  filter: blur(8px) brightness(0.3);
}

.metallic-heading.reveal-from-shadow.revealed {
  /* Stan po animacji */
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0) brightness(1);
}
```

### JavaScript (`assets/js/metallic-headings.js`)
```javascript
class MetallicHeadings {
  constructor() {
    this.headings = [];
    this.observer = null;
    this.init();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.revealHeading(entry.target);
        }
      });
    }, { threshold: 0.1 });
  }
}
```

## Instalacja

### 1. Dodaj pliki CSS i JS
```html
<link rel="stylesheet" href="assets/css/metallic-headings.css">
<script src="assets/js/metallic-headings.js"></script>
```

### 2. Dodaj klasy do nagłówków
```html
<!-- Automatyczne wykrywanie -->
<h1 class="metallic-heading large reveal-from-shadow">Tytuł</h1>
<h2 class="metallic-heading reveal-from-shadow">Podtytuł</h2>

<!-- Lub użyj selektorów w JavaScript -->
<script>
// Automatycznie znajdzie wszystkie h1, h2, h3, h4, h5, h6
// oraz elementy z klasami: .cs_section_title, .cs_hero_number, .cs_fs_50, .cs_fs_70
</script>
```

## Użycie

### Automatyczne Wykrywanie
Skrypt automatycznie znajdzie i zastosuje efekt do:
- Wszystkich nagłówków `h1`, `h2`, `h3`, `h4`, `h5`, `h6`
- Elementów z klasami: `.cs_section_title`, `.cs_hero_number`, `.cs_fs_50`, `.cs_fs_70`

### Ręczne Dodawanie
```javascript
// Dodaj efekt do konkretnego elementu
MetallicHeadings.addHeading(document.getElementById('my-heading'));

// Uruchom wszystkie animacje od razu
MetallicHeadings.revealAll();

// Zatrzymaj i wyczyść
MetallicHeadings.destroy();
```

## Klasy CSS

### Podstawowe Klasy
- `.metallic-heading` - Podstawowy metaliczny styl
- `.metallic-heading.large` - Większy rozmiar z dodatkowymi efektami
- `.metallic-heading.reveal-from-shadow` - Animacja wyjścia z cienia
- `.metallic-heading.revealed` - Stan po animacji
- `.metallic-heading.animated-shine` - Dodatkowa animacja świecenia

### Efekty Hover
```css
.metallic-heading:hover {
  transform: translateY(-2px) scale(1.02);
  background-position: 100% 100%;
}
```

## Responsywność

### Breakpointy
```css
@media (max-width: 768px) {
  .metallic-heading {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
  }
}

@media (max-width: 480px) {
  .metallic-heading {
    font-size: clamp(1.2rem, 5vw, 2rem);
  }
}
```

## Dostępność

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .metallic-heading.reveal-from-shadow {
    transition: opacity 0.3s ease;
    transform: none;
    filter: none;
  }
}
```

### High Contrast
```css
@media (prefers-contrast: high) {
  .metallic-heading {
    background: none;
    -webkit-text-fill-color: initial;
    color: #000000;
    text-shadow: none;
  }
}
```

## Demo
Otwórz `metallic-demo.html` aby zobaczyć wszystkie efekty w akcji.

## Wsparcie Przeglądarek
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Wydajność
- **Rozmiar CSS**: ~3KB (minified)
- **Rozmiar JS**: ~2KB (minified)
- **Czas inicjalizacji**: <50ms
- **FPS animacji**: 60fps (z hardware acceleration)

## Licencja
MIT License - można swobodnie używać w projektach komercyjnych i niekomercyjnych.
