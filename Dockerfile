# syntax=docker/dockerfile:1

# Build stage: install dependencies and compile the React bundle
FROM node:18-bullseye AS builder
WORKDIR /app
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage: serve the compiled assets with NGINX on Ubuntu
FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update     && apt-get install -y --no-install-recommends nginx     && rm -rf /var/lib/apt/lists/*     && rm -f /etc/nginx/sites-enabled/default /etc/nginx/conf.d/default.conf

RUN cat <<'NGINXCONF' > /etc/nginx/conf.d/default.conf
server {
    listen 4203;
    listen [::]:4203;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }
}
NGINXCONF

COPY --from=builder /app/build /var/www/html

EXPOSE 4203
CMD ["nginx", "-g", "daemon off;"]
