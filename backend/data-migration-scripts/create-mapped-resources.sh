#!/bin/bash

echo 'Starting work'
node rewriteWithNewTopics.js < resources.ndjson > resourcesMapped.ndjson
echo 'Done with work'
