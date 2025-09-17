// Cashflow Chart JavaScript
class CashflowChart {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.chart = null;
    
    // Dane: 12 miesięcy (PL)
    this.data = [
      { month: 'STY', value: 2100 },
      { month: 'LUT', value: 2300 },
      { month: 'MAR', value: 1900 },
      { month: 'KWI', value: 4800 },
      { month: 'MAJ', value: 5200 },
      { month: 'CZE', value: 8900 },
      { month: 'LIP', value: 6200 },
      { month: 'SIE', value: 7100 },
      { month: 'WRZ', value: 9400 },
      { month: 'PAŹ', value: 10200 },
      { month: 'LIS', value: 11100 },
      { month: 'GRU', value: 11800 },
    ];
    
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
  
  formatYAxis(value) {
    return `${(value / 1000).toLocaleString('pl-PL')} tys.`;
  }
  
  calculateStats() {
    const totalCash = this.data.reduce((sum, item) => sum + item.value, 0);
    const lastValue = this.data[this.data.length - 1]?.value || 0;
    const prevValue = this.data[this.data.length - 2]?.value || 0;
    const percentageChange = prevValue > 0 ? ((lastValue - prevValue) / prevValue) * 100 : 0;
    
    return { totalCash, lastValue, prevValue, percentageChange };
  }
  
  render() {
    const { totalCash, percentageChange } = this.calculateStats();
    
    this.container.innerHTML = `
      <div class="cashflow-card">
        <div class="cashflow-header">
          <h3 class="cashflow-title">Przepływy pieniężne</h3>
        </div>
        
        <div class="cashflow-content">
          <div class="cashflow-stats">
            <div class="cashflow-date-range">1 sty – 31 gru 2024</div>
            <div class="cashflow-main-stats">
              <div class="cashflow-total">${this.formatCurrency(totalCash)}</div>
              <div class="cashflow-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
                  <polyline points="16,7 22,7 22,13"></polyline>
                </svg>
                ${Math.abs(percentageChange).toFixed(2)}%
              </div>
            </div>
          </div>
          
          <div class="cashflow-chart-wrapper">
            <canvas class="cashflow-chart" id="cashflow-chart-canvas"></canvas>
          </div>
        </div>
      </div>
    `;
  }
  
  createChart() {
    const ctx = document.getElementById('cashflow-chart-canvas');
    if (!ctx) return;
    
    // Gradient dla wypełnienia
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map(item => item.month),
        datasets: [{
          label: 'Przepływy pieniężne',
          data: this.data.map(item => item.value),
          borderColor: '#8b5cf6',
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#8b5cf6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#8b5cf6',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
        }]
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
            callbacks: {
              title: function(context) {
                return 'Suma:';
              },
              label: function(context) {
                const value = context.parsed.y;
                const formatter = new Intl.NumberFormat('pl-PL', { 
                  style: 'currency', 
                  currency: 'PLN', 
                  maximumFractionDigits: 0 
                });
                return formatter.format(value);
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: '#333333',
              drawBorder: false,
              lineWidth: 1,
              drawTicks: false
            },
            ticks: {
              color: '#9ca3af',
              font: {
                size: 12
              },
              padding: 12
            },
            border: {
              display: false
            }
          },
          y: {
            grid: {
              display: true,
              color: '#333333',
              drawBorder: false,
              lineWidth: 1,
              drawTicks: false
            },
            ticks: {
              color: '#9ca3af',
              font: {
                size: 12
              },
              padding: 12,
              callback: function(value) {
                return `${(value / 1000).toLocaleString('pl-PL')} tys.`;
              }
            },
            border: {
              display: false
            },
            beginAtZero: true,
            max: Math.max(...this.data.map(item => item.value)) + 1000
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        elements: {
          point: {
            hoverBackgroundColor: '#8b5cf6',
            hoverBorderColor: '#ffffff',
            hoverBorderWidth: 2
          }
        }
      }
    });
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
  new CashflowChart('cashflow-chart-container');
});
