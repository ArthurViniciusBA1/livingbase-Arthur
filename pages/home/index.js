import { getNews, getPostByID } from "../../scripts/requests.js";

let counter = 0

gerarFiltros()
receberPosts(counter)
scrollTop()
observer()

function gerarFiltros() {

    let categorias = [
        "Todos",
        "Segurança",
        "Decoração",
        "Organização",
        "Aromas",
        "Reforma",
        "Limpeza",
        "Pintura",
    ]

    categorias.forEach(element => {
        gerarBotaoFiltro(element)
    })

    function gerarBotaoFiltro(categoria) {
        let input = document.createElement("input")
        let label = document.createElement("label")

        input.type = "radio"
        input.name = "categorias"
        input.id = `input-${categoria}`
        input.classList = "radio"

        if (categoria === "Todos") {
            input.checked = "true"
            label.addEventListener("click", (event) => {
                location.reload()
            })
        } else {
            label.addEventListener("click", (event) => {
                receberPosts(0, 3, event.target.id)
            })
        }

        label.htmlFor = `input-${categoria}`
        label.classList = "button-grey"
        label.id = categoria
        label.innerText = categoria



        document.querySelector("#listaCategorias").append(input, label)
    }
}

async function receberPosts(startPage, endPage = startPage, filtro = "Todos") {

    let posts = []

    for (let i = startPage; i <= endPage; i++) {
        posts = posts.concat(await (getNews(i)))
    }

    if (filtro != "Todos") {
        posts = posts.filter(element => element != undefined && element.category === filtro)
    }

    carregarPosts(posts)
}

async function carregarPosts(posts) {
    document.querySelector("#listaPosts").innerHTML = ""

    posts.forEach(element => {
        if (element) {
            document.querySelector("#listaPosts").append(renderizarPosts(element))
        }
    });

    function renderizarPosts(post) {
        let recorte = (post.content).substring(145, 0) + "..."

        let li = document.createElement("li")
        let img = document.createElement("img")
        let div = document.createElement("div")
        let h3 = document.createElement("h3")
        let p = document.createElement("p")
        let button = document.createElement("button")

        img.src = post.image

        h3.classList = "font2-bold"
        p.classList = "font4-regular"
        button.classList = "botaoAcessar"

        h3.innerText = post.title
        p.innerText = recorte
        button.innerText = "Acessar conteúdo"

        button.dataset.postId = post.id

        button.addEventListener("click", (event) => {
            localStorage.setItem("@post", JSON.stringify(event.target.dataset.postId))

            window.location.href = "../post/index.html"
        })

        div.append(h3, p, button)

        li.append(img, div)

        return li
    }
}

function observer() {
    const observerSection = document.querySelector(".observer")

    observer = new IntersectionObserver((entries) => {
        counter++
        if (counter <= 2) {
            receberPosts(0, counter)
        } else {
            observerSection.remove()
        }
    })

    

    observer.observe(observerSection)
}

function scrollTop() {
    let botao = document.querySelector("#topo")

    botao.addEventListener("click", (event) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}