import os
import json
import argparse
import toml
from functools import cmp_to_key
from datetime import datetime
from collections import defaultdict
from parse import parse1, name2url


def writef(path, s):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(s)


def check_config(cfg, t, path):
    required_fields = ["title", "description"]
    assert t in cfg, \
        f"Field '{t}' not found in {config_path}: " \
        f"Required by {path}."
    for field in required_fields:
        assert field in cfg[t], \
               f"Field '{field}' of '{t}' not found in {config_path}: " \
               f"Required by {path}"


if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("paths", nargs='+',
                        help="paths to markdown articles")
    parser.add_argument("--config", required=True,
                        help="path to config.toml")
    parser.add_argument("--output", required=True,
                        help="output directory")
    args = parser.parse_args()

    paths, output_dir, config_path = args.paths, args.output, args.config

    categories = defaultdict(dict)

    tag_list = defaultdict(list)
    category_list = defaultdict(list)
    archive_list = defaultdict(list)

    def add_category_nav(path, meta):
        assert path.startswith("docs/")
        dirs = path[5:].split('/')
        if len(dirs) == 1:
            categories[meta["title"]] = "/" + path[:-3]
            return None

        elif len(dirs) == 2:
            categories[dirs[0]][meta["title"]] = "/" + path[:-3]
            return None

        else:
            categories[dirs[0]][dirs[1]] = f"/categories/{dirs[1]}"
            return dirs[1]

    with open(config_path, 'r') as f:
        cfg = toml.loads(f.read())

    for path in paths:
        assert path.startswith("docs/")
        assert path.endswith(".md")

        meta = parse1(path, parse_content=False)

        c = add_category_nav(path, meta)

        year = datetime.fromisoformat(meta["created_at"]).year
        archive_list[year].append(meta)

        if c:
            check_config(cfg, c, path)
            category_list[c].append(meta)

        for t in meta["tags"]:
            check_config(cfg, t["name"], path)
            tag_list[t["name"]].append(meta)

    category_nav = [
        {"name": k, "to": v} if type(v) == str else
        {"name": k, "children":
         sorted([{"name": name, "to": to} for name, to in v.items()],
                key=lambda i: i["name"])}
        for k, v in categories.items()]

    tag_nav = [
        {"name": t, "cnt": len(items), "to": name2url(t, prefix="/tags/")}
        for t, items in tag_list.items()
    ]

    archive_nav = [
        {"name": t, "cnt": len(items), "to": f"/archives/{t}"}
        for t, items in archive_list.items()
    ]

    def cate_cmp(lhs, rhs):
        if "children" in lhs and "children" not in rhs:
            return -1
        elif "children" in rhs and "children" not in lhs:
            return 1
        elif "children" in lhs and "children" in rhs:
            if lhs["name"] < rhs["name"]:
                return -1
            elif lhs["name"] == rhs["name"]:
                return 0
            else:
                return 0
        else:
            if lhs["name"] < rhs["name"]:
                return -1
            elif lhs["name"] == rhs["name"]:
                return 0
            else:
                return 1

    category_nav.sort(key=cmp_to_key(cate_cmp))
    tag_nav.sort(key=lambda i: i["cnt"], reverse=True)
    archive_nav.sort(key=lambda i: i["name"])

    def dump1(path, data):
        path = os.path.join(output_dir, path)
        data = json.dumps(data, ensure_ascii=False, indent=2)
        writef(path, data)

    dump1("tags.json", tag_nav)
    dump1("categories.json", category_nav)
    dump1("archives.json", archive_nav)

    for t, items in tag_list.items():
        items.sort(key=lambda i: i["created_at"], reverse=True)
        title, desc = cfg[t]["title"], cfg[t]["description"]
        uname = name2url(t)
        dump1(f"tags/{uname}.json", {"name": title, "description": desc,
                                     "items": items, "url": f"/tags/{uname}"})

    for t, items in category_list.items():
        items.sort(key=lambda i: i["created_at"], reverse=True)
        title, desc = cfg[t]["title"], cfg[t]["description"]
        dump1(f"categories/{t}.json",
              {"name": title, "description": desc,
               "items": items, "url": f"/categories/{t}"})

    for t, items in archive_list.items():
        items.sort(key=lambda i: i["created_at"], reverse=True)
        dump1(f"archives/{t}.json", {"name": t, "items": items,
                                     "url": f"/archives/{t}"})
