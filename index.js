
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const red = async () => {
    const count = document.querySelectorAll("ytd-channel-renderer:not(.ytd-item-section-renderer)");

    for (const el of count) {
        const btn = el.querySelector('button')

        btn.click()

        await sleep(500)

        const confirm = document.getElementById('confirm-button').querySelector('button')

        confirm.click()

        await sleep(500)

        el.parentNode.removeChild(el);

        if(Array.from(count).indexOf(el) === -1) {
            await red()
        }
    }
}

(async () => {
    await red()
    window.location.reload()
})()
