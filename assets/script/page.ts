export interface Link {
    id: string,
    link: string,
}
export function setLink(link: Link[]) {
    link.forEach(e => {
        try {
            let ele: HTMLDivElement = <HTMLDivElement>document.querySelector("#" + e.id)
            ele.addEventListener("click", () => {
                location.href = e.link
            })
        } catch(err) {
            console.error(err);
        }
    })
}
export function getPosts(link: string) {
    fetch(link).then(r => r.text())
            .then(r => {
                let parser = new DOMParser()
                let res = parser.parseFromString(r, "text/xml")
                let frag = document.createDocumentFragment()
                res.querySelectorAll("item").forEach(e => {
                    let ele: HTMLDivElement = document.createElement("div");
                    let title = document.createElement("h3")
                    let des = document.createElement("p")
                    let info = document.createElement("p")
                    let d = new Date(e.children[4].textContent as string)
                    des.classList.add("description")
                    info.classList.add("info")
                    title.textContent = e.children[0].textContent
                    des.textContent = e.children[2].textContent
                    info.textContent = `${d.getFullYear()} / ${d.getMonth() + 1} / ${d.getDate()}`
                    ele.appendChild(title)
                    ele.appendChild(des)
                    ele.appendChild(info)
                    ele.addEventListener("click", () => {
                        location.href = <string>e.children[1].textContent
                    })
                    frag.appendChild(ele)
                })
                let post = <HTMLDivElement>document.querySelector(".post")
                post.removeChild(<Node>post.firstChild)
                post.classList.add("load")
                post.appendChild(frag)
            })
            .catch(err => {
                console.error(err);
            })
}