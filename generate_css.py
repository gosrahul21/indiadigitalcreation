import re
import colorsys

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip('#')
    if len(hex_code) == 8:
        return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))
    if len(hex_code) == 3:
        hex_code = ''.join([c*2 for c in hex_code])
    return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def invert_color(hex_color):
    if hex_color.startswith('rgba'):
        return "rgba(19, 20, 16, 0.12)" 
    
    rgb = hex_to_rgb(hex_color)
    h, l, s = colorsys.rgb_to_hls(rgb[0]/255.0, rgb[1]/255.0, rgb[2]/255.0)
    
    new_l = 1.0 - l
    new_rgb = colorsys.hls_to_rgb(h, new_l, s)
    new_rgb = tuple(int(c * 255) for c in new_rgb)
    return rgb_to_hex(new_rgb)

with open('src/app/globals.css', 'r') as f:
    css = f.read()

# Extract colors
colors = re.findall(r'--color-([\w-]+):\s*([^;]+);', css)

# Extract other theme configs (radius, spacing, font)
other_theme_match = re.search(r'--color-surface-container-highest:[^;]+;(.*?)@layer base', css, re.DOTALL)
if other_theme_match:
    other_theme = other_theme_match.group(1).strip()
else:
    other_theme = ""

# Base and scrollbar
rest_match = re.search(r'(@layer base.*)', css, re.DOTALL)
if rest_match:
    rest = rest_match.group(1)
else:
    rest = ""

root_vars = []
dark_vars = []
theme_vars = []

for name, val in colors:
    if name in ['primary-container', 'surface-tint', 'border-active', 'primary-fixed', 'primary-fixed-dim', 'primary-fixed']:
        light_val = val
    else:
        light_val = invert_color(val)
        
    root_vars.append(f"  --{name}: {light_val};")
    dark_vars.append(f"  --{name}: {val};")
    theme_vars.append(f"  --color-{name}: var(--{name});")

new_css = [
    '@import "tailwindcss";',
    '',
    ':root {',
    '\n'.join(root_vars),
    '}',
    '',
    '.dark {',
    '\n'.join(dark_vars),
    '}',
    '',
    '@theme {',
    '\n'.join(theme_vars),
    other_theme,
    '}',
    '',
    rest
]

with open('src/app/globals.css', 'w') as f:
    f.write('\n'.join(new_css))
    
print("CSS updated.")
