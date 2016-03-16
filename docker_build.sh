# Requires you to login with gcloud and set the correct project id
timestamp=`date +"%s"`
rm -rf node_modules typings dist
npm install
gulp
echo "Creating image with tag v${timestamp}"
mkdir -p tmp/certs
echo "Copying certs from cloud storage"
gsutil cp gs://answers-app-certificates/* tmp/certs
name=us.gcr.io/angular-mobile/answers-app:v${timestamp}
echo "Building Docker image: ${name}"
docker build -t $name .
echo "Pushing ${name} to Container Registry"
gcloud docker push $name
echo "Starting rolling update for $name"
kubectl rolling-update answers-app --image=$name
