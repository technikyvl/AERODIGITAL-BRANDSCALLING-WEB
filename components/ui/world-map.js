// World Map Component - Vanilla JavaScript Version
class WorldMap {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      lineColor: '#0ea5e9',
      showLabels: true,
      labelClassName: 'text-sm',
      animationDuration: 2,
      loop: true,
      dots: [],
      ...options
    };
    
    this.hoveredLocation = null;
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    // Wait for DottedMap to load
    if (typeof DottedMap === 'undefined') {
      setTimeout(() => this.init(), 100);
      return;
    }
    
    this.createMap();
    this.startAnimations();
  }
  
  createMap() {
    // Create map instance
    const map = new DottedMap({ height: 100, grid: 'diagonal' });
    
    // Get SVG map
    const svgMap = map.getSVG({
      radius: 0.22,
      color: '#FFFFFF40', // Light gray/white tone
      shape: 'circle',
      backgroundColor: 'black',
    });
    
    // Create main container
    const mapContainer = document.createElement('div');
    mapContainer.className = 'w-full aspect-[2/1] bg-black rounded-lg relative overflow-hidden';
    
    // Add background map image
    const mapImage = document.createElement('img');
    mapImage.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`;
    mapImage.className = 'h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-cover';
    mapImage.alt = 'world map';
    mapImage.height = 495;
    mapImage.width = 1056;
    mapImage.draggable = false;
    
    mapContainer.appendChild(mapImage);
    
    // Create SVG overlay
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 800 400');
    svg.className = 'w-full h-full absolute inset-0 pointer-events-auto select-none';
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    
    // Add gradient and filter definitions
    this.addSVGDefinitions(svg);
    
    // Add paths and points
    this.addPathsAndPoints(svg);
    
    mapContainer.appendChild(svg);
    
    // Add mobile tooltip
    this.addMobileTooltip(mapContainer);
    
    // Clear existing content and add new map
    this.container.innerHTML = '';
    this.container.appendChild(mapContainer);
  }
  
  addSVGDefinitions(svg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Path gradient
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'path-gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');
    
    const stops = [
      { offset: '0%', color: 'white', opacity: '0' },
      { offset: '5%', color: this.options.lineColor, opacity: '1' },
      { offset: '95%', color: this.options.lineColor, opacity: '1' },
      { offset: '100%', color: 'white', opacity: '0' }
    ];
    
    stops.forEach(stop => {
      const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stopElement.setAttribute('offset', stop.offset);
      stopElement.setAttribute('stop-color', stop.color);
      stopElement.setAttribute('stop-opacity', stop.opacity);
      gradient.appendChild(stopElement);
    });
    
    defs.appendChild(gradient);
    
    // Glow filter
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'glow');
    
    const morph = document.createElementNS('http://www.w3.org/2000/svg', 'feMorphology');
    morph.setAttribute('operator', 'dilate');
    morph.setAttribute('radius', '0.5');
    
    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '1');
    blur.setAttribute('result', 'coloredBlur');
    
    const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const mergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeNode1.setAttribute('in', 'coloredBlur');
    const mergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    mergeNode2.setAttribute('in', 'SourceGraphic');
    
    merge.appendChild(mergeNode1);
    merge.appendChild(mergeNode2);
    
    filter.appendChild(morph);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    
    svg.appendChild(defs);
  }
  
  addPathsAndPoints(svg) {
    this.options.dots.forEach((dot, i) => {
      const startPoint = this.projectPoint(dot.start.lat, dot.start.lng);
      const endPoint = this.projectPoint(dot.end.lat, dot.end.lng);
      
      // Create path group
      const pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      pathGroup.setAttribute('key', `path-${i}`);
      
      // Create path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', this.createCurvedPath(startPoint, endPoint));
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'url(#path-gradient)');
      path.setAttribute('stroke-width', '1');
      
      // Animate path
      path.style.strokeDasharray = '1000';
      path.style.strokeDashoffset = '1000';
      
      pathGroup.appendChild(path);
      svg.appendChild(pathGroup);
      
      // Create points group
      const pointsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      pointsGroup.setAttribute('key', `points-${i}`);
      
      // Start point
      const startGroup = this.createPointGroup(startPoint, dot.start.label, 'start', i);
      pointsGroup.appendChild(startGroup);
      
      // End point
      const endGroup = this.createPointGroup(endPoint, dot.end.label, 'end', i);
      pointsGroup.appendChild(endGroup);
      
      svg.appendChild(pointsGroup);
    });
  }
  
  createPointGroup(point, label, type, index) {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.className = 'cursor-pointer';
    
    // Main circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', '3');
    circle.setAttribute('fill', this.options.lineColor);
    circle.setAttribute('filter', 'url(#glow)');
    
    // Pulsing circle
    const pulseCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulseCircle.setAttribute('cx', point.x);
    pulseCircle.setAttribute('cy', point.y);
    pulseCircle.setAttribute('r', '3');
    pulseCircle.setAttribute('fill', this.options.lineColor);
    pulseCircle.setAttribute('opacity', '0.5');
    
    // Pulsing animation
    const animate1 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate1.setAttribute('attributeName', 'r');
    animate1.setAttribute('from', '3');
    animate1.setAttribute('to', '12');
    animate1.setAttribute('dur', '2s');
    animate1.setAttribute('begin', type === 'start' ? '0s' : '0.5s');
    animate1.setAttribute('repeatCount', 'indefinite');
    
    const animate2 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate2.setAttribute('attributeName', 'opacity');
    animate2.setAttribute('from', '0.6');
    animate2.setAttribute('to', '0');
    animate2.setAttribute('dur', '2s');
    animate2.setAttribute('begin', type === 'start' ? '0s' : '0.5s');
    animate2.setAttribute('repeatCount', 'indefinite');
    
    pulseCircle.appendChild(animate1);
    pulseCircle.appendChild(animate2);
    
    group.appendChild(circle);
    group.appendChild(pulseCircle);
    
    // Add hover events
    group.addEventListener('mouseenter', () => {
      this.hoveredLocation = label || `${type} ${index}`;
      this.updateTooltip();
    });
    
    group.addEventListener('mouseleave', () => {
      this.hoveredLocation = null;
      this.updateTooltip();
    });
    
    // Add label if enabled and exists
    if (this.options.showLabels && label) {
      const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
      foreignObject.setAttribute('x', point.x - 60);
      foreignObject.setAttribute('y', point.y - 35);
      foreignObject.setAttribute('width', '120');
      foreignObject.setAttribute('height', '30');
      
      const labelDiv = document.createElement('div');
      labelDiv.className = 'flex items-center justify-center h-full';
      
      const labelSpan = document.createElement('span');
      labelSpan.className = `px-2 py-0.5 rounded-md bg-white/95 text-black border border-gray-200 shadow-sm ${this.options.labelClassName}`;
      labelSpan.textContent = label;
      
      labelDiv.appendChild(labelSpan);
      foreignObject.appendChild(labelDiv);
      group.appendChild(foreignObject);
    }
    
    return group;
  }
  
  addMobileTooltip(container) {
    const tooltip = document.createElement('div');
    tooltip.id = 'mobile-tooltip';
    tooltip.className = 'absolute bottom-4 left-4 bg-white/90 text-black px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm sm:hidden border border-gray-200 opacity-0 transition-opacity duration-200';
    container.appendChild(tooltip);
  }
  
  updateTooltip() {
    const tooltip = document.getElementById('mobile-tooltip');
    if (!tooltip) return;
    
    if (this.hoveredLocation) {
      tooltip.textContent = this.hoveredLocation;
      tooltip.style.opacity = '1';
    } else {
      tooltip.style.opacity = '0';
    }
  }
  
  startAnimations() {
    if (!this.options.loop) return;
    
    const staggerDelay = 0.3;
    const totalAnimationTime = this.options.dots.length * staggerDelay + this.options.animationDuration;
    const pauseTime = 2;
    const fullCycleDuration = totalAnimationTime + pauseTime;
    
    const animate = () => {
      this.options.dots.forEach((dot, i) => {
        const startTime = (i * staggerDelay) / fullCycleDuration;
        const endTime = (i * staggerDelay + this.options.animationDuration) / fullCycleDuration;
        const resetTime = totalAnimationTime / fullCycleDuration;
        
        const path = document.querySelector(`g[key="path-${i}"] path`);
        if (path) {
          // Reset animation
          path.style.strokeDashoffset = '1000';
          
          // Animate
          setTimeout(() => {
            path.style.transition = `stroke-dashoffset ${this.options.animationDuration}s ease-in-out`;
            path.style.strokeDashoffset = '0';
          }, startTime * fullCycleDuration * 1000);
          
          // Reset
          setTimeout(() => {
            path.style.transition = `stroke-dashoffset 0.5s ease-in-out`;
            path.style.strokeDashoffset = '1000';
          }, resetTime * fullCycleDuration * 1000);
        }
      });
      
      this.animationId = setTimeout(animate, fullCycleDuration * 1000);
    };
    
    animate();
  }
  
  projectPoint(lat, lng) {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }
  
  createCurvedPath(start, end) {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }
  
  destroy() {
    if (this.animationId) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }
  }
}

// Export for use
window.WorldMap = WorldMap;
