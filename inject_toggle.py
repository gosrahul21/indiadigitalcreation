import re

with open('src/components/Header.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { ThemeToggle } from "./ThemeToggle";')

# Inject before the search button
# The search button starts with <button aria-label="Search"
# It is inside <div className="flex items-center gap-space-sm shrink-0">
content = content.replace(
    '<button aria-label="Search"',
    '<ThemeToggle /><button aria-label="Search"'
)

with open('src/components/Header.tsx', 'w') as f:
    f.write(content)

print("Injected ThemeToggle")
