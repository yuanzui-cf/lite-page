/// <reference types="astro/client" />

import type { Language } from "./types/config";

declare global {
    namespace App {
        interface Locals {
            lang: Language[];
        }
    }
}
