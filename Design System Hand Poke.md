# Tamar Goldstein — Master UI/UX Design System

**Version:** 1.0.0
**Last Updated:** 2026-05-01
**Status:** Draft
**Owner:** talkalisker

---

## 📋 Table of Contents

1. [Overview & Philosophy](#overview--philosophy)
2. [Brand Identity](#brand-identity)
3. [Visual Design System](#visual-design-system)
   - [Color Palette](#color-palette)
   - [Typography](#typography)
   - [Spacing & Layout](#spacing--layout)
4. [Component Library](#component-library)
5. [Content & Tone](#content--tone)

---

## 1. Overview & Philosophy

### Mission Statement

**Tamar Goldstein** is a Hand Poke Tattoo Artist and Illustrator. She serves individuals seeking a soulful, permanent connection to nature and art through a traditional, gentle, and precise tattooing method. The core essence of the brand is **Organic Precision** — where the raw beauty of nature meets the intentionality of the human heart.

### Design Philosophy: "The Gentle Mark"

The design system is heavily anchored in the brand's core values: **Soulful Connection**, **Precise Artistry**, and **Natural Harmony**. It must feel **organic**, **intentional**, and **serene**.

| Principle (English) | Principle (Hebrew) | Description | Application |
|---------------------|--------------------|-------------|-------------|
| **Soulful Connection** | חיבור מהלב | Work done from the heart, focusing on the story and the person. | Use of whitespace and intimate, intentional layout. |
| **Precise Artistry** | אמנות מדויקת | The technical mastery of the hand poke method — dot by dot. | Fine lines, stippling textures, and sharp grid alignment. |
| **Natural Harmony** | הרמוניה טבעית | Deep connection to flora, fauna, and the cycles of life. | Earthy, muted palette and organic visual elements. |

### Core Design Goals

1. **Stippled Minimalism**
   - The UI should reflect the "pointillism" of hand poke tattoos.
   - Use subtle stippling textures or dot-based patterns in borders or backgrounds.

2. **Soulful Narrative**
   - Prioritize storytelling. Every tattoo has a "why" (like the lemon tree).
   - Use layout structures that allow for long-form narrative alongside imagery.

3. **Traditional Reverence**
   - Reflect the ancient tradition of hand poking.
   - Avoid aggressive modern UI trends; favor timeless, "analog" aesthetics.

---

## 2. Brand Identity

### Brand Positioning

- **What we are:** A traditional artisan studio where art is a gentle, shared ritual.
- **What we are NOT:** A loud, commercial "street" tattoo shop.
- **Motto:** "Traditional. Gentle. From the Heart."

### Brand Personality

**Tone:** Muted, observant, and profoundly calm.
**Voice:** First-person, storytelling-driven, and technical yet poetic.
**Visual Style:** High-contrast stippled illustrations (black ink on off-white), accompanied by soft, natural photography of tattoos in natural light.

---

## 3. Visual Design System

### Color Palette

The palette reflects "The Winter Garden". Muted, earthy tones that feel like natural paper and dried botanicals.

| Token | Hex | Usage | Notes |
|-------|-----|-------|-------|
| **primary** | `#1A1A1A` | Ink / Headings | The deep black of tattoo ink. |
| **primaryHover** | `#333333` | Interactive states | A softer charcoal. |
| **background** | `#F9F7F2` | Main Background | "Bone" or high-quality handmade paper. |
| **surface** | `#FFFFFF` | Image containers | Pure white to make stippled art pop. |
| **backgroundDark**| `#2D2D2A` | Hero sections | "Earth" - for high-contrast storytelling. |
| **textPrimary** | `#1A1A1A` | Body text | Maximum readability. |
| **textSecondary**| `#6B6B63` | Captions / Metadata | "Sage" - muted and natural. |
| **textInverse** | `#F9F7F2` | Text on dark | Bone on Earth. |

### Typography

Typography must project **Quiet Authority**. We utilize **Cormorant Garamond** for a sense of tradition and elegance. We will pair it with **Inter** for clean, modern UI utility.

| Type | Family | Use Cases |
|------|--------|-----------|
| **Display / Hero** | `Cormorant Garamond` | Serifs for a timeless, artistic feel. |
| **Interface / Body**| `Inter` | Precision-grade sans-serif for reading. |

**Typographic Hierarchy:**
- **Hero:** 700 weight, Cormorant, large scale but with generous leading.
- **Subtitles:** 400 weight, Inter, uppercase with `0.1em` letter spacing.
- **Body:** 400 weight, Inter, 16px base, high line-height (1.6).

### Spacing & Layout

Strict adherence to an **8px** baseline grid to reinforce visual rhythm and precision.

- **xxs:** 4px
- **sm:** 16px
- **md (Standard):** 32px
- **lg:** 64px
- **xl:** 128px

---

## 4. Component Library

The UI components must feel **artisanal** and **precise**.

### 4.1. Buttons & CTAs

-   **Primary Button:**
    -   *Background:* `var(--primary)`
    -   *Text:* `var(--textInverse)`, 500 weight, Inter.
    -   *Shape:* 0px border-radius (sharp, precise).
    -   *Hover:* Slight opacity shift or a fine stippled border.
-   **Secondary Button (Outlined):**
    -   *Border:* 1px solid `var(--primary)`
    -   *Background:* Transparent
    -   *Text:* `var(--primary)`
    -   *Hover:* Background shifts to `var(--surface)`.

### 4.2. Cards & Containers

-   **Art Gallery Card:**
    -   *Background:* `var(--surface)`
    -   *Border:* 1px solid `#E0E0DB` (very faint).
    -   *Padding:* 24px
    -   *Note:* Use stippled shadow effects rather than CSS blurs.

### 4.3. Inputs & Forms 

-   **Input Fields:**
    -   *Background:* `var(--background)`
    -   *Border:* Bottom border only, 1px solid `var(--primary)`.
    -   *Focus State:* Border becomes 2px.

---

## 5. Content & Tone

### Copywriting Laws

1. **Be Soulful:** Every project description must include a personal or natural connection.
2. **Technical Precision:** Use terms like "Hand Poke," "Heal," and "Stipple" with pride.
3. **Gentle Guidance:** CTAs should invite, not demand. (e.g., "Begin a conversation" vs "Book Now").

---
*End of Document*
