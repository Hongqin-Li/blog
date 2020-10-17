import os
import re
import toml
import markdown
import json
import subprocess
import argparse

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


def name2url(s, prefix=""):
    assert "  " not in s, \
        f"Name '{s}' contains more than one consecutive spaces."
    assert re.fullmatch(r"[\w -]+", s), \
        f"Name '{s}' contains some non-Unicode word characters" \
        "other than '-' and ' '."
    return prefix + s.replace(" ", "-")


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
                                'guess_lang': False,
                              },
                            })

    assert t["tags"] is not None
    t["tags"] = [{"name": t, "url": name2url(t, prefix="/tags/")}
                 for t in t["tags"]]

    return t


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("path", help="path to a markdown article")
    parser.add_argument("-o", "--output", required=True,
                        help="output file")
    args = parser.parse_args()

    out = json.dumps(parse1(args.path),
                     ensure_ascii=False,
                     indent=2, sort_keys=True, default=str)
    with open(args.output, 'w') as f:
        f.write(out)
