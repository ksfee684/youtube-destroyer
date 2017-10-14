chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url !== undefined && changeInfo.url.match('youtube.com')) {
        chrome.tabs.remove(tabId);
    }
});

