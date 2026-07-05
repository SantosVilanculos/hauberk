document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggle-redirect');
  const statusBadge = document.getElementById('status-badge');
  const statusText = statusBadge.querySelector('.status-text');
  const redirectCountEl = document.getElementById('redirect-count');
  const resetBtn = document.getElementById('reset-counter');

  // Load initial settings and count
  chrome.storage.local.get({ enabled: true, redirectCount: 0 }, (result) => {
    toggle.checked = result.enabled;
    updateStatusUI(result.enabled);
    animateCounter(0, result.redirectCount, 800);
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
