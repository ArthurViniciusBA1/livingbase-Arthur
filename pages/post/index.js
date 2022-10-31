import { getPostByID } from "../../scripts/requests.js"

const postID = JSON.parse(localStorage.getItem("@post"))

renderizerPost(postID)

scrollTop()

async function renderizerPost(id){
    const post = await getPostByID(id)

    let h1 = document.querySelector("h1")
    let h2 = document.querySelector("h2")
    let img = document.querySelector("#postImage")
    let p = document.querySelector("#postBody")

    h1.innerText = post.title
    h2.innerText = post.description
    img.src = post.image
    p.innerText = post.content
}

function scrollTop(){
    let botao = document.querySelector("#topo")

    botao.addEventListener("click",(event)=>{
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}