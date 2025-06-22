export interface Config {
    /**
     * Name of you.
     */
    name: string;
    /**
     * Theme of the UI.
     */
    theme: ThemeConfig;
    /**
     * Site config.
     */
    site?: SiteConfig;
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
     * Favicon of the site.
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
