document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle-redirect');
  const statusBadge = document.getElementById('status-badge');
  const statusText = statusBadge.querySelector('.status-text');
  const redirectCountEl = document.getElementById('redirect-count');
  const resetBtn = document.getElementById('reset-counter');
  const historyList = document.getElementById('history-list');
  const clearHistory = document.getElementById('clear-history');

  // Load initial settings, count, and recent packages
  chrome.storage.local.get({ enabled: true, redirectCount: 0, recentPackages: [] }, (result) => {
    toggle.checked = result.enabled;
    updateStatusUI(result.enabled);
    animateCounter(0, result.redirectCount, 800);
    renderRecentPackages(result.recentPackages);
  });

  // Listen for storage changes in real-time to update stats
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') {
      if (changes.redirectCount) {
        const oldValue = changes.redirectCount.oldValue || 0;
        const newValue = changes.redirectCount.newValue || 0;
        animateCounter(oldValue, newValue, 500);
      }
      if (changes.enabled) {
        toggle.checked = changes.enabled.newValue;
        updateStatusUI(changes.enabled.newValue);
      }
      if (changes.recentPackages) {
        renderRecentPackages(changes.recentPackages.newValue || []);
      }
    }
  });

  // Toggle toggle-redirect switch
  toggle.addEventListener('change', (e) => {
    const isEnabled = e.target.checked;
    chrome.storage.local.set({ enabled: isEnabled });
    updateStatusUI(isEnabled);
  });

  // Reset count event
  resetBtn.addEventListener('click', () => {
    // Visual feedback for reset
    resetBtn.style.pointerEvents = 'none';
    redirectCountEl.style.transform = 'scale(0.8)';
    redirectCountEl.style.opacity = '0.3';
    
    setTimeout(() => {
      chrome.storage.local.set({ redirectCount: 0 }, () => {
        redirectCountEl.style.transform = 'scale(1)';
        redirectCountEl.style.opacity = '1';
        redirectCountEl.textContent = '0';
        resetBtn.style.pointerEvents = 'auto';
        
        // Short flash effect
        redirectCountEl.style.color = '#ef4444';
        setTimeout(() => {
          redirectCountEl.style.color = '';
        }, 300);
      });
    }, 250);
  });

  // Helper: Update status badge styling and text
  function updateStatusUI(isEnabled) {
    if (isEnabled) {
      statusBadge.className = 'status-badge active';
      statusText.textContent = 'Active';
    } else {
      statusBadge.className = 'status-badge inactive';
      statusText.textContent = 'Disabled';
    }
  }

  // Clear history
  clearHistory.addEventListener('click', () => {
    chrome.storage.local.set({ recentPackages: [] }, () => {
      renderRecentPackages([]);
    });
  });

  // Helper: Render recent packages list
  function renderRecentPackages(packages) {
    if (!packages || packages.length === 0) {
      historyList.innerHTML = `
        <div class="empty-history">
          <span class="empty-icon">📦</span>
          <p>No package redirects yet</p>
        </div>
      `;
      return;
    }
    historyList.innerHTML = packages.map(p => `
      <a href="https://npmx.dev/package/${p.name.split('/').map(encodeURIComponent).join('/')}" target="_blank" class="package-item">
        <span class="package-name">${escapeHtml(p.name)}</span>
        <span class="visit-count">${p.visits || 1} redirect${(p.visits || 1) !== 1 ? 's' : ''}</span>
        <span class="package-link-icon">
          <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </span>
      </a>
    `).join('');
  }

  // Helper: Escape HTML entities
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Helper: Smooth counter increment animation
  function animateCounter(start, end, duration) {
    if (start === end) {
      redirectCountEl.textContent = end;
      return;
    }
    
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
      current += increment;
      redirectCountEl.textContent = current;
      if (current === end) {
        clearInterval(timer);
      }
    }, Math.max(stepTime, 20)); // cap speed at 50fps
  }
});
