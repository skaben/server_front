#!/usr/bin/env bash

cd /app

if [[ $ENVIRON != 'dev' ]]; then
    npm run build
    npm run start
else
    npm run dev
fi
