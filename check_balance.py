import re

with open('src/app/products/page.tsx', 'r') as f:
    text = f.read()

tags = ['div', 'section', 'button', 'span', 'p', 'a', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'li', 'form', 'main', 'svg', 'aside', 'nav']

for tag in tags:
    open_tags = len(re.findall(rf'<{tag}\b[^>]*>', text))
    close_tags = len(re.findall(rf'</{tag}>', text))
    
    # special handling for self-closing tags? none of these should be self closing normally except maybe svg/path but svg is not self-closing usually
    if open_tags != close_tags:
        print(f"Mismatch for <{tag}>: open={open_tags}, close={close_tags}")
