import json
import re

html_file = 'stitch_homepage.html'
with open(html_file, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'tailwind\.config\s*=\s*(\{.*?\});', content, re.DOTALL)
if match:
    config_str = match.group(1)
    
    # Simple regex to fix unquoted keys in JS object if any (but looks like it's valid JSON mostly)
    # The config in stitch is already valid JSON almost
    config_str = re.sub(r'(\w+):', r'"\1":', config_str) # Add quotes to keys
    # Clean up double quotes
    config_str = re.sub(r'""(\w+)""', r'"\1"', config_str)
    
    try:
        config = json.loads(config_str)
        extend = config.get("theme", {}).get("extend", {})
        
        css = []
        css.append("@import \"tailwindcss\";")
        css.append("")
        
        css.append("@theme {")
        
        # Colors
        colors = extend.get("colors", {})
        for name, val in colors.items():
            css.append(f"  --color-{name}: {val};")
        css.append("")
        
        # BorderRadius
        radii = extend.get("borderRadius", {})
        for name, val in radii.items():
            if name == "DEFAULT":
                css.append(f"  --radius: {val};")
            else:
                css.append(f"  --radius-{name}: {val};")
        css.append("")
        
        # Spacing
        spacing = extend.get("spacing", {})
        for name, val in spacing.items():
            css.append(f"  --spacing-{name}: {val};")
        css.append("")
        
        # FontFamily
        fonts = extend.get("fontFamily", {})
        for name, val in fonts.items():
            font_list = ", ".join([f'"{f}"' if ' ' in f else f for f in val])
            css.append(f"  --font-{name}: {font_list};")
        css.append("")
        
        # FontSize (Wait, v4 fontSize can also be defined. e.g. --text-sm: 0.875rem;)
        # Actually in v4, text utilities are created from --text-*, but if it's named 'headline-md', we can just use --text-headline-md
        font_sizes = extend.get("fontSize", {})
        for name, val in font_sizes.items():
            size = val[0]
            settings = val[1] if len(val) > 1 else {}
            css.append(f"  --text-{name}: {size};")
            if "lineHeight" in settings:
                css.append(f"  --text-{name}--line-height: {settings['lineHeight']};")
            if "letterSpacing" in settings:
                css.append(f"  --text-{name}--letter-spacing: {settings['letterSpacing']};")
            if "fontWeight" in settings:
                css.append(f"  --text-{name}--font-weight: {settings['fontWeight']};")
        
        css.append("}")
        css.append("")
        css.append("@layer base {")
        css.append("  html, body { margin: 0; padding: 0; }")
        css.append("  body { overscroll-behavior: none; }")
        css.append("  main > :first-child { margin-top: 0 !important; }")
        css.append("  main > :last-child { margin-bottom: 0 !important; }")
        css.append("}")
        css.append("")
        css.append("::-webkit-scrollbar { display: none; }")
        css.append("")
        
        with open('src/app/globals.css', 'w', encoding='utf-8') as f:
            f.write("\n".join(css))
        print("Success")
    except Exception as e:
        print(f"Error parsing JSON: {e}")
else:
    print("No tailwind config found")
