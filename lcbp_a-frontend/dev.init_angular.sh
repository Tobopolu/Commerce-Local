#!/bin/bash
################################################################################

echo "Checking node_modules folder...";

if ! [ -d "./node_modules" ]; then

    echo "Installing node_modules folder...";
    npm install;
fi

echo "Starting Angular Application...";
ng serve --host 0.0.0.0 --port 4200

################################################################################
exit 0
