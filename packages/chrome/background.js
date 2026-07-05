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
      console.log(`npmx Redirector: Ruleset updated to ${enabled ? 'enabled' : 'disabled'}`);
    }
  });
}

// Track redirects in real-time
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) { // Main frame navigations only
    const url = details.url;
    if (/https?:\/\/(?:www\.)?npmjs\.com\/package\//.test(url)) {
      chrome.storage.local.get({ enabled: true, redirectCount: 0 }, (result) => {
        if (result.enabled) {
          const newCount = result.redirectCount + 1;
          chrome.storage.local.set({ redirectCount: newCount });
          console.log(`npmx Redirector: Redirected! Total: ${newCount}`);
        }
      });
    }
  }
});
