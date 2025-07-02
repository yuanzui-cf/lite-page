import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { config } from "../config";

const SITE_TITLE = config?.site?.title || config.name;
const SITE_DESCRIPTION = config?.site?.description || "";

export async function GET(context) {
    const posts = await getCollection("blog");
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: posts.map((post) => ({
            ...post.data,
            link: `/blog/${post.id}/`,
        })),
    });
}
