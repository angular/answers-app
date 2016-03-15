FROM debian:jessie

RUN apt-get update && apt-get install -y curl ca-certificates git openssl build-essential cmake libssl-dev libyaml-dev \
	--no-install-recommends

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*

RUN git clone -q https://github.com/h2o/h2o.git --depth 1

WORKDIR /h2o
RUN git submodule update --init --recursive && \
    cmake . && \
    make -j 4 h2o

EXPOSE 8081
COPY /h2o.conf /h2o.conf
COPY /dist /dist
COPY /package.json /dist/package.json
WORKDIR /dist
RUN npm install --production
WORKDIR /h2o
COPY /server /server
RUN mkdir logs
CMD node ../dist/app/main-server.js & ./h2o -c /h2o.conf