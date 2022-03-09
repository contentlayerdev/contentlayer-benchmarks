#!/bin/sh

# Install dependencies
yarn install

# Generate content
pushd scripts/generate-content
npm run generate-content
popd

# Run builds
pushd scripts/run-builds
npm run run-builds

