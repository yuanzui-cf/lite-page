import { setLink, getPosts } from "./page.ts"
setLink([
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
])
getPosts("https://blog.yzcf.top/feed.xml")