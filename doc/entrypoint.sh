#!/bin/sh
set -e
python3 /entrypoint/start.py
exec "$@"