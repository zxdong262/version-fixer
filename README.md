# version-fixer
[![Build Status](https://travis-ci.org/zxdong262/version-fixer.svg?branch=master)](https://travis-ci.org/zxdong262/version-fixer)

read current installed module version and update `package.json` or make all module version to `*`

example: will change `"commander": "*"` to `"commander": "2.8.1"` in `package.json`

## install
```bash
npm install version-fixer -g
```

## use
```bash
cd your project_folder
version-fixer
```

or
```bash
version-fixer path/to/your/project
```

with prefix
```bash
version-fixer -p '^' path/to/your/project
```

make all version number to `*`
```bash
version-fixer -p '*' path/to/your/project
```


## test
```bash
git clone https://github.com/zxdong262/version-fixer.git
cd version-fixer
npm i
mocha
```

## License
MIT