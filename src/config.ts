import { Language, type Config } from "./types/config";

export const config: Config = {
    name: "Leo Jia",
    avatar: "/avatar.jpg",
    links: [
        {
            icon: "fa-brands fa-github",
            title: "Github",
            url: "https://github.com/yuanzui-cf",
        },
        {
            icon: "fa-brands fa-blogger-b",
            title: "Blog",
            url: "/blog",
        },
        {
            icon: "fa-solid fa-circle-dollar-to-slot",
            url: "#donate",
        },
        {
            icon: "fa-brands fa-x-twitter",
            url: "https://x.com/yuanzui_cf",
        },
        {
            icon: "fa-solid fa-envelope",
            url: "mailto:grassblogstu@gmail.com",
        },
    ],
    theme: {
        color: "#441650",
    },
    site: {
        title: "👋 Hello, Leo Jia",
        subtitle: "🏫 A full time university student. / 👨‍💻 A part time coder.",
        description: "This is my personal site.",
        language: [
            Language.English,
            Language.SimplifiedChinese,
            Language.TraditionalChinese,
        ],
    },
};
