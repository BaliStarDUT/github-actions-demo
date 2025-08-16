#!/bin/bash
set -x
set -e

RUN_NAME="x.y.z"

mkdir -p output

# go build
GOOS=linux GOARCH=amd64 go build  -o output/${RUN_NAME}_linux_amd64
GOOS=darwin GOARCH=amd64 go build  -o output/${RUN_NAME}_darwin_amd64