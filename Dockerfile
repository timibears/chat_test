FROM node:14-alpine

ENV PORT=3000
WORKDIR /chat
COPY . .
RUN npm install
RUN npm run build
RUN rm -r node_modules
RUN npm install --only=prod
EXPOSE ${PORT}
CMD ["node", "dist/backend/web.js"]

# For debug
#RUN apk update && apk add bash
#CMD ["/bin/bash"]

# docker build . -t chat-image
# docker-compose -f docker-compose.yml up
