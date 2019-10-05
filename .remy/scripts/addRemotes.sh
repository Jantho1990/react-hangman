#!/bin/bash

pushd /usr/src/app

echo "Configuring Git"
git config --global user.name $1
git config --global user.email "$1@koji-projects.com"
git config --global credential.helper "!f() { sleep 1; echo 'username=$1'; echo 'password=$2'; }; f"

echo "Adding git remotes"

# If there's already a .git directory, we don't need to do anything
if git remote -v | grep -q "origin"; then
  echo "Origin already set"
  if git remote -v | grep -q $3; then
    echo "Origin matches project origin, doing nothing"
    exit 0
  fi
fi

echo "Setting upstream"
git remote rm upstream
git remote add upstream $4

echo "Merging new upstream remote into working copy"
git fetch upstream
git merge -X theirs upstream/master

# Add the project's origin remote
echo "Creating new origin remote"
git remote rm origin
git remote add origin $3

# Create and push an initial commit
echo "Creating an initial commit"
git add -A
git commit -m "Initial commit"
git push -u origin master
