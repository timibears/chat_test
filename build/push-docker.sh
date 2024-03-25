PHASE=production
REPOSITORY_NAME="kuo52033/chat-demo"
IMAGE=$REPOSITORY_NAME:$PHASE-1.5

# if [ -z "$PHASE" ]; then
# 	echo "PHASE argument is required!"
# 	exit 1
# fi

# if [ $PHASE != production ] && [ $PHASE != debug ]; then
# 	echo "PHASE argument not correct!"
# 	exit 1
# fi

docker build -t $IMAGE .

docker push $IMAGE

exit 0

# docker build \
# 	--build-arg NODE_ENV=$PHASE \
# 	-t $IMAGE .\

