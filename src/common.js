export async function get(url) {
    const promise = await fetch(url)
    const text = await promise.text()
    return text
}