import { Language, type Config } from "./types/config";

export const config: Config = {
    name: "Leo Jia",
    theme: {
        color: "#441650",
    },
    site: {
        title: "👋 Hello, Leo Jia",
        language: [
            Language.English,
            Language.SimplifiedChinese,
            Language.TraditionalChinese,
        ],
    },
};
