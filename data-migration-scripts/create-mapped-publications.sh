#!/bin/bash

echo 'Starting work'
node rewriteWithNewTopics.js < publications.ndjson > publicationsMapped.ndjson
echo 'Done with work'

