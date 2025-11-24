---
description: Sync local changes to GitHub
---

Synchronize local changes with GitHub:

1. Check git status:
```bash
git status
```

2. Show user what files have changed

3. Ask if they want to commit changes

4. If yes, ask for commit message or generate one based on changes

5. Stage, commit, and push:
```bash
git add .
git commit -m "{message}"
git push origin main
```

6. Confirm sync complete and show GitHub URL:
   https://github.com/planckc/davidmedinap

Note: Use meaningful commit messages. Prefix with feat:/fix:/docs:/test: when appropriate.
