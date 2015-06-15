# version-fixer
read current installed module version and update `package.json`

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

## test
```bash
git clone https://github.com/zxdong262/version-fixer.git
cd version-fixer
npm i
mocha
```

## License
MIT