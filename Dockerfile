FROM node:20
COPY ./ /app
WORKDIR /app
RUN npm install -g pnpm
RUN pnpm config set registry https://registry.npmmirror.com
RUN pnpm install && pnpm run build:h5

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist/build/h5 /app
COPY nginx.conf /etc/nginx/nginx.conf
