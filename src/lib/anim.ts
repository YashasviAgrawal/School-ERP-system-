export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

/** Local 0..1 progress of p inside the window [a, b]. */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a))

export const mix = (a: number, b: number, t: number) => a + (b - a) * t

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
