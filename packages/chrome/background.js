// Initialize extension settings on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ enabled: true, redirectCount: 0 }, (result) => {
    chrome.storage.local.set({
      enabled: result.enabled,
      redirectCount: result.redirectCount
    });
    updateRuleset(result.enabled);
  });
});

// Watch for setting changes to toggle the redirect rule
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.enabled) {
    updateRuleset(changes.enabled.newValue);
  }
});

// Update the declarativeNetRequest ruleset state
function updateRuleset(enabled) {
  const updateRuleOptions = enabled
    ? { enableRulesetIds: ["ruleset_redirect"] }
    : { disableRulesetIds: ["ruleset_redirect"] };

  chrome.declarativeNetRequest.updateEnabledRulesets(updateRuleOptions, () => {
    if (chrome.runtime.lastError) {
      console.error("Error updating ruleset:", chrome.runtime.lastError);
    } else {
      console.log(`Hauberk: Ruleset updated to ${enabled ? 'enabled' : 'disabled'}`);
    }
  });
}

// Track redirects in real-time and record recent packages
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) { // Main frame navigations only
    const url = details.url;
    const match = url.match(/https?:\/\/(?:www\.)?npmjs\.com\/package\/([^?]+)/);
    if (match) {
      let packageName = match[1].replace(/\/$/, '');
      packageName = decodeURIComponent(packageName);
      chrome.storage.local.get({ enabled: true, redirectCount: 0, recentPackages: [] }, (result) => {
        if (result.enabled) {
          const newCount = result.redirectCount + 1;
          let recent = result.recentPackages || [];
          const existing = recent.findIndex(p => p.name === packageName);
          if (existing !== -1) {
            const entry = recent.splice(existing, 1)[0];
            entry.visits = (entry.visits || 1) + 1;
            entry.lastVisit = Date.now();
            recent.unshift(entry);
          } else {
            recent.unshift({ name: packageName, visits: 1, lastVisit: Date.now() });
          }
          if (recent.length > 20) recent = recent.slice(0, 20);
          chrome.storage.local.set({ redirectCount: newCount, recentPackages: recent });
        }
      });
    }
  }
});
