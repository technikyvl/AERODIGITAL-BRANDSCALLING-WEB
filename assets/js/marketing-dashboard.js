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
    const statElements = this.container.querySelectorAll('.marketing-stat-value');
    const statKeys = ['seo', 'ads', 'revenue', 'roi'];
    
    statKeys.forEach((key, index) => {
      const element = statElements[index];
      if (!element) return;
      
      const currentValue = this.stats[key];
      const previousValue = this.previousStats[key];
      
      if (currentValue > previousValue) {
        element.classList.add('highlight-green');
        setTimeout(() => {
          element.classList.remove('highlight-green');
        }, 1000);
      } else if (currentValue < previousValue) {
        element.classList.add('highlight-red');
        setTimeout(() => {
          element.classList.remove('highlight-red');
        }, 1000);
      }
    });
  }
  
  render() {
    this.container.innerHTML = `
      <div class="marketing-dashboard-container">
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
          <div class="marketing-chart-wave-1"></div>
          <div class="marketing-chart-wave-2"></div>
        </div>
      </div>
    `;
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
