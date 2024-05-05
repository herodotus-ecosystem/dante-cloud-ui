#!/bin/sh

ROOT_DIR=/etc/nginx/html/ui

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/static/js/environment.js;
do
  echo "Processing $file ...";
  sed -i 's|DANTE_SERVER_PROJECT|'${DANTE_SERVER_PROJECT}'|g' $file
done

echo "Starting Nginx"
