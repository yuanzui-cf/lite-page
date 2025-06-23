/// <reference types="astro/client" />

import type { Config, Language } from "./types/config";

declare global {
    namespace App {
        interface Locals {
            lang: Language[];
            config: Config;
        }
    }
}
