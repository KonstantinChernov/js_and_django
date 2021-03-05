const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST", 
        body: data,
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        }
    });

    return await res.json()
}

const getData = async (url) => {
    const res = await fetch(url, {
        method: "GET", 
        headers: {
            "X-Requested-With": "XMLHttpRequest",
        }
    });
    if (!res.ok) {
        throw new Error(`Fetch Error ${res.status}`)
    }
    return await res.json()
}


export {postData, getData};