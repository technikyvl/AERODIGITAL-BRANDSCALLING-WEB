// Marketing Chart JavaScript
class MarketingChart {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.chart = null;
    
    // Dane: miesiące po polsku, 6 ostatnich
    this.data = [
      { period: 'Styczeń', seoTraffic: 78000, adClicks: 65000, revenue: 210000, roi: 130 },
      { period: 'Luty',    seoTraffic: 82000, adClicks: 68500, revenue: 228000, roi: 138 },
      { period: 'Marzec',  seoTraffic: 69000, adClicks: 54000, revenue: 190000, roi: 122 },
      { period: 'Kwiecień',seoTraffic: 61000, adClicks: 47000, revenue: 176000, roi: 118 },
      { period: 'Maj',     seoTraffic: 75000, adClicks: 62000, revenue: 235000, roi: 142 },
      { period: 'Czerwiec',seoTraffic: 84000, adClicks: 71000, revenue: 248000, roi: 147 },
    ];
    
    this.colors = {
      seoTraffic: '#818cf8',  // indigo-400
      adClicks: '#6366f1',    // indigo-500
      revenue: '#4f46e5',     // indigo-600
      roi: '#4338ca'          // indigo-700
    };
    
    this.init();
  }
  
  init() {
    this.render();
    this.createChart();
  }
  
  formatCurrency(value) {
    return new Intl.NumberFormat('pl-PL', { 
      style: 'currency', 
      currency: 'PLN', 
      maximumFractionDigits: 0 
    }).format(value);
  }
  
  formatNumber(value) {
    return value.toLocaleString('pl-PL');
  }
  
  calculateStats() {
    const latest = this.data[this.data.length - 1];
    // Symulowane zmiany (zawsze zielone)
    const changes = { seoTraffic: 12, adClicks: 9, revenue: 7, roi: 3 };
    
    return {
      seoTraffic: { value: latest.seoTraffic, change: changes.seoTraffic },
      adClicks: { value: latest.adClicks, change: changes.adClicks },
      revenue: { value: latest.revenue, change: changes.revenue },
      roi: { value: latest.roi, change: changes.roi }
    };
  }
  
  render() {
    const stats = this.calculateStats();
    
    this.container.innerHTML = `
      <div class="marketing-card">
        <div class="marketing-header">
          <h3 class="marketing-title">Wyniki marketingu (SEO + Ads)</h3>
        </div>
        
        <div class="marketing-content">
          <div class="marketing-stats">
            <div class="marketing-stats-grid">
              <div class="marketing-stat-item">
                <div class="marketing-stat-bar"></div>
                <div class="marketing-stat-content">
                  <div class="marketing-stat-label">Ruch SEO</div>
                  <div class="marketing-stat-value">
                    <span class="marketing-stat-number">${this.formatNumber(stats.seoTraffic.value)}</span>
                    <span class="marketing-stat-change">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
                        <polyline points="16,7 22,7 22,13"></polyline>
                      </svg>
                      ${stats.seoTraffic.change}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="marketing-stat-item">
                <div class="marketing-stat-bar"></div>
                <div class="marketing-stat-content">
                  <div class="marketing-stat-label">Kliknięcia reklam</div>
                  <div class="marketing-stat-value">
                    <span class="marketing-stat-number">${this.formatNumber(stats.adClicks.value)}</span>
                    <span class="marketing-stat-change">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
                        <polyline points="16,7 22,7 22,13"></polyline>
                      </svg>
                      ${stats.adClicks.change}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="marketing-stat-item">
                <div class="marketing-stat-bar"></div>
                <div class="marketing-stat-content">
                  <div class="marketing-stat-label">Przychód</div>
                  <div class="marketing-stat-value">
                    <span class="marketing-stat-number">${this.formatCurrency(stats.revenue.value)}</span>
                    <span class="marketing-stat-change">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
                        <polyline points="16,7 22,7 22,13"></polyline>
                      </svg>
                      ${stats.revenue.change}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="marketing-stat-item">
                <div class="marketing-stat-bar"></div>
                <div class="marketing-stat-content">
                  <div class="marketing-stat-label">ROI</div>
                  <div class="marketing-stat-value">
                    <span class="marketing-stat-number">${stats.roi.value}%</span>
                    <span class="marketing-stat-change">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
                        <polyline points="16,7 22,7 22,13"></polyline>
                      </svg>
                      ${stats.roi.change}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="marketing-chart-wrapper">
            <canvas class="marketing-chart" id="marketing-chart-canvas"></canvas>
          </div>
        </div>
      </div>
    `;
  }
  
  createChart() {
    const ctx = document.getElementById('marketing-chart-canvas');
    if (!ctx) return;
    
    // Gradienty dla wypełnienia
    const gradients = {
      seoTraffic: this.createGradient(ctx, this.colors.seoTraffic, 0.5),
      adClicks: this.createGradient(ctx, this.colors.adClicks, 0.4),
      revenue: this.createGradient(ctx, this.colors.revenue, 0.3),
      roi: this.createGradient(ctx, this.colors.roi, 0.2)
    };
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map(item => item.period),
        datasets: [
          {
            label: 'Ruch SEO',
            data: this.data.map(item => item.seoTraffic),
            borderColor: this.colors.seoTraffic,
            backgroundColor: gradients.seoTraffic,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          },
          {
            label: 'Kliknięcia reklam',
            data: this.data.map(item => item.adClicks),
            borderColor: this.colors.adClicks,
            backgroundColor: gradients.adClicks,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          },
          {
            label: 'Przychód (PLN)',
            data: this.data.map(item => item.revenue),
            borderColor: this.colors.revenue,
            backgroundColor: gradients.revenue,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          },
          {
            label: 'ROI (%)',
            data: this.data.map(item => item.roi),
            borderColor: this.colors.roi,
            backgroundColor: gradients.roi,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 4,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1a1a1a',
            titleColor: '#9ca3af',
            bodyColor: '#ffffff',
            borderColor: '#333333',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            titleFont: {
              size: 12,
              weight: '500'
            },
            bodyFont: {
              size: 14,
              weight: '600'
            },
            custom: (context) => {
              const { chart, tooltip } = context;
              const { dataPoints } = tooltip;
              
              if (!dataPoints || dataPoints.length === 0) return null;
              
              const tooltipEl = document.createElement('div');
              tooltipEl.className = 'chartjs-tooltip';
              
              const dataPoint = dataPoints[0];
              const dataIndex = dataPoint.dataIndex;
              const data = chart.data.datasets.map(dataset => ({
                label: dataset.label,
                value: dataset.data[dataIndex],
                color: dataset.borderColor
              }));
              
              tooltipEl.innerHTML = `
                <div class="tooltip-row">
                  <div class="tooltip-label">
                    <div class="tooltip-dot" style="background-color: ${data[0].color}"></div>
                    <span class="tooltip-text">Ruch SEO</span>
                  </div>
                  <span class="tooltip-value">${this.formatNumber(data[0].value)}</span>
                </div>
                <div class="tooltip-row">
                  <div class="tooltip-label">
                    <div class="tooltip-dot" style="background-color: ${data[1].color}"></div>
                    <span class="tooltip-text">Kliknięcia reklam</span>
                  </div>
                  <span class="tooltip-value">${this.formatNumber(data[1].value)}</span>
                </div>
                <div class="tooltip-row">
                  <div class="tooltip-label">
                    <div class="tooltip-dot" style="background-color: ${data[2].color}"></div>
                    <span class="tooltip-text">Przychód</span>
                  </div>
                  <span class="tooltip-value">${this.formatCurrency(data[2].value)}</span>
                </div>
                <div class="tooltip-row">
                  <div class="tooltip-label">
                    <div class="tooltip-dot" style="background-color: ${data[3].color}"></div>
                    <span class="tooltip-text">ROI</span>
                  </div>
                  <span class="tooltip-value">${data[3].value}%</span>
                </div>
              `;
              
              return tooltipEl;
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9ca3af',
              font: {
                size: 12
              },
              padding: 10
            },
            border: {
              display: false
            }
          },
          y: {
            display: false
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }
  
  createGradient(ctx, color, opacity) {
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
    gradient.addColorStop(1, color + '00');
    return gradient;
  }
  
  destroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new MarketingChart('marketing-chart-container');
});
