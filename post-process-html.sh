#!/bin/bash

################################################################################
# Post-processing script for LaTeX-generated HTML resume
#
# PROBLEM:
#   When you regenerate HTML from .tex files (using TeXstudio or latex2html),
#   it overwrites all customizations including:
#   - SEO meta tags (Open Graph, Twitter Cards)
#   - Modern HTML5 structure
#   - CSS image centering rules
#   - Favicon links
#
# SOLUTION:
#   Run this script AFTER regenerating HTML to restore all enhancements.
#
# USAGE:
#   ./post-process-html.sh
#
# WHAT IT DOES:
#   1. Updates both English and Spanish HTML files to HTML5
#   2. Adds comprehensive SEO meta tags to page1.html (main landing page)
#   3. Adds Open Graph and Twitter Card meta for social media sharing
#   4. Adds favicon links for all platforms (web, iOS, Android)
#   5. Adds language alternates for bilingual support
#   6. Adds CSS rules for centered, responsive images
#
# WORKFLOW:
#   1. Edit your .tex files (Ray-Winkelman.tex, es/Ray-Winkelman.tex)
#   2. Regenerate HTML using your LaTeX tool
#   3. Run: ./post-process-html.sh
#   4. Commit the changes
#
# FILES MODIFIED:
#   - Ray-Winkelman_html/page*.html (all pages)
#   - Ray-Winkelman_html/style.css
#   - es/Ray-Winkelman_html/page*.html (all pages)
#   - es/Ray-Winkelman_html/style.css
################################################################################

set -e

echo "Starting HTML post-processing..."

# Function to restore deleted image files from git
restore_images() {
    local dir="$1"
    echo "Checking images in $dir..."

    local image_files=(
        "favicon.ico"
        "favicon-16x16.png"
        "favicon-32x32.png"
        "apple-touch-icon.png"
        "android-chrome-192x192.png"
        "android-chrome-512x512.png"
        "ray.png"
    )

    for file in "${image_files[@]}"; do
        if [ ! -f "$dir/$file" ]; then
            echo "  Restoring $file from git..."
            git checkout HEAD -- "$dir/$file" 2>/dev/null || echo "  Warning: Could not restore $file"
        fi
    done
}

# Function to update style.css with image centering and spacing
update_css() {
    local css_file="$1"
    echo "Updating CSS: $css_file"

    # Check if image centering rules already exist
    if grep -q "#content img {" "$css_file"; then
        echo "  CSS already contains image centering rules, skipping..."
        return
    fi

    # Add image centering rules with text-align after #content block
    sed -i '/^#content {/,/^}$/ {
        /^}$/ i\
    text-align: center;
    }' "$css_file"

    # Add image-specific rules with vertical spacing after the #content block
    sed -i '/^#content {/,/^}$/ {
        /^}$/ a\
#content img {\
    display: block;\
    margin-left: auto;\
    margin-right: auto;\
    margin-top: 9mm;\
    margin-bottom: 9mm;\
    max-width: 100%;\
    height: auto;\
}\
/* Adjust spacing between specific images */\
#content img[src='"'"'image1.png'"'"'] {\
    margin-bottom: 6.5mm;\
}\
#content img[src='"'"'image2.png'"'"'] {\
    margin-top: 6.5mm;\
    margin-bottom: 12.5mm;\
}\
#content img[src='"'"'image3.png'"'"'] {\
    margin-top: 12.5mm;\
}\
/* Fixed floating download button */\
.download-button {\
    position: fixed;\
    bottom: 30px;\
    right: 30px;\
    background-color: #22437f;\
    color: white !important;\
    padding: 15px 25px;\
    border-radius: 50px;\
    text-decoration: none !important;\
    font-weight: bold;\
    font-size: 16px;\
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\
    transition: all 0.3s ease;\
    z-index: 1000;\
    display: inline-block;\
    line-height: 1.4;\
}\
.download-button:hover {\
    background-color: #1a3460;\
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);\
    transform: translateY(-2px);\
    color: white !important;\
}\
.download-button::before {\
    content: "⬇ ";\
    font-size: 18px;\
}
    }' "$css_file"

    echo "  Added image centering and spacing CSS rules"
}

# Function to add download button to HTML pages
add_download_button() {
    local html_file="$1"
    local lang="${2:-en}"

    # Check if button already exists
    if grep -q "download-button" "$html_file"; then
        return
    fi

    # Determine button text based on language
    local button_text="Download PDF"
    if [ "$lang" = "es" ]; then
        button_text="Descargar PDF"
    fi

    # Add button before </body> tag
    sed -i "s|</body>|<a href=\"../Ray-Winkelman.pdf\" class=\"download-button\" download>$button_text</a>\n</body>|" "$html_file"
}

