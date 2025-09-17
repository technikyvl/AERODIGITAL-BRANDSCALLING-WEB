// Leads Table JavaScript
class LeadsTable {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.leads = [
      { id: "1", name: "Andy Shepard", email: "a.shepard@gmail.com", source: "ORGANIC", sourceType: "organic", status: "pre-sale", size: 120000, interest: [45, 52, 48, 55, 58, 60, 57, 62, 65, 63], probability: "mid", lastAction: "12 wrz 2024" },
      { id: "2", name: "Emily Thompson", email: "e.thompson@gmail.com", source: "SB2024", sourceType: "campaign", status: "closed", size: 200000, interest: [30, 35, 42, 48, 55, 62, 68, 70, 75, 78], probability: "high", lastAction: "13 wrz 2024" },
      { id: "3", name: "Michael Carter", email: "m.carter@gmail.com", source: "SUMMER2", sourceType: "campaign", status: "pre-sale", size: 45000, interest: [70, 68, 65, 60, 58, 55, 52, 48, 45, 42], probability: "low", lastAction: "12 wrz 2024" },
      { id: "4", name: "David Anderson", email: "d.anderson@gmail.com", source: "DTJ25", sourceType: "campaign", status: "pre-sale", size: 80000, interest: [25, 28, 32, 38, 45, 52, 58, 62, 68, 70], probability: "high", lastAction: "12 wrz 2024" },
      { id: "5", name: "Lily Hernandez", email: "l.hernandez@gmail.com", source: "ORGANIC", sourceType: "organic", status: "lost", size: 110000, interest: [60, 58, 55, 50, 45, 42, 38, 35, 30, 28], probability: "low", lastAction: "12 wrz 2024" },
      { id: "6", name: "Christopher Wilson", email: "c.wilson@gmail.com", source: "SB2024", sourceType: "campaign", status: "closed", size: 2120000, interest: [40, 42, 45, 48, 50, 52, 55, 58, 60, 62], probability: "mid", lastAction: "12 wrz 2024" },
      { id: "7", name: "Isabella Lopez", email: "i.lopez@gmail.com", source: "ORGANIC", sourceType: "organic", status: "closing", size: 20000, interest: [35, 38, 42, 46, 50, 55, 60, 65, 68, 72], probability: "high", lastAction: "12 wrz 2024" },
      { id: "8", name: "Sophia Morgan", email: "s.morgan@gmail.com", source: "AFF20", sourceType: "campaign", status: "new", size: 95000, interest: [55, 52, 48, 45, 40, 38, 35, 32, 30, 28], probability: "low", lastAction: "11 wrz 2024" },
      { id: "9", name: "John Davis", email: "j.davis@gmail.com", source: "ORGANIC", sourceType: "organic", status: "pre-sale", size: 200000, interest: [30, 35, 40, 45, 50, 55, 60, 58, 62, 65], probability: "mid", lastAction: "11 wrz 2024" },
    ];
    
    this.statusPL = {
      "pre-sale": "PRZEDSPRZEDAŻ",
      "closed": "ZAMKNIĘTY",
      "lost": "STRACONY",
      "closing": "ZAMYKANIE",
      "new": "NOWY",
    };
    
    this.probPL = {
      low: "NISKIE",
      mid: "ŚREDNIE",
      high: "WYSOKIE"
    };
    
