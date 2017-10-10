"use strict";
let userAgent = undefined;
let listUA = {
    default: '',
    macintosh: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Version/10.12.6 Mobile Chrome/61.0.3163.100 Safari/537.36'
};
chrome.webRequest.onBeforeSendHeaders.addListener(changeHeader, {urls: ["<all_urls>"]}, [
    "blocking",
    "requestHeaders"
]);
chrome.storage.onChanged.addListener(change => {
    if (change.device) {
        if (listUA.hasOwnProperty(change.device.newValue)) {
            userAgent = listUA[change.device.newValue];
        }
    }
});
function changeHeader(details) {
    if (!userAgent) {
        return;
    }
    for (let i = 0; i < details.requestHeaders.length; ++i) {
        if (details.url.indexOf("youtube.com") >= 0)
            return {requestHeaders: details.requestHeaders};
        if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders[i] = {
                name: 'User-Agent',
                value: userAgent
            };
            break;
        }
    }
    return {requestHeaders: details.requestHeaders};
}