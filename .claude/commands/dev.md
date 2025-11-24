---
description: Start development server and show status
---

Start the Next.js development server:

1. Check if dev server is already running:
```bash
lsof -i :3000 2>/dev/null || echo "Port 3000 is available"
```

2. Start dev server in background:
```bash
npm run dev
```

3. Wait 5 seconds for server to start

4. Show status:
   - Dev server: http://localhost:3000
   - Ready for development
   - Velite watching for content changes

5. Remind user:
   - Edit files in `app/`, `components/`, or `content/`
   - Changes will hot-reload automatically
   - Use `/test` to run tests before committing

Note: Server runs in background. Use Ctrl+C in terminal to stop.
