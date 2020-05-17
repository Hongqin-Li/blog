import re
import toml
import markdown

with open("README.md", 'r') as f:
    src = f.read().strip()

t, md = re.findall(r"^[+]{3}(.*?)^[+]{3}\s*$(.*)", src, flags=re.DOTALL | re.MULTILINE)[0]

t = toml.loads(t)
html = markdown.markdown(md, extensions=[
                          'markdown.extensions.extra',
                          'markdown.extensions.codehilite',
                        ])

print(t)
print(html)
