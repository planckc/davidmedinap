---
description: Create a new blog post with proper frontmatter
---

Create a new MDX blog post with the following steps:

1. Ask the user for:
   - Post title
   - Language (en/es/fr)
   - Category (technology/data-engineering/community)
   - Optional: description, tags

2. Generate a slug from the title (lowercase, hyphens, no special chars)

3. Create the file at: `content/blog/{lang}/{category}/{slug}.mdx`

4. Use this template:

```mdx
---
title: "{title}"
date: "{today's date in YYYY-MM-DD}"
lang: "{lang}"
category: "{category}"
published: false
description: "{description or empty}"
tags: [{tags or empty array}]
---

# {title}

[Start writing content here...]
```

5. Confirm the file was created and show the path

Note: Set `published: false` by default so posts aren't live until reviewed.
