import { Link, setLink, getPosts } from "./page.ts"
let btnLinks: Link[] = [
    {
        id: "github",
        link: "https://github.com/yuanzui-cf",
    }, 
    {
        id: "mail",
        link: "mailto:grassblogstu@gmail.com",
    }, 
    {
        id: "blog",
        link: "https://blog.yzcf.top",
    },
]
setLink(btnLinks)
getPosts("https://blog.yzcf.top/rss.xml")