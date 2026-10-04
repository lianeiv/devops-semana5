#!/usr/bin/env bash
set -e
mkdir -p nginx/certs
MSYS_NO_PATHCONV=1 openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/certs/selfsigned.key \
  -out nginx/certs/selfsigned.crt \
  -subj "/CN=localhost"
echo "Certificados gerados em nginx/certs/"
