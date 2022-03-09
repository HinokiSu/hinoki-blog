#!/bin/sh

set -e
pwd
ls -la
# define path variable of remote repo
remote=$DIST_REPO
echo 'remote address is: '$remote

# create a direction for publishing the project
mkdir blog-web-rp
cd blog-web-rp

# create a new repo
# $GH_EMAIL、$GH_EMAIL both are environment variables
git config --global user.email "$GH_EMAIL" >/dev/null 2>&1 # /dev/null 2>&1, in order not to appear in the terminal
git config --global user.name "$GH_NAME" >/dev/null 2>&1 
# init temporary repo
git init
# associate with a remote repo
git remote add --fetch origin "$remote" #

# checkout blog-web-dist branch
# verify git, does blog-web-dist branch exist? switch if exists, create otherwise
if git rev-parse --verify origin/blog-web-dist >/dev/null 2>&1; then
  git checkout blog-web-dist
  # remove old file
  git rm -rf .
else
  git checkout --orphan blog-web-dist
fi

# copy the built file diretory
cp -a "../${STATIC_SOURCE}/." .
# watch copied file
ls -la

# add all files to git
git add -A
# add a commit
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]" # 【ci skip】是为了跳过ci的构建
# push
git push --force --quiet origin blog-web-dist
# recycle, delete temporary branchs and diretories
cd ..
rm -rf git-pages-rp

echo "Delpoy Sucessful"