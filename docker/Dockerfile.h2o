FROM debian:jessie

COPY /h2o.conf /h2o.conf.tmpl
COPY /dist /dist
COPY /server /server
COPY /certs /certs

RUN apt-get update && apt-get install -y curl ca-certificates git openssl build-essential cmake libssl-dev libyaml-dev \
	--no-install-recommends

RUN curl -sL https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get install -y nodejs --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*

RUN git clone -q https://github.com/h2o/h2o.git

WORKDIR /h2o
RUN git checkout c07e118ea7f9ce9643db5ce0b77f7d7b10f83903
RUN git submodule update --init --recursive && \
    cmake . && \
    make -j 4 h2o
RUN mkdir logs

EXPOSE 8081

CMD sed -e "s/__UNIVERSAL_ADDR__/${UNIVERSAL_SERVICE_HOST}:${UNIVERSAL_SERVICE_PORT}/" /h2o.conf.tmpl > /h2o.conf && \
    rm /h2o.conf.tmpl && \
    echo "h2o config:" && \
    cat /h2o.conf && \
    ./h2o -c /h2o.conf
