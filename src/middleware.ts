import { defineMiddleware } from "astro/middleware";
import { Language } from "./types/config";
import { config } from "./config";

let lang = [Language.English];

if (config.site?.language) {
    if (typeof config.site?.language !== "string") {
        lang = config.site.language as Language[];
    } else {
        lang = [config.site.language as Language];
    }
}

let conf = config;
if (!conf.site) {
    conf.site = {
        title: conf.name,
        favicon: conf.avatar,
        language: lang,
    };
}

export const onRequest = defineMiddleware((context, next) => {
    context.locals.lang = lang;
    context.locals.config = conf;
    return next();
});
