# Use prettier in your code

First install prettier as dev dependency, for example Node JS:

```
npm install --save-dev --save-exact prettier
```

Create your rules with a file named `..prettierrc` located on your root project. Example:

```
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

Maybe add custom different rules for specific files, just override:

```
{
  ...
  "overrides": [
    {
      "files": "prisma/seeds/**/*.ts",
      "options": {
        "printWidth": 120
      }
    }
  ]
}

------------------------------------------------------------------------------------

## IDE configuration

On PyCharm needs to have Pro license. Then just install de plugin and:
- Go to Settings > Languages and frameworks > JavaScript > Prettier. 
- Set 'Manual Prettier configuration' and select node_modules prettier as 'Prettier package'. 
- Do other configs you want.

On VSCode you can just install extension. (see `VSCode` notes)


