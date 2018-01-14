#!/bin/bash
PKG_VERSION=$(cat package.json | grep "version" | sed -n 's/[^0-9]*\([0-9\.]*\).*/\1/p')
echo $PKG_VERSION
rm -rf dist
npm run build:prod
mv dist "v$PKG_VERSION"
mkdir dist
mv "v$PKG_VERSION" dist/
cp -r dist/v$PKG_VERSION dist/current