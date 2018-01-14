#!/bin/bash
NODE_ENV=production npm run build:ts
cp bootstrap/* dist/