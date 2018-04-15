#!/bin/bash

#Clean client directory other than the build directory
find ./client/ -mindepth 1 -maxdepth 1 \! -name build -exec rm -rf {} +

#Clean files from the project that aren't needed for the deployment
rm -rf ./.editorconfig
rm -rf ./.git/
rm -rf ./.gitignore
rm -rf ./.nvmrc
rm -rf ./.prettierrc
rm -rf ./bitbucket-pipelines.yml
rm -rf ./package-lock.json
rm -rf ./README.md
rm -rf ./Refactor.md
rm -rf ./support/