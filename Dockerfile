# The builder from node image
FROM node:alpine as builder

# prod|qa its value will be come from outside 
ARG env=prod

RUN apk update && apk add --no-cache make git

# Move our files into directory name "web"
WORKDIR /web
COPY ./app /web
RUN npm install @angular/cli -g
RUN cd /web && npm install

# Build with $env variable from outside
RUN cd /web && npm run build --$env

# Build a small nginx image with static website
FROM nginx:alpine
COPY --from=builder /web/dist/app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["nginx", "serve", "--host=0.0.0.0"]
RUN set -x \
        && rm -f /etc/nginx/conf.d/default.conf