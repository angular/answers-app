#!/bin/bash
DEPLOY=0

while getopts "d" opt; do
  case "$opt" in
    d)
      DEPLOY=1
      ;;
  esac
done

function set_image() {
  sed -i .bak -e "s|image:.*|image: $2|" "$1"
  rm "$1.bak"
}

# Requires you to login with gcloud and set the correct project id
timestamp=`date +"%s"`

# Setup and build
echo "Cleanup and environment setup"
rm -rf node_modules typings dist
npm install

echo "Building Docker contexts"
gulp copy:docker

echo "Copying certs from cloud storage"
mkdir -p docker/dist/h2o/certs
gsutil cp gs://answers-app-certificates/* docker/dist/h2o/certs

name_h2o=us.gcr.io/angular-mobile/answers-app-h2o:v${timestamp}
name_universal=us.gcr.io/angular-mobile/answers-app-universal:v${timestamp}

echo "Building Docker h2o image: ${name_h2o}"
docker build -t $name_h2o docker/dist/h2o

echo "Building Docker universal image: ${name_universal}"
docker build -t $name_universal docker/dist/universal

echo "Pushing ${name_h2o} to Container Registry"
gcloud docker push ${name_h2o}
set_image "docker/h2o-rc.yaml" "${name_h2o}"

echo "Pushing ${name_universal} to Container Registry"
gcloud docker push ${name_universal}
set_image "docker/universal-rc.yaml" "${name_universal}"

if [ "$DEPLOY" == "1" ]
then
  echo "Starting rolling update for ${name_universal}"
  kubectl rolling-update answers-app-universal --image="${name_universal}"
  
  echo "Starting rolling update for ${name_h2o}"
  kubectl rolling-update answers-app-h2o --image="${name_h2o}"
fi
