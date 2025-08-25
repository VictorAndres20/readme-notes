echo "Getting script dirname"
SCRIPT_DIR=$(dirname "$0")
sleep 1
echo "Moving to script dir"
cd "$SCRIPT_DIR" || exit
sleep 1
echo "Moving Docker files"
cp Dockerfile ../../. && cp .dockerignore ../../.