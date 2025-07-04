export interface Config {
    /**
     * Name of you.
     */
    name: string;
    /**
     * Your avatar.
     */
    avatar: string;
    /**
     * Theme of the UI.
     */
    theme: ThemeConfig;
    /**
     * Site config.
     */
    site?: SiteConfig;

    links?: Link[];
}

export interface ThemeConfig {
    /**
     * theme hex color
     */
    color: string;
}

export interface SiteConfig {
    /**
     * Title of the site.
     * @default name
     */
    title?: string;
    /**
     * Subtitle of the site.
     */
    subtitle?: string;
    /**
     * Description of the site.
     */
    description?: string;
    /**
     * Favicon of the site.
     * @default avatar
     */
    favicon?: string;
    /**
     * Languages of the site.
     * @default Language.English
     */
    language?: Language | Language[];
}

export enum Language {
    SimplifiedChinese = "zh-CN", // would change to zh-Hans someday
    TraditionalChinese = "zh-TW", // would change to zh-Hant someday
    English = "en",
    Japanese = "ja",
}

export interface Link {
    /**
     * Name of the link.
     */
    icon?: string;
    /**
     * Title of the link.
     */
    title?: string;
    /**
     * URL of the link.
     */
    url: string;
}
