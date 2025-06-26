To configure 'Prettier - Code formatter' (esbenp.prettier-vscode),
We need to add this data to .vscode files:

`.vscode/settings.json`:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.tabSize": 4,
  "eslint.workingDirectories": ["."],
}
```

And to recommend the extension:

`.vscode/extensions.json`:

```
{
  "recommendations": [
    "esbenp.prettier-vscode",
  ]
}
```
