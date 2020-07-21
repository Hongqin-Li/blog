import sys
import os
import re
import toml
import markdown
import json
import subprocess

from mdx_math import MathExtension


def read(path):
    with open(path, 'r') as f:
        return f.read()


def get_ctime(path):
    p = subprocess.Popen(["git", "log", "--diff-filter=A", "--follow",
                          "--format=%aI", "--max-count=1",
                          f"{path}"], stdout=subprocess.PIPE)
    out = p.communicate()[0].decode("utf-8").strip()
    assert out, f"Cannot find git added logs: {path}"
    assert type(out) == str
    return out


def get_mtime(path):
    p = subprocess.Popen(["git", "log", "--diff-filter=AM", "--follow",
                          "--format=%aI", "--max-count=1",
                          f"{path}"], stdout=subprocess.PIPE)
    out = p.communicate()[0].decode("utf-8").strip()
    assert out, f"Cannot find git modified logs: {path}"
    assert type(out) == str
    return out


def parse_header(s):
    match = re.search(r"\A\s*^[+]{3}[ \t]*\n(.*?)^[+]{3}[ \t]*\n(.*)",
                      s, flags=re.DOTALL | re.MULTILINE)
    if match is None:
        raise ValueError(f"Cannot parse toml header:\n{s[:100]}")
    return match.group(1, 2)


def parse_title(s):
    match = re.search(r"^\s*[#]+ (.+?)\n(.*)",
                      s, flags=re.DOTALL)
    if match is None:
        raise ValueError(f"Cannot find title:\n{s[:100]}")
    return match.group(1, 2)


def parse_excerpt(s):
    match = re.search(r"^([ ]*[^#\s][^\n]+)\n\n", s, flags=re.MULTILINE)
    if match is None:
        raise ValueError(f"Cannot generate excerpt:\n{s[:100]}")
    return match.group(1)


def parse1(path, parse_content=True):
    t, md = parse_header(read(path))
    title, md = parse_title(md)
    excerpt = parse_excerpt(md)

    t = toml.loads(t)

    assert len(t.keys()) == 1, f"Too more headers in {path}: {t}"

    t["title"] = title.strip()
    t["excerpt"] = excerpt.strip()
    t["updated_at"] = get_mtime(path)
    t["created_at"] = get_ctime(path)
    t["url"] = os.path.splitext(os.sep + path)[0]

    if parse_content:
        t['html'] = markdown.markdown(md, extensions=[
                              'extra',
                              'codehilite',
                              'toc',
                              MathExtension(enable_dollar_delimiter=True)
                            ], extension_configs={
                              'codehilite': {
                                'linenums': True,
                              },
                            })

    assert t["tags"] is not None

    return t


if __name__ == "__main__":
    print(json.dumps(parse1(sys.stdin.read()),
                     ensure_ascii=False,
                     indent=4, sort_keys=True, default=str))
