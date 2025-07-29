**Objective:**
Update all specified links and references in `*.html` files from relative paths to absolute URLs.

**Details:**
The goal is to prepend a base URL to any relative path found in attributes like `src` (for images) and `href` (for links). This will ensure that all assets and links point to the correct absolute locations.

**Replacement Rules:**

1.  **Image Sources:**
    *   **Find:** `src="uploads/`
    *   **Replace with:** `src="https://svituawww.github.io/uploads1/`

2.  **Stylesheet Links:**
    *   **Find:** `href="uploads_old/`
    *   **Replace with:** `href="https://svituawww.github.io/uploads_old/`

**Examples:**

*   **Image Before:** `<img src="uploads/2025/06/normalized/some-image.jpg">`
*   **Image After:** `<img src="https://svituawww.github.io/uploads1/2025/06/normalized/some-image.jpg">`
*   **Stylesheet Before:** `<link rel="stylesheet" href="uploads_old/elementor/google-fonts/css/roboto.css">`
*   **Stylesheet After:** `<link rel="stylesheet" href="https://svituawww.github.io/uploads_old/elementor/google-fonts/css/roboto.css">`

**Configuration Advice:**
Using a `JSON` file for configuration is the best practice for this task. It allows you to easily manage multiple replacement rules.

**Example `config.json`:**
```json
{
  "replacements": [
    {
      "find": "src="testpages/",
      "replace": "src="https://svituawww.github.io/uploads1/"
    }
  ],
  "file_mask": "*.html"
}
```