# Function to modernize HTML headers
modernize_html() {
    local html_file="$1"
    local lang="${2:-en}"
    local is_main_page="${3:-false}"

    echo "Processing: $html_file"

    # Replace DOCTYPE
    sed -i "s/<!DOCTYPE HTML PUBLIC '-\/\/W3C\/\/DTD HTML 4.01 Transitional\/\/EN'>/<!DOCTYPE html>/" "$html_file"
    sed -i "s/<html>/<html lang=\"$lang\">/" "$html_file"

    # If this is page1.html, add full SEO meta tags
    if [ "$is_main_page" = true ]; then
        # Determine URLs based on language
        if [ "$lang" = "es" ]; then
            base_url="https://raywinkelman.com/es/"
            locale="es_ES"
            title_suffix="Líder en Ingeniería de Software | CEO Shadow Software LLC"
            description="Líder tecnológico empresarial con experiencia en arquitectura de software, liderazgo ejecutivo y SDLC. CEO de Shadow Software LLC, entregando aplicaciones que procesan millones de transacciones de comercio electrónico para marcas globales como McDonalds, Subway y Dairy Queen."
        else
            base_url="https://raywinkelman.com/"
            locale="en_US"
            title_suffix="Software Engineering Leader | CEO Shadow Software LLC"
            description="Technology business leader with expertise in software architecture, executive leadership, and SDLC. CEO of Shadow Software LLC, delivering applications processing millions of e-commerce transactions for global brands including McDonalds, Subway, and Dairy Queen."
        fi

        # Create the modern head section
        cat > /tmp/new_head.html << EOF
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="generator" content="TeXstudio (http://texstudio.sourceforge.net/)">

<!-- Primary Meta Tags -->
<title>Ray Winkelman - $title_suffix</title>
<meta name="title" content="Ray Winkelman - $title_suffix">
<meta name="description" content="$description">
<meta name="keywords" content="Ray Winkelman, Software Engineer, CEO, Shadow Software LLC, .NET, React, AWS, Azure, Google Cloud, Tampa Bay, Software Architecture, Executive Leadership">
<meta name="author" content="Ray Winkelman">
<meta name="robots" content="index, follow">

<!-- Favicons -->
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="profile">
<meta property="og:url" content="$base_url">
<meta property="og:title" content="Ray Winkelman - $title_suffix">
<meta property="og:description" content="$description">
<meta property="og:image" content="https://raywinkelman.com/ray.png">
<meta property="og:image:alt" content="Ray Winkelman - Professional Photo">
<meta property="og:locale" content="$locale">
<meta property="og:site_name" content="Ray Winkelman Resume">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="$base_url">
<meta name="twitter:title" content="Ray Winkelman - $title_suffix">
<meta name="twitter:description" content="$description">
<meta name="twitter:image" content="https://raywinkelman.com/ray.png">
<meta name="twitter:image:alt" content="Ray Winkelman - Professional Photo">

<!-- Alternate Language Links -->
<link rel="alternate" hreflang="en" href="https://raywinkelman.com/">
<link rel="alternate" hreflang="es" href="https://raywinkelman.com/es/">
<link rel="alternate" hreflang="x-default" href="https://raywinkelman.com/">

<link rel="stylesheet" href="style.css" type="text/css">
</head>
EOF

        # Replace the entire head section
        sed -i '/<head>/,/<\/head>/{
            /<head>/r /tmp/new_head.html
            /<head>/,/<\/head>/d
        }' "$html_file"

        echo "  Added full SEO meta tags"
    else
        # For other pages, just add basic modern head
        sed -i "/<head>/a\\
<meta charset=\"UTF-8\">\\
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\\
<meta name=\"generator\" content=\"TeXstudio (http://texstudio.sourceforge.net/)\">" "$html_file"

        # Fix stylesheet link
        sed -i "s/<link rel=StyleSheet href='style.css' type='text\/css'>/<link rel=\"stylesheet\" href=\"style.css\" type=\"text\/css\">/" "$html_file"

        echo "  Added basic HTML5 meta tags"
    fi
}

# Process English version
echo ""
echo "=== Processing English Version ==="
restore_images "Ray-Winkelman_html"

# Restore index.html if it was deleted (custom landing page with JSON-LD)
if [ ! -f "Ray-Winkelman_html/index.html" ]; then
    echo "Restoring index.html from git..."
    git checkout HEAD -- "Ray-Winkelman_html/index.html" 2>/dev/null || echo "Warning: Could not restore index.html"
fi

update_css "Ray-Winkelman_html/style.css"
modernize_html "Ray-Winkelman_html/page1.html" "en" true

# Add download button to index.html
add_download_button "Ray-Winkelman_html/index.html" "en"

# Process other English pages if they exist
for page in Ray-Winkelman_html/page*.html; do
    if [ "$page" != "Ray-Winkelman_html/page1.html" ]; then
        modernize_html "$page" "en" false
    fi
    add_download_button "$page" "en"
done

# Process Spanish version if it exists
if [ -d "es/Ray-Winkelman_html" ]; then
    echo ""
    echo "=== Processing Spanish Version ==="
    restore_images "es/Ray-Winkelman_html"

    # Restore index.html if it was deleted (custom landing page with JSON-LD)
    if [ ! -f "es/Ray-Winkelman_html/index.html" ]; then
        echo "Restoring index.html from git..."
        git checkout HEAD -- "es/Ray-Winkelman_html/index.html" 2>/dev/null || echo "Warning: Could not restore index.html"
    fi

    update_css "es/Ray-Winkelman_html/style.css"
    modernize_html "es/Ray-Winkelman_html/page1.html" "es" true

    # Add download button to index.html
    add_download_button "es/Ray-Winkelman_html/index.html" "es"

    # Process other Spanish pages
    for page in es/Ray-Winkelman_html/page*.html; do
        if [ "$page" != "es/Ray-Winkelman_html/page1.html" ]; then
            modernize_html "$page" "es" false
        fi
        add_download_button "$page" "es"
    done
fi

# Clean up
rm -f /tmp/new_head.html

echo ""
echo "✓ Post-processing complete!"
echo ""
echo "Changes made:"
echo "  - Restored image files from git (favicons, ray.png)"
echo "  - Updated DOCTYPE to HTML5"
echo "  - Added SEO meta tags (title, description, keywords)"
echo "  - Added Open Graph and Twitter Card meta tags"
echo "  - Added favicons and language alternates"
echo "  - Added CSS image centering and custom spacing rules"
echo "  - Added fixed floating download button (language-aware)"
echo ""
echo "You can now commit these changes."
