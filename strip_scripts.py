import os
import re
import glob

files = glob.glob('src/app/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Remove <script>...</script>
    new_content = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.DOTALL)
    
    # Fix any remaining style="xxx" since my previous script handled one specific one
    # If there are any other inline styles, they will cause expression expected errors too!
    # Let's check for style="..." in the new_content
    # Simple replace: style="color: red" -> style={{ color: "red" }} is complex, let's just remove style="..." for now or see if there are any left.
    
    with open(file, 'w') as f:
        f.write(new_content)

print("Done")