    this.init();
  }
  
  init() {
    this.render();
    this.startUpdates();
  }
  
  formatCurrency(value) {
    return new Intl.NumberFormat("pl-PL", { 
      style: "currency", 
      currency: "PLN", 
      maximumFractionDigits: 0 
    }).format(value);
  }
  
  bump(value) {
    return value + Math.round(value * (0.005 + Math.random() * 0.02));
  }
  
  createSparkline(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const isUp = data[data.length - 1] >= data[0];
    const points = data.map((v, i) => 
      `${(i / (data.length - 1)) * 60},${20 - ((v - min) / range) * 15}`
    ).join(" ");
    
    const upColor = "#22c55e";
    const downColor = "#ef4444";
    const color = isUp ? upColor : downColor;
    
    return `
      <div class="sparkline-container">
        <svg class="sparkline-svg" viewBox="0 0 60 20">
          <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" />
          <circle cx="60" cy="${20 - ((data[data.length - 1] - min) / range) * 15}" r="2" fill="${color}" />
        </svg>
      </div>
    `;
  }
  
  createSourcePill(source, type) {
    const arrow = type !== "organic" ? '<span class="arrow">↗</span>' : '';
    return `
      <div class="source-pill ${type}">
        ${source}${arrow}
      </div>
    `;
  }
  
  createProbabilityBars(probability) {
    const activeCount = probability === "low" ? 1 : probability === "mid" ? 2 : 3;
    return `
      <div class="probability-bars">
        ${[1,2,3].map(i => `
          <div class="probability-bar ${i <= activeCount ? '' : 'inactive'}" 
               style="width: 4px; height: ${i === 1 ? '4px' : i === 2 ? '8px' : '12px'};"></div>
        `).join('')}
      </div>
    `;
  }
  
  render() {
    const header = `
      <div class="leads-table-header">
        <div>Lead</div>
        <div>Źródło</div>
        <div>Status</div>
        <div>Wartość</div>
        <div>Zainteresowanie</div>
        <div>Prawdopodobieństwo</div>
        <div>Ostatnia aktywność</div>
      </div>
    `;
    
    const rows = this.leads.map((lead, index) => `
      <div class="leads-table-row" style="animation-delay: ${index * 0.04}s;">
        <div class="lead-info">
          <div class="lead-avatar">
            <span>${lead.name.charAt(0)}</span>
          </div>
          <div class="lead-details">
            <div class="lead-name">${lead.name}</div>
            <div class="lead-email">${lead.email}</div>
          </div>
        </div>
        <div>${this.createSourcePill(lead.source, lead.sourceType)}</div>
        <div>
          <div class="status-pill ${lead.status}">${this.statusPL[lead.status]}</div>
        </div>
        <div>
          <span class="lead-value">${this.formatCurrency(lead.size)}</span>
        </div>
        <div>${this.createSparkline(lead.interest)}</div>
        <div>
          <div class="probability-pill ${lead.probability}">
            ${this.createProbabilityBars(lead.probability)}
            <span>${this.probPL[lead.probability]}</span>
          </div>
        </div>
        <div>
          <span class="last-action">${lead.lastAction}</span>
        </div>
      </div>
    `).join('');
    
    this.container.innerHTML = `
      <div class="leads-table">
        ${header}
        ${rows}
      </div>
    `;
  }
  
  startUpdates() {
    setInterval(() => {
      this.leads = this.leads.map(lead => {
        if (Math.random() > 0.6) return lead;
        
        const nextSize = this.bump(lead.size);
        const last = lead.interest[lead.interest.length - 1];
        const nextInterest = [
          ...lead.interest.slice(1), 
          Math.min(100, last + (Math.random() > 0.3 ? 1 + Math.round(Math.random() * 3) : -1))
        ];
        
        const nextProb = Math.random() < 0.6 ? lead.probability : 
          lead.probability === "low" ? "mid" : 
          lead.probability === "mid" && Math.random() < 0.5 ? "high" : lead.probability;
        
        const nextStatus = nextProb === "high" && Math.random() < 0.25 ? "closing" :
          lead.status === "closing" && Math.random() < 0.25 ? "closed" : lead.status;
        
        return { 
          ...lead, 
          size: nextSize, 
          interest: nextInterest, 
          probability: nextProb, 
          status: nextStatus 
        };
      });
      
      this.render();
    }, 3000 + Math.random() * 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new LeadsTable('leads-table-container');
});
