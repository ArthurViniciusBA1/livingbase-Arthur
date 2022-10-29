const baseURL = "https://m2-api-living.herokuapp.com/news/"

async function getNews(page) {

    try {
        const request = await fetch(baseURL + "?page=" + page, {
            method: "GET",
        })
        
        let response = await request.json()

        if(response.news.length === 0){
            return undefined
        } else {
            return response.news
        }

    } catch (err) {
        return err
    }
}

async function getPostByID(id) {
    try {
        const request = await fetch(baseURL + id, {
            method: "GET",
        })

        return await request.json()
    } catch (err) {
        return err
    }
}

export {
    getNews,
    getPostByID,
}