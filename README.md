# chat
A chat room based on Socket.IO.

## Setup server
### Auth
#### Generate private, public key at the host.
```bash
# host
cd ~/.ssh
ssh-keygen
```
#### Setup authorized keys and sudo without the password.
```bash
# server
mkdir .ssh
cd .ssh
vi authorized_keys
# paste the public key then save
chmod 600 authorized_keys

sudo bash
cd /etc/sudoers.d
vi ubuntu
```
>/etc/sudoers.d/ubuntu
> ```
> # User rules for ubuntu
> ubuntu ALL=(ALL) NOPASSWD:ALL
> ```

#### Add ssh config at the host.
>~/.ssh/config
> ```
> Host server-all
>     HostName 192.168.2.152
>     User ubuntu
>     IdentityFIle ~/.ssh/id_rsa.demo
> ```


### Install applications
```bash
ansible-playbook ansible/setup-server.yml -e host=server-all -e env=production
```


### Manually install nginx
```bash
sudo apt install nginx
```
#### Turn off server tokens
http://nginx.org/en/docs/http/ngx_http_core_module.html#server_tokens
> /etc/nginx/nginx.conf
> ```
> server_tokens off;
> ```

#### Enable gzip
http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip
> /etc/nginx/nginx.conf
> ```
> gzip_vary on;
> gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
> ```

#### Site config
> /etc/nginx/sites-available/chat
> ```
> upstream web_backend {
>     server 127.0.0.1:3000;
>     keepalive 32;
> }
> server {
>     server_name _;
>     listen 80;
>     listen [::]:80;
> 
>     location / {
>         proxy_pass http://web_backend;
>         proxy_http_version 1.1;
>         proxy_set_header X-Forwarded-For $remote_addr;
>         proxy_set_header Host $http_host;
>         proxy_set_header Upgrade $http_upgrade;
>         proxy_set_header Connection $http_connection;
>     }
> }
> ```

```bash
cd /etc/nginx/sites-enabled
ln -s ../sites-available/chat .
rm /etc/nginx/sites-enabled/default
sudo service nginx reload
```
+ [Using the Forwarded header](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)
+ [Embedded Variables: $remote_addr](https://nginx.org/en/docs/http/ngx_http_core_module.html#var_remote_addr)
+ [proxy_http_version](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_http_version)
+ [NGINX as a WebSocket Proxy](https://www.nginx.com/blog/websocket-nginx/)


### Manually install node.js
https://github.com/nodesource/distributions#installation-instructions
```bash
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install nodejs
```
#### What is `curl -fsSL` ?
https://explainshell.com/explain?cmd=curl+-fsSL+https%3A%2F%2Fdeb.nodesource.com%2Fsetup_14.x+%7C+sudo+-E+bash+-

