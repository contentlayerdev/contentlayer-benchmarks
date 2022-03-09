#!/bin/sh

# Install dependencies
yarn install

# Generate content
cd scripts/generate-content
npm run generate-content
cd -

# Run builds
cd scripts/run-builds
npm run run-builds

