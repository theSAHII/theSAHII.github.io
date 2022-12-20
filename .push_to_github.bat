set /p "commit-message= Commit message : "

git add --all
git commit -m "%commit-message%"
git push --all

PAUSE
EXIT