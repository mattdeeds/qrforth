# read value from base64.txt and write to qrforth.html at specific location
import re

# read base64.txt
with open('base64.txt', 'r') as f:
    base64 = f.read()
# print(base64)

# remove newlines
base64 = base64.replace('\n', '')

# read qrforth.html
with open('qrforth.html', 'r') as f:
    html = f.read()
    
# Use regular expression to replace the value of wa64
pattern = r'wa64\s*=\s*"[^"]*"'
replacement = 'wa64 = "{}"'.format(base64)
modified_html = re.sub(pattern, replacement, html)

# write to qrforth.html
with open('qrforth.html', 'w') as f:
    f.write(modified_html)
    
# print("Packed wasm module in html file.")