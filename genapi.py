import sys
import json

if __name__ == "__main__":
    paths = sys.stdin.read().split()
    api = {}

    for path in paths:
        assert path.startswith("docs/")
        assert path.endswith(".md")

        api['/' + path[:-3]] = f"() => import('@/obj/{path[:-3]}.json')"
        
    print('export default {\n' + ',\n'.join([ f"'{k}': {v}" for k, v in api.items()]) + '}')
        

