# Git steps / Week 1: HTML, content and shared navigation

Complete the one-time setup in **../GIT-WORKFLOW.md** first. Keep one working repository for every stage. These commands are for you to run; they were not executed while preparing this package.

1. Open and understand this stage's site/index.html. Complete CHECKLIST.md.
2. Inspect your working repository before copying files. Preserve any work of your own.
3. Copy the contents of this stage's site folder, including hidden files, into the same working repository. The outer site folder must not become the repository root's child.

```powershell
$stageSource = 'C:\Users\jiang\Desktop\music project\course stages\03-week-1-html-and-navigation\site'
$workingRepo = 'C:\Users\jiang\Desktop\music project\website-repository'
Set-Location -LiteralPath $workingRepo
git status
Get-ChildItem -LiteralPath $stageSource -Force | ForEach-Object {
    Copy-Item -LiteralPath $_.FullName -Destination $workingRepo -Recurse -Force
}
git status --short
git diff --stat
git add -A
git diff --cached --check
git diff --cached --stat
git diff --cached
git commit -m 'Add fifteen sourced quotes and the five project ideas'
git push
git log -5 --oneline
```

Read the staged diff before committing. If Git reports no changes, there is no new change to commit. Additional suggestions below are for separate work you actually perform; copying a completed stage does not justify several empty or invented commits.

- Add fifteen sourced quotes and the five project ideas
- Reuse navigation and footer across seven pages
- Refine artist content and fix HTML and local links

Copying a later stage overwrites same-named files but does not delete older extra files. Review the diff and keep only deliberate changes. Do not copy an earlier stage over more advanced personal work without reviewing it first. No force push, reset or date rewriting is needed.

Update ../PROGRESS-LOG.md with the actual date, real commit ID, changed files and check result after your own commit and push.
