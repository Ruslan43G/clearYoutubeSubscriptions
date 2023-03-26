
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const clearSubscriptions = async () => {
    const count = document.querySelectorAll("ytd-channel-renderer:not(.ytd-item-section-renderer)");

    if(!Array.from(count).length) {
        alert('Подписок нет!')

        return
    }

    for (const el of count) {
        const btn = el.querySelector('button')

        btn.click()

        await sleep(500)

        const confirm = document.getElementById('confirm-button').querySelector('button')

        confirm.click()

        await sleep(500)

        el.parentNode.removeChild(el);
    }

    await sleep(5000)
    await clearSubscriptions()
}

(async () => {
    await clearSubscriptions()
})()
