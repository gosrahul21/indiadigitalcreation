import re
import os

def html_to_jsx(html):
    jsx = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', html, flags=re.DOTALL)
    jsx = jsx.replace('class=', 'className=')
    jsx = jsx.replace('for=', 'htmlFor=')
    jsx = jsx.replace('stroke-width', 'strokeWidth')
    jsx = jsx.replace('stroke-linecap', 'strokeLinecap')
    jsx = jsx.replace('stroke-linejoin', 'strokeLinejoin')
    jsx = jsx.replace('fill-rule', 'fillRule')
    jsx = jsx.replace('clip-rule', 'clipRule')
    jsx = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1 />', jsx)
    jsx = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1 />', jsx)
    jsx = jsx.replace('<hr>', '<hr />')
    jsx = jsx.replace('<br>', '<br />')
    jsx = jsx.replace('style="font-variation-settings: \'FILL\' 1;"', "style={{ fontVariationSettings: \"'FILL' 1\" }}")
    jsx = jsx.replace('autocomplete=', 'autoComplete=')
    jsx = jsx.replace('autofocus=', 'autoFocus=')
    jsx = jsx.replace('tabindex=', 'tabIndex=')
    jsx = jsx.replace('datetime=', 'dateTime=')
    jsx = jsx.replace('colspan=', 'colSpan=')
    jsx = jsx.replace('rowspan=', 'rowSpan=')
    jsx = jsx.replace('novalidate', 'noValidate')
    jsx = re.sub(r'\brequired(?![=A-Za-z])', 'required={true}', jsx)
    # also remove scripts
    jsx = re.sub(r'<script.*?>.*?</script>', '', jsx, flags=re.DOTALL)
    
    # Also fix viewBox and onclick
    jsx = re.sub(r'(?i)viewbox=', 'viewBox=', jsx)
    jsx = re.sub(r'(?i)onclick=', 'onClick=', jsx)
    jsx = re.sub(r'(?i)onsubmit=', 'onSubmit=', jsx)
    return jsx

def extract_section(html, tag):
    match = re.search(f'<{tag}[^>]*>.*?</{tag}>', html, flags=re.DOTALL)
    return match.group(0) if match else ""

def extract_main_content(html):
    # Find the first <main>
    start_match = re.search(r'<main[^>]*>', html)
    if not start_match:
        return "", ""
    start_idx = start_match.end()
    
    # We need to find the matching </main>
    # Count nested <main>
    nesting = 1
    current_idx = start_idx
    while nesting > 0:
        next_open = html.find('<main', current_idx)
        next_close = html.find('</main>', current_idx)
        
        if next_close == -1:
            break
            
        if next_open != -1 and next_open < next_close:
            nesting += 1
            current_idx = next_open + 5
        else:
            nesting -= 1
            current_idx = next_close + 7
            if nesting == 0:
                end_idx = next_close
                return html[start_idx:end_idx], start_match.group(0)

    return "", ""

# Process Homepage (also extract header/footer)
with open('stitch_homepage.html', 'r') as f:
    home_html = f.read()

header_html = extract_section(home_html, 'header')
footer_html = extract_section(home_html, 'footer')

header_jsx = html_to_jsx(header_html)
footer_jsx = html_to_jsx(footer_html)

os.makedirs('src/components', exist_ok=True)
with open('src/components/Header.tsx', 'w') as f:
    f.write('import Link from "next/link";\n\nexport default function Header() {\n  return (\n    ' + header_jsx + '\n  );\n}\n')

with open('src/components/Footer.tsx', 'w') as f:
    f.write('import Link from "next/link";\n\nexport default function Footer() {\n  return (\n    ' + footer_jsx + '\n  );\n}\n')

# Convert Pages
pages = [
    ('stitch_homepage.html', 'src/app/page.tsx', 'HomePage'),
    ('stitch_all_products.html', 'src/app/products/page.tsx', 'AllProductsPage'),
    ('stitch_product_detail.html', 'src/app/products/[id]/page.tsx', 'ProductDetailPage'),
    ('stitch_checkout.html', 'src/app/checkout/page.tsx', 'CheckoutPage')
]

for src, dest, name in pages:
    with open(src, 'r') as f:
        html = f.read()
    
    main_content, main_tag = extract_main_content(html)
    if not main_content:
        print(f"Warning: No main tag found in {src}")
        continue
    
    main_tag_match = re.search(r'<main([^>]*)>', main_tag)
    main_attrs = main_tag_match.group(1) if main_tag_match else ''
    
    main_attrs_jsx = html_to_jsx(main_attrs)
    content_jsx = html_to_jsx(main_content)
    
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    
    depth = dest.count('/') - 2
    if depth == 0:
        header_path = '@/components/Header'
        footer_path = '@/components/Footer'
    else:
        header_path = '@/components/Header'
        footer_path = '@/components/Footer'
        
    code = f'''import Header from "{header_path}";
import Footer from "{footer_path}";

export default function {name}() {{
  return (
    <>
      <Header />
      <main {main_attrs_jsx}>
        {content_jsx}
      </main>
      <Footer />
    </>
  );
}}
'''
    with open(dest, 'w') as f:
        f.write(code)

print("Conversion complete.")
