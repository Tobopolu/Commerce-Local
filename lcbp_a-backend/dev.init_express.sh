#!/bin/bash
################################################################################

echo "Checking node_modules folder...";

if ! [ -d "./node_modules" ]; then

    echo "Installing node_modules folder...";
    npm install;
fi

echo "Starting Angular Application...";
nodemon ./server.js --host 0.0.0.0 --port 8000

################################################################################
exit 0
