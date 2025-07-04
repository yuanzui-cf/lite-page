import { Language, type Config } from "./types/config";

export const config: Config = {
    name: "Leo Jia",
    avatar: "/avatar.jpg",
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
