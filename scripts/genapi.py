import os
import glob
import argparse

if __name__ == "__main__":

    parser = argparse.ArgumentParser()
    parser.add_argument("--api-dir", required=True)
    parser.add_argument("--src-dir", required=True)
    parser.add_argument("-o", "--output")
    args = parser.parse_args()

    api_dir, src_dir = args.api_dir, args.src_dir
    output_file = os.path.join(api_dir, "api.js")
    if args.output:
        output_file = args.output

    urls = [os.path.relpath(p, api_dir)
            for p in glob.glob(os.path.join(api_dir, "**", "*.json"),
                               recursive=True)]

    api = dict([(os.path.sep + os.path.splitext(url)[0], f"""\
() => import('@/{os.path.join(os.path.relpath(api_dir, src_dir), url)}')""")
                for url in urls])

    with open(output_file, 'w') as f:
        f.write('''\
const apis = {\n  ''' + ',\n  '.join([f"'{k}': {v}" for k, v in api.items()]) + '\n}' + '''

function get(url) {
  if (apis[url])
    return new Promise((resolve, reject) => {
      apis[url]()
        .then(({default: d}) => resolve(d))
        .catch(e => reject(e));
    });
  else return Promise.reject(new Error(`${url} not found.`));
}
export default { get }
''')
