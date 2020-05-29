import sys
import json
from parse import parse1
from collections import defaultdict, Counter

if __name__ == "__main__":

    paths = sys.stdin.read().split()
    api = {}
    categories = defaultdict(dict)
    tags = Counter()

    def add_category_nav(path, meta):
        assert path.startswith("docs/")
        dirs = path[5:].split('/')
        if len(dirs) == 1:
            categories[meta["title"]] = "/" + path[:-3]

        elif len(dirs) == 2:
            categories[dirs[0]][meta["title"]] = "/" + path[:-3]

        else:
            categories[dirs[0]][dirs[1]] = f"/categories/{dirs[0]}/{dirs[1]}"

    # TODO tag list
    # TODO category list

    for path in paths:
        assert path.startswith("docs/")
        assert path.endswith(".md")

        api['/' + path[:-3]] = f"() => import('@/obj/{path[:-3]}.json')"

        meta = parse1(path, parse_content=False)

        add_category_nav(path, meta)
        tags.update(meta["tags"])

    # TODO sort
    category_nav = [
        {"name": k, "to": v} if type(v) == str else
        {"name": k, "children":
            [{"name": name, "to": to} for name, to in v.items()]}
        for k, v in categories.items()]

    tag_nav = [
        {"name": t, "cnt": cnt, "to": f"/tags/{t.lower()}"}
        for t, cnt in tags.items()
    ]

    print('''
const apis = {''' + ',\n'.join([f"'{k}': {v}" for k, v in api.items()]) + '}' + '''
const navTags = ''' + json.dumps(tag_nav, ensure_ascii=False) + '''
const navCategories = ''' + json.dumps(category_nav, ensure_ascii=False) + '''

function get(url) {
  if (apis[url]) return apis[url]();
  else return Promise.reject(new Error('404'));
}
export default { get, navTags, navCategories }
''')
