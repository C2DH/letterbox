#!/bin/bash
set -e
set -o allexport
cd /
source .env
set +o allexport

if [ "$MODE" = "dev" ]; then
  echo "/!\\ Mode is set to DEV /!\\"
else
  echo "/!\\ Mode is set to PRODUCTION /!\\"
fi
echo "(i) Npm version is $(npm -v)"
echo "(i) Node version is $(node -v)"

cd /code

echo
echo " ~"
echo " ~ Install dependencies"
echo " ~"
echo
npm install

if [ "$MODE" = "dev" ]; then
  echo
  echo " ~"
  echo " ~ Starting dev mode"
  echo " ~"
  echo
  npm run dev
else
  echo
  echo " ~"
  echo " ~ Start prod mod"
  echo " ~"
  echo
  npm run prod
fi
