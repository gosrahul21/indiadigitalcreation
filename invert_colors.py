import re
import colorsys

def hex_to_rgb(hex_code):
    hex_code = hex_code.lstrip('#')
    if len(hex_code) == 8:
        # ignore alpha for now or handle later
        return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))
    if len(hex_code) == 3:
        hex_code = ''.join([c*2 for c in hex_code])
    return tuple(int(hex_code[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])

def invert_color(hex_color):
    if hex_color.startswith('rgba'):
        # For border-subtle: rgba(244, 244, 237, 0.12) -> rgba(19, 20, 16, 0.12)
        return "rgba(19, 20, 16, 0.12)" 
        
    rgb = hex_to_rgb(hex_color)
    h, l, s = colorsys.rgb_to_hls(rgb[0]/255.0, rgb[1]/255.0, rgb[2]/255.0)
    
    # Invert lightness, but keep hue and saturation mostly the same
    # E.g. L=0.1 becomes L=0.9
    new_l = 1.0 - l
    
    # Primary brand color is #c8f300 (very bright green-yellow). If we invert its lightness, it might become too dark.
    # We shouldn't strictly invert brand colors.
    # Let's keep brand colors (primary-container, primary-fixed, border-active, surface-tint) as is or slightly tweaked.
    
    new_rgb = colorsys.hls_to_rgb(h, new_l, s)
    new_rgb = tuple(int(c * 255) for c in new_rgb)
    return rgb_to_hex(new_rgb)

with open('src/app/globals.css', 'r') as f:
    css = f.read()

colors = re.findall(r'--color-([\w-]+):\s*([^;]+);', css)

print("Original -> Inverted")
for name, val in colors:
    # Manual overrides for brand/important colors
    if name in ['primary-container', 'surface-tint', 'border-active', 'primary-fixed', 'primary-fixed-dim']:
        inv = val # Keep brand colors
    else:
        inv = invert_color(val)
    print(f"{name}: {val} -> {inv}")
