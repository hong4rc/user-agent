"use strict";
$(document).ready(() => {
    chrome.storage.sync.get({device: "default"}, data => {
        $('[value="' + data.device + '"]').click();
    });

    $('div.form').on("click", 'input[name="device"]', (event) => {
        let device = event.currentTarget.value;
        chrome.storage.sync.set({device: device}, () => {
            console.log("Save device is " + device);
        });
    });
});