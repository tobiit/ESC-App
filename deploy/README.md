# Deployment (Ubuntu 24 + NGINX)

## Paths used

- App path: /var/www/quiz.basisadresse.de/htdocs
- Service: /etc/systemd/system/quiz.service
- NGINX site: /etc/nginx/sites-available/quiz

## Systemd service

Copy deploy/quiz.service to /etc/systemd/system/quiz.service and run:

- sudo systemctl daemon-reload
- sudo systemctl enable --now quiz

## NGINX

Copy deploy/nginx-quiz.conf to /etc/nginx/sites-available/quiz and run:

- sudo ln -s /etc/nginx/sites-available/quiz /etc/nginx/sites-enabled/
- sudo nginx -t
- sudo systemctl reload nginx

## TLS

Use certbot for HTTPS:

- sudo certbot --nginx -d quiz.basisadresse.de
