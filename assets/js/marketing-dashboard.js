// Marketing Dashboard JavaScript
class MarketingDashboard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.stats = {
      seo: 84000,
      ads: 71000,
      revenue: 248000,
      roi: 147
    };
    this.previousStats = { ...this.stats };
    this.intervalId = null;
    
    this.init();
  }
  
  init() {
    this.render();
    this.startUpdates();
    // Ensure dashboard is always visible
    this.container.style.display = 'block';
    this.container.style.opacity = '1';
  }
  
  formatNumber(value) {
    return value.toLocaleString('pl-PL');
  }
  
  formatCurrency(value) {
    return value.toLocaleString('pl-PL') + ' zł';
  }
  
  getRandomDelta() {
    return Math.floor(Math.random() * 200 - 100);
  }
  
  getRandomDeltaSmall() {
    return Math.floor(Math.random() * 2 - 1);
  }
  
  updateStats() {
    const newStats = {
      seo: Math.max(0, this.stats.seo + this.getRandomDelta()),
      ads: Math.max(0, this.stats.ads + this.getRandomDelta()),
      revenue: Math.max(0, this.stats.revenue + this.getRandomDelta() * 5),
      roi: Math.max(0, this.stats.roi + this.getRandomDeltaSmall())
    };
    
    this.previousStats = { ...this.stats };
    this.stats = newStats;
    
    this.render();
    this.highlightChanges();
  }
  
  highlightChanges() {
    const statItems = this.container.querySelectorAll('.marketing-stat-item');
    const statKeys = ['seo', 'ads', 'revenue', 'roi'];
    
    statKeys.forEach((key, index) => {
      const itemElement = statItems[index];
      if (!itemElement) return;
      
      const currentValue = this.stats[key];
      const previousValue = this.previousStats[key];
      
      // Remove any existing animation classes and reset color
      itemElement.classList.remove('highlight-green', 'highlight-red');
      itemElement.style.color = '#ffffff';
      itemElement.style.textShadow = 'none';
      
      if (currentValue > previousValue) {
        // Add green color and animation to entire stat item
        itemElement.classList.add('highlight-green');
        itemElement.style.color = '#22c55e';
        itemElement.style.textShadow = 'none';
        itemElement.style.animation = 'numberIncrease 1s ease-in-out';
        setTimeout(() => {
          itemElement.style.animation = '';
          itemElement.classList.remove('highlight-green');
          itemElement.style.color = '#ffffff';
          itemElement.style.textShadow = 'none';
        }, 1000);
      } else if (currentValue < previousValue) {
        // Add red color and animation to entire stat item
        itemElement.classList.add('highlight-red');
        itemElement.style.color = '#ef4444';
        itemElement.style.textShadow = '0 0 15px rgba(239, 68, 68, 0.8)';
        itemElement.style.animation = 'numberDecrease 1s ease-in-out';
        setTimeout(() => {
          itemElement.style.animation = '';
          itemElement.classList.remove('highlight-red');
          itemElement.style.color = '#ffffff';
          itemElement.style.textShadow = 'none';
        }, 1000);
      }
    });
  }
  
  render() {
    // Only update if container exists and is visible
    if (!this.container) return;
    
    this.container.innerHTML = `
      <div class="marketing-dashboard-container" style="opacity: 1; display: block;">
        <h3 class="marketing-dashboard-header">Wyniki marketingowe (SEO + Ads)</h3>
        
        <div class="marketing-dashboard-stats">
          <div class="marketing-stat-item">
            <div class="marketing-stat-value">${this.formatNumber(this.stats.seo)}</div>
            <div class="marketing-stat-label">Ruch SEO</div>
          </div>
          
          <div class="marketing-stat-item">
            <div class="marketing-stat-value">${this.formatNumber(this.stats.ads)}</div>
            <div class="marketing-stat-label">Kliknięcia reklam</div>
          </div>
          
          <div class="marketing-stat-item">
            <div class="marketing-stat-value">${this.formatCurrency(this.stats.revenue)}</div>
            <div class="marketing-stat-label">Przychód</div>
          </div>
          
          <div class="marketing-stat-item">
            <div class="marketing-stat-value">${this.stats.roi}%</div>
            <div class="marketing-stat-label">ROI</div>
          </div>
        </div>
        
        <div class="marketing-dashboard-chart">
          <canvas class="marketing-chart-canvas" id="marketing-chart-canvas"></canvas>
        </div>
      </div>
    `;
    
    // Render chart immediately
    requestAnimationFrame(() => this.createChart());
  }
  
  createChart() {
    const canvas = document.getElementById('marketing-chart-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Chart data - 6 months
    const months = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE'];
    const seoData = [78000, 82000, 69000, 61000, 75000, 84000];
    const adsData = [65000, 68500, 54000, 47000, 62000, 71000];
    
    // Normalize data to fit chart
    const maxValue = Math.max(...seoData, ...adsData);
    const minValue = Math.min(...seoData, ...adsData);
    const range = maxValue - minValue;
    const padding = 60; // większy padding dla większego wykresu
    const chartWidth = rect.width - padding * 2;
    const chartHeight = rect.height - padding * 2;
    
          // Draw grid
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.lineWidth = 1;
          
          // Horizontal grid lines
          for (let i = 0; i <= 4; i++) {
            const y = padding + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(padding + chartWidth, y);
            ctx.stroke();
          }
          
          // Vertical grid lines
          for (let i = 0; i <= 5; i++) {
            const x = padding + (chartWidth / 5) * i;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, padding + chartHeight);
            ctx.stroke();
          }
    
          // Draw SEO line
          ctx.strokeStyle = '#818cf8';
          ctx.lineWidth = 4; // grubsza linia dla większego wykresu
          ctx.beginPath();
          
          for (let i = 0; i < seoData.length; i++) {
            const x = padding + (chartWidth / 5) * i;
            const normalizedValue = (seoData[i] - minValue) / range;
            const y = padding + chartHeight - (normalizedValue * chartHeight);
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
          
          // Draw Ads line
          ctx.strokeStyle = '#6366f1';
          ctx.lineWidth = 4; // grubsza linia dla większego wykresu
          ctx.beginPath();
          
          for (let i = 0; i < adsData.length; i++) {
            const x = padding + (chartWidth / 5) * i;
            const normalizedValue = (adsData[i] - minValue) / range;
            const y = padding + chartHeight - (normalizedValue * chartHeight);
            
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
    
          // Draw data points
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 3; // grubsza obwódka dla większego wykresu
          
          // SEO points
          for (let i = 0; i < seoData.length; i++) {
            const x = padding + (chartWidth / 5) * i;
            const normalizedValue = (seoData[i] - minValue) / range;
            const y = padding + chartHeight - (normalizedValue * chartHeight);
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI); // większe punkty
            ctx.fill();
            ctx.stroke();
          }
          
          // Ads points
          for (let i = 0; i < adsData.length; i++) {
            const x = padding + (chartWidth / 5) * i;
            const normalizedValue = (adsData[i] - minValue) / range;
            const y = padding + chartHeight - (normalizedValue * chartHeight);
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI); // większe punkty
            ctx.fill();
            ctx.stroke();
          }
    
    // Draw month labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px Inter, sans-serif'; // większa czcionka dla większego wykresu
    ctx.textAlign = 'center';
    
    for (let i = 0; i < months.length; i++) {
      const x = padding + (chartWidth / 5) * i;
      const y = padding + chartHeight + 20;
      ctx.fillText(months[i], x, y);
    }
  }
  
  startUpdates() {
    // Update every 3-5 seconds
    const updateInterval = () => {
      const delay = 3000 + Math.random() * 2000; // 3-5 seconds
      this.intervalId = setTimeout(() => {
        this.updateStats();
        updateInterval();
      }, delay);
    };
    
    updateInterval();
  }
  
  destroy() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new MarketingDashboard('marketing-dashboard-container');
});
