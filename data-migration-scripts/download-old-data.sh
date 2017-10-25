#!/bin/bash
echo 'Downloading authors'
curl http://www.u4.no/partner/admin/sanity/authors.cfm > authors.ndjson
echo 'Downloading tags'
curl http://www.u4.no/partner/admin/sanity/tags.cfm > tags.ndjson
echo 'Downloading publications'
curl http://www.u4.no/partner/admin/sanity/publications.cfm > publications.ndjson
echo 'Downloading resources'
curl http://www.u4.no/partner/admin/sanity/resources.cfm > resources.ndjson
echo 'Finished downloading'
