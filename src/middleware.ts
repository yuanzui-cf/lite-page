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

export const onRequest = defineMiddleware((context, next) => {
    context.locals.lang = lang;
    return next();
});
