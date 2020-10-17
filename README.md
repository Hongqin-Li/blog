# blog

[![CI Status](https://github.com/Hongqin-Li/blog/workflows/CI/badge.svg)](https://github.com/Hongqin-Li/blog/actions)
[![Deploy Status](https://github.com/Hongqin-Li/blog/workflows/Deploy/badge.svg)](https://github.com/Hongqin-Li/blog/actions)


## Features
- [-] tag/archive/category list
- [-] Support Google Analytics
- archive time line
- home

## Google Analytics Setup

1. Fill in id and view_id fields in docs/config.toml
2. Get the json keyfile from []() and save it to ga.json
3. `cat ga.json | base64 -w 0 | cat <(echo -n "export GA_API_BASE64=") - > ga.sh`
4. `source ga.sh`

## Project setup

npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
