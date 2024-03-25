# kubectl get pods 
# kubectl delete service my-pod-service  
# kubectl delete all --all
# kubectl label node minikube node=test
# kubectl get node --show-labels
# kubectl get all
# kubectl describe pod ...
# minikube service chat-service --url 因chat-service為nodePort, 用來對外expose服務  
# minikube dashboard --url 
# echo -n "password"|base64
# kubectl api-resources|grep statefulset 
# kubectl get pv/pvc/sc/svc
# kubectl logs ...

kubectl apply -f build/mongo/mongo-config.yaml
kubectl apply -f build/mongo/mongo-secret.yaml
kubectl apply -f build/mongo/mongo.yaml
kubectl apply -f build/chat/chat.yaml


