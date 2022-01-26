# Blog

[![CI Status](../../workflows/CI/badge.svg)](../../actions)
[![Deploy Status](../../workflows/Deploy/badge.svg)](../../actions)

Hi, welcome to my personal blog!

## Features

- [x] Support tag/archive/category list
- [x] Support Google Analytics
- [ ] Archive time line
- [ ] Home page

## Setup

### Install dependencies

1. Python3 is required to parse and compile markdown files. It's recommended to install [Anaconda](https://www.anaconda.com/) to manage different python versions.
2. npm is required for frontend development. [nvm](https://github.com/nvm-sh/nvm) is strongly recommended.
3. After setting up python3 and npm, run `make install` to install both python and npm dependencies.

### Google Analytics

1. Fill in id and view_id fields in `docs/config.toml`.
2. Get the json keyfile from [Google APIs - Credentials](https://console.developers.google.com/apis/credentials) and save it to `ga.json`.
3. Convert to a base64 environment variable by `cat ga.json | base64 | tr -d \\n | cat <(echo -n "export GA_API_BASE64=") - > ga.sh`.
4. Export the created environment variable by `source ga.sh`.
5. In the github repo, goto Settings -> Secrets -> New secret and add this environment variable, which will be used by github actions for deployment.
6. Run once with `make dev` and then you can comment out `python $(GA_PARSER) --config $(CONFIG) -o $(GA_OBJ)` in Makefile to disable GA tracing, since we don't need to keep track of the hit count during development.

### Disqus

Fill in the shortname field in `docs/config.toml`.

## Development

### Start local server

Run `make dev` to start the local server at `http://localhost:8089/`. Then view the website by entering this url in browser.

### Development and commit

TODO

### FAQ

Q: When run `make dev`, it reports `digital envelope routines::unsupported`?
A: Try `export NODE_OPTIONS=--openssl-legacy-provider`.
