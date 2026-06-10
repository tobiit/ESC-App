# Deployment (Ubuntu 24 + NGINX)

## Paths used

- App path: /var/www/esc.basisadresse.de/
- Service: /etc/systemd/system/escapp.service
- NGINX site: /etc/nginx/sites-available/escapp

## Systemd service

Copy deploy/escapp.service to /etc/systemd/system/escapp.service and run:

- sudo systemctl daemon-reload
- sudo systemctl enable --now quiz

## NGINX

Copy deploy/nginx-escapp.conf to /etc/nginx/sites-available/escapp and run:

- sudo ln -s /etc/nginx/sites-available/escapp /etc/nginx/sites-enabled/
- sudo nginx -t
- sudo systemctl reload nginx

## TLS

Use certbot for HTTPS:

- sudo certbot --nginx -d esc.basisadresse.de

## Start Stack Locally

To start the complete stack locally, use 
./start-stack.sh 
This script will check, if it is required to rebuild
the containers and start the different containers.

The user-interface will be available locally on localhost:5173 (admin localhost:5173/verwaltung)

To start the stack with a refreshed and emptied database use
--clean-db
