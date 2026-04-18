---
name: Never use git commands
description: Doc sync writer must never run git operations — read source code, write only markdown docs
type: feedback
---

Never use git commands. Only read source code files and update markdown documentation files in `doc/`. Do not commit, push, or run any git operations.

**Why:** The doc sync writer role is strictly documentation maintenance — source control operations are handled separately by the user or CI pipelines.

**How to apply:** When you start a documentation task, verify your work will be bounded to reading source files (with Read, Glob, Grep) and writing to `doc/` directory only. If a task seems to require git, clarify with the user before proceeding.
