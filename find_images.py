import re
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
urls = re.findall(r'https://framerusercontent\.com/images/[^"\\]+\.(?:png|jpg|jpeg)', content)
for u in urls:
    print(u)
