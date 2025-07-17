/**
 * @file Color Generator
 * @description Contains core functions for color conversion, brightness adjustment, and generating color palettes.
 */

/**
 * Defines the structure of an RGB color object.
 */
export interface RGB {
    r: number;
    g: number;
    b: number;
}

/**
 * Defines the structure of an HSL color object.
 */
export interface HSL {
    h: number;
    s: number;
    l: number;
}

/**
 * Represents the structure of a color palette object.
 * Keys correspond to surface depth levels, and values are hexadecimal color codes.
 */
export interface ColorPaletteObject {
    "000": string;
    "050": string;
    "100": string;
    "150": string;
    "200": string;
    "250": string;
    "300": string;
    "350": string;
    "400": string;
    "450": string;
    "500": string;
    "550": string;
    "600": string;
    "650": string;
    "700": string;
    "750": string;
    "800": string;
    "850": string;
    "900": string;
    "950": string;
    "1000": string;
}

/**
 * Converts a hexadecimal color code to an RGB object.
 * @param {string} hex - A hexadecimal color code (e.g., "#RRGGBB" or "RRGGBB").
 * @returns {RGB} An object containing red, green, and blue values.
 * @example
 * hexToRgb("#FF5733"); // Returns { r: 255, g: 87, b: 51 }
 */
export function hexToRgb(hex: string): RGB {
    const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;
    const bigint = parseInt(cleanHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

/**
 * Converts RGB values to a hexadecimal color code.
 * @param {number} r - Red component (0-255).
 * @param {number} g - Green component (0-255).
 * @param {number} b - Blue component (0-255).
 * @returns {string} A hexadecimal color code (e.g., "#RRGGBB").
 * @example
 * rgbToHex(255, 87, 51); // Returns "#FF5733"
 */
export function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (c: number) => `0${Math.round(c).toString(16)}`.slice(-2);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Determines the appropriate contrast text color (black or white) based on a background color.
 * @param {string} hexColor - The hexadecimal code of the background color.
 * @returns {string} Returns "text-black" or "text-white" as a Tailwind CSS class name.
 * @example
 * getContrastTextColor("#FFFFFF"); // Returns "text-black"
 * getContrastTextColor("#000000"); // Returns "text-white"
 */
export function getContrastTextColor(hexColor: string): string {
    const { r, g, b } = hexToRgb(hexColor);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "text-black" : "text-white";
}

/**
 * Converts RGB color values to HSL.
 * @param {number} r - Red component (0-255).
 * @param {number} g - Green component (0-255).
 * @param {number} b - Blue component (0-255).
 * @returns {HSL} An object representing the HSL color space.
 * @example
 * rgbToHsl(255, 87, 51); // Returns { h: 0.033, s: 1, l: 0.6 }
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h: number = 0,
        s: number = 0,
        l: number = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}

/**
 * Converts HSL color values to RGB.
 * @param {number} h - Hue (0-1).
 * @param {number} s - Saturation (0-1).
 * @param {number} l - Lightness (0-1).
 * @returns {RGB} An object representing the RGB color space.
 * @example
 * hslToRgb(0.033, 1, 0.6); // Returns { r: 255, g: 87, b: 51 }
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
    let r: number, g: number, b: number;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

/**
 * Generates a color palette object containing 21 colors (10 light, 1 mid-tone, 10 dark) based on a given base color.
 * @param {string} baseHex - The hexadecimal code of the base color (e.g., "#RRGGBB").
 * @returns {ColorPaletteObject} An object containing the generated color palette.
 * @example
 * generateColorPaletteObject("#FF5733");
 * // Returns {
 * //   "000": "#FFEBE6",
 * //   "050": "#FFE0D6",
 * //   "100": "#FFD6C7",
 * //   "150": "#FFCCB7",
 * //   "200": "#FFC1A8",
 * //   "250": "#FFB799",
 * //   "300": "#FFAC8A",
 * //   "350": "#FFA27B",
 * //   "400": "#FF976C",
 * //   "450": "#FF8C5C",
 * //   "500": "#FF824D",
 * //   "550": "#ED7342",
 * //   "600": "#DB6538",
 * //   "650": "#C9562E",
 * //   "700": "#B84824",
 * //   "750": "#A6391A",
 * //   "800": "#942B10",
 * //   "850": "#821D06",
 * //   "900": "#710E00",
 * //   "950": "#5F0000",
 * //   "1000": "#4D0000"
 * // }
 */
export function generateColor(baseHex: string): ColorPaletteObject {
    const baseRgb = hexToRgb(baseHex);
    const baseHsl = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);

    const trueMidHsl: HSL = {
        h: baseHsl.h,
        s: baseHsl.s,
        l: 0.5,
    };

    if (baseHsl.s < 0.01) {
        trueMidHsl.s = 0;
    }

    const colorPalette: Partial<ColorPaletteObject> = {};
    const lightnessLevels: number[] = [];
    // Generate 21 lightness values from 0.95 down to 0.05
    for (let i = 0; i <= 20; i++) {
        lightnessLevels.push(parseFloat((0.95 - i * 0.045).toFixed(3)));
    }

    const depthLabels: (keyof ColorPaletteObject)[] = [];
    // Generate 21 depth labels from "000" to "1000" in steps of 50
    for (let i = 0; i <= 20; i++) {
        const value = i * 50;
        depthLabels.push(
            String(value).padStart(3, "0") as keyof ColorPaletteObject,
        );
    }

    lightnessLevels.forEach((lLevel, index) => {
        const currentHsl: HSL = {
            h: trueMidHsl.h,
            s: trueMidHsl.s,
            l: lLevel,
        };
        const { r, g, b } = hslToRgb(currentHsl.h, currentHsl.s, currentHsl.l);
        const hexColor = rgbToHex(r, g, b);
        colorPalette[depthLabels[index]] = hexColor;
    });

    return colorPalette as ColorPaletteObject;
}
