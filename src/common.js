export async function get(url,type='text') {
    const promise = await fetch(url)
    const text = await promise[type]()
    return text
}