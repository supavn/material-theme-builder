/**
 * Color conversion utilities for hex, HSV, and HCT color spaces
 */

export interface HSVColor {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

export interface HCTColor {
  h: number; // 0-360
  c: number; // 0-150 (typical range)
  t: number; // 0-100
}

export interface RGBColor {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv(r: number, g: number, b: number): HSVColor {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  const s = max === 0 ? 0 : (diff / max) * 100;
  const v = max * 100;

  if (diff !== 0) {
    if (max === r) {
      h = ((g - b) / diff) % 6;
    } else if (max === g) {
      h = (b - r) / diff + 2;
    } else {
      h = (r - g) / diff + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
}

/**
 * Convert HSV to RGB
 */
export function hsvToRgb(h: number, s: number, v: number): RGBColor {
  s /= 100;
  v /= 100;
  
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

/**
 * Convert hex to HSV
 */
export function hexToHsv(hex: string): HSVColor | null {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null;
}

/**
 * Convert HSV to hex
 */
export function hsvToHex(h: number, s: number, v: number): string {
  const rgb = hsvToRgb(h, s, v);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Convert RGB to HCT (approximate implementation)
 * HCT is Google's perceptually uniform color space
 * This is a simplified version - for production use, consider using @material/material-color-utilities
 */
export function rgbToHct(r: number, g: number, b: number): HCTColor {
  // Convert to linear RGB first
  const linearR = r / 255;
  const linearG = g / 255;
  const linearB = b / 255;

  // Convert to LAB (simplified)
  const x = linearR * 0.4124 + linearG * 0.3576 + linearB * 0.1805;
  const y = linearR * 0.2126 + linearG * 0.7152 + linearB * 0.0722;
  const z = linearR * 0.0193 + linearG * 0.1192 + linearB * 0.9505;

  // Convert to HCT approximation
  const hsv = rgbToHsv(r, g, b);
  
  return {
    h: hsv.h,
    c: Math.round(hsv.s * 1.5), // Approximate chroma mapping
    t: Math.round(y * 100) // Tone approximation
  };
}

/**
 * Convert HCT to RGB (approximate implementation)
 */
export function hctToRgb(h: number, c: number, t: number): RGBColor {
  // This is a simplified conversion
  // For accurate HCT conversion, use @material/material-color-utilities
  const s = Math.min(100, c / 1.5);
  const v = Math.min(100, t + (c * 0.3));
  
  return hsvToRgb(h, s, v);
}

/**
 * Convert hex to HCT
 */
export function hexToHct(hex: string): HCTColor | null {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHct(rgb.r, rgb.g, rgb.b) : null;
}

/**
 * Convert HCT to hex
 */
export function hctToHex(h: number, c: number, t: number): string {
  const rgb = hctToRgb(h, c, t);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Validate hex color
 */
export function isValidHex(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Normalize hex color (convert 3-digit to 6-digit)
 */
export function normalizeHex(hex: string): string {
  if (hex.length === 4) {
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex;
}