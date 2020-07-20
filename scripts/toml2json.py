import sys
import json
import toml


if __name__ == "__main__":
    print(json.dumps(toml.loads(sys.stdin.read()),
                     ensure_ascii=False))
