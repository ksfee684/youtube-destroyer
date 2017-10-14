chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.local.get(['current', 'limit'], (function(items) {
        let {current=0, limit=10} = items;

        if (changeInfo.url === undefined || !changeInfo.url.match('youtube.com/watch')) {
            return;
        }

        if (current > limit) {
            chrome.tabs.remove(tabId);
        }

        chrome.storage.local.set({'current': current + 1}, (function() {
            console.info(`current update to ${current + 1}`);
        }));
    }));
});

$(function() {
    $('#limit').change(function() {
        let limit = Number($('#limit').val()) || 10;
        console.log('save limit ' + limit);
        chrome.storage.local.set({'limit': limit}, (function() {
            console.info(`limit update to ${limit}`);
        }));
    });
});

$(function() {
    $('#clear').click(function() {
        chrome.storage.local.set({'current': 0}, (function() {
            console.info('current update to 0');
        }));
    });
});

$(document).ready(function() {
    chrome.storage.local.get(['current', 'limit'], (function(items) {
        let {current=0, limit=10} = items;
        $('#limit').val(limit);
        console.log(`limit: ${limit}`);
    }));
});

