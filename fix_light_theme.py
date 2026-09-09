import re

with open('src/app/globals.css', 'r') as f:
    css = f.read()

# The :root block
light_theme_colors = """  --surface-tint: #afd500;
  --on-primary: #ffffff;
  --on-background: #111111;
  --tertiary-fixed-dim: #e9ecef;
  --surface: #ffffff;
  --primary: #111111;
  --on-tertiary: #ffffff;
  --secondary: #495057;
  --on-tertiary-fixed-variant: #495057;
  --surface-dim: #f8f9fa;
  --primary-fixed: #c8f300;
  --outline-variant: #dee2e6;
  --text-editorial: #111111;
  --secondary-fixed-dim: #dee2e6;
  --on-secondary-container: #212529;
  --on-primary-fixed-variant: #3d4c00;
  --tertiary-fixed: #f8f9fa;
  --surface-deep: #f1f3f5;
  --surface-card: #f8f9fa;
  --surface-variant: #e9ecef;
  --on-primary-fixed: #171e00;
  --on-secondary-fixed-variant: #495057;
  --outline: #ced4da;
  --on-surface-variant: #495057;
  --on-error: #ffffff;
  --surface-container-high: #e9ecef;
  --border-subtle: rgba(0, 0, 0, 0.08);
  --on-error-container: #c92a2a;
  --inverse-primary: #c8f300;
  --border-active: #111111;
  --surface-bright: #ffffff;
  --on-primary-container: #171e00;
  --secondary-container: #e9ecef;
  --error-container: #ffe3e3;
  --secondary-fixed: #e9ecef;
  --inverse-surface: #212529;
  --inverse-on-surface: #f8f9fa;
  --on-secondary-fixed: #111111;
  --primary-container: #c8f300;
  --on-secondary: #ffffff;
  --primary-fixed-dim: #afd500;
  --on-tertiary-container: #212529;
  --surface-container-lowest: #ffffff;
  --tertiary-container: #f8f9fa;
  --text-muted: #6c757d;
  --on-tertiary-fixed: #111111;
  --error: #fa5252;
  --surface-canvas: #f8f9fa;
  --surface-container: #f1f3f5;
  --tertiary: #343a40;
  --on-surface: #111111;
  --surface-container-low: #f8f9fa;
  --surface-card-hover: #e9ecef;
  --background: #ffffff;
  --surface-container-highest: #dee2e6;"""

css = re.sub(r':root\s*\{[^}]*\}', f':root {{\n{light_theme_colors}\n}}', css)

with open('src/app/globals.css', 'w') as f:
    f.write(css)

print("Updated globals.css")
