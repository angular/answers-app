FROM debian:jessie

COPY /dist /dist
COPY /package.json /dist/package.json

RUN apt-get update && apt-get install -y curl ca-certificates git openssl build-essential cmake libssl-dev libyaml-dev \
	--no-install-recommends

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /dist
RUN npm install --production

EXPOSE 3000
CMD node app/main-server.js