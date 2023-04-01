const GO_TO_SUBS_BTN = document.querySelector('#subscriptions')
const CLEAR_SUBS_BTN = document.querySelector('#clearSubscriptions')
GO_TO_SUBS_BTN.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: goToSubs,
    });
})

CLEAR_SUBS_BTN.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: clearSubs,
    });
})

function goToSubs () {
    window.open('https://www.youtube.com/feed/channels', '_blank')
}

async function clearSubs () {
    const count = document.querySelectorAll("ytd-channel-renderer:not(.ytd-item-section-renderer)");
    console.warn(count)
    if(!Array.from(count).length) {
        alert('Подписок нет!')

        return
    }

    for (const el of count) {
        const btn = el.querySelector('button')

        btn.click()

        await new Promise(resolve => setTimeout(resolve, 500))

        const confirm = document.getElementById('confirm-button').querySelector('button')

        confirm.click()

        await new Promise(resolve => setTimeout(resolve, 500))

        el.parentNode.removeChild(el);
    }

    await new Promise(resolve => setTimeout(resolve, 5000))
    await clearSubs()
}
