#!/bin/sh

# Install dependencies
yarn install

# Generate content
cd scripts/generate-content
npm run generate-content

# Run builds
cd ../run-builds
npm run run-builds

