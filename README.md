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
>```
># User rules for ubuntu
>ubuntu ALL=(ALL) NOPASSWD:ALL
>```

#### Setup ssh host at the host.
>~/.ssh/config
>```
>Host server-all
>    HostName 192.168.2.152
>    User ubuntu
>    IdentityFIle ~/.ssh/id_rsa.demo
>```

### Install applications
```bash
ansible-playbook ansible/setup-server.yml -e host=server-all -e env=production
```
