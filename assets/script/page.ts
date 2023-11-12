export interface Link {
    id: string,
    link: string,
}
export function setLink(link: Link[]) {
    link.forEach(e => {
        try {
            let ele: HTMLDivElement = <HTMLDivElement>document.querySelector(".button#" + e.id)
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
                let item = res.querySelectorAll("item")
                if(!item.length) {
                    item = res.querySelectorAll("entry")
                }
                item.forEach(e => {
                    // create elements
                    let ele: HTMLDivElement = document.createElement("div");
                    let title: HTMLHeadingElement = document.createElement("h3")
                    let des: HTMLParagraphElement = document.createElement("p")
                    let info: HTMLParagraphElement = document.createElement("p")
                    let date: Date = new Date(<string>(e.querySelector("pubDate")?.textContent || e.querySelector("published")?.textContent))
                    des.classList.add("description")
                    info.classList.add("info")
                    // get content
                    title.textContent = e.querySelector("title")!.textContent || "暂无标题"
                    des.textContent = e.querySelector("description")?.textContent || e.querySelector("content")?.textContent || "暂无简介"
                    info.textContent = `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`
                    ele.appendChild(title)
                    ele.appendChild(des)
                    ele.appendChild(info)
                    ele.addEventListener("click", () => {
                        location.href = e.querySelector("link")?.getAttribute("href") || e.querySelector("link")?.textContent || "#"
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
                let post = <HTMLDivElement>document.querySelector(".post")
                post.innerText = err
            })
}