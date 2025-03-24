FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat && mkdir "/app"
WORKDIR /app
COPY .. ./
RUN yarn install && yarn run build
# yarn install --frozen-lockfile

FROM nginx:1.25.2-alpine3.18
COPY --from=deps /app/build /usr/share/nginx/html
ENV NODE_ENV="production"
ENV TZ=Asia/Shanghai
