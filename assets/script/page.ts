export interface Link {
    id: string,
    link: string,
}
export interface Options {
    githubID?: string,
}

export class litePage {
    options: Options
    constructor(options: Options = {}) {
        this.options = options
    }
    setLink(link: Link[]) {
        link.forEach(value => {
            try {
                let ele: NodeListOf<HTMLDivElement> = <NodeListOf<HTMLDivElement>>document.querySelectorAll(".button#" + value.id)
                ele.forEach(e => {
                    e.addEventListener("click", () => {
                        location.href = value.link
                    })
                })
            } catch(err) {
                console.error(err);
            }
        })
    }
    getPosts(link: string) {
        let post = <Element>document.querySelector(".post")
        if(post) {
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
                        title.textContent = e.querySelector("title")!.textContent || "No title"
                        des.textContent = e.querySelector("description")?.textContent || e.querySelector("content")?.textContent || "No description"
                        info.textContent = `${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`
                        ele.appendChild(title)
                        ele.appendChild(des)
                        ele.appendChild(info)
                        ele.addEventListener("click", () => {
                            location.href = e.querySelector("link")?.getAttribute("href") || e.querySelector("link")?.textContent || "#"
                        })
                        frag.appendChild(ele)
                    })

                    post.removeChild(<Node>post.firstChild)
                    post.classList.add("load")
                    post.appendChild(frag)
                })
                .catch(err => {
                    console.error(err);
                    document.querySelector(".post")!.innerHTML = `Cannot connect to the blog: ${err}`
                })
        } else {
            console.error("Couldn't find post group")
        }
    }
    setProject() {
        let ele = document.querySelectorAll(".project-group > div[name]")
        if(ele) {
            ele.forEach(e => {
                e.addEventListener("click", () => {
                    if(this.options?.githubID) {
                        location.href = `https://github.com/${this.options.githubID}/${e.getAttribute("name")}`
                    }
                })
            })
        } else {
            console.error("Couldn't find project group")
        }
    }
}