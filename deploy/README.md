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
