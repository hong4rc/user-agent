chrome.webRequest.onBeforeSendHeaders.addListener(changeHeader, {urls: ["<all_urls>"]}, [
    "blocking", "requestHeaders"
]);
chrome.storage
function changeHeader(details) {
    for (let i = 0; i < details.requestHeaders.length; ++i) {
        if (details.url.indexOf("youtube.com") >= 0)
            return {requestHeaders: details.requestHeaders};
        if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders[i] = {
                name: 'User-Agent',
                value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
            };
            break;
        }
    }
    console.log(details.requestHeaders);
    return {requestHeaders: details.requestHeaders};
}