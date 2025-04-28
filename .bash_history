docker run hello-world
mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.24.4/docker-compose-linux-aarch64   -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
docker compose version
arecord -l
arecord -D plughw:1,0 -f cd test.wav
aplay test.wav
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
aplay -D plughw:3,0 test.wav
ls
aplay -D plughw:3,0 test.wav
arecord -l
aplay test.wav
aplay -D  test.wav
aplay test.wav
alsamixer
aplay -l
sudo nano /etc/modprobe.d/alsa-base.conf
sudo reboot
aplay -l
sudo nano /etc/modprobe.d/alsa-base.conf
aplay -l
lsusb
sudo nano /etc/modprobe.d/alsa-base.conf
sudo rm /etc/modprobe.d/alsa-base.conf
sudo nano /etc/asound.conf 
sudo reboot
aplay -l
aplay -D  test.wav
aplay   test.wav
sudo nano verificar_audio.sh
chmod +x verificar_audio.sh
sudo chmod +x verificar_audio.sh
verificar_audio.sh
ls
sh verificar_audio.sh 
sudo nano verificar_audio.sh 
basj verificar_audio.sh 
bash verificar_audio.sh 
sudo nano /etc/asound.conf
bash verificar_audio.sh 
sudo nano verificar_audio.sh 
cat ~/.asoundrc
sudo nano verificar_audio.sh 
./verificar_audio.sh
cat /etc/asound.conf 
DEFAULT_CARD=$(aplay -L | grep -A1 "^default" | tail -n1)
aplay -L | grep -A1 "^default" | tail -n1
aplay -L | grep -A1 "^default" 
aplay -L | grep -A1
aplay -L 
aplay -D default -v /dev/zero 2>&1 | grep "Hardware PCM"
aplay -D default -v /dev/zero 2>&1 
if echo "$DEFAULT_CARD" | grep -q "$EXPECTED_CARD_NAME"; then
echo "$DEFAULT_CARD" 
aplay -D default -v /dev/zero
aplay -D default -f cd -c 2 -r 44100 -v /dev/zero
sudo nano verificar_audio.sh 
./verificar_audio.sh 
sudo nano verificar_audio.sh 
aplay -D default -f cd -c 2 -r 44100 -v /dev/zero 2>&1 | grep "Hardware PCM"
aplay -D default -f cd -c 2 -r 44100 -v /dev/zero 2>&1 
aplay -D default -f cd -c 2 -r 44100 -v 
fuser -v /dev/snd/*
lsof | grep /dev/snd
fuser -v /dev/snd/*
grep ICUSBAUDIO7D /proc/asound/cards
grep ICUSBAUDIO7D /proc/asound/cardkill 1177
kill 1177
fuser -v /dev/snd/*
sudo kill 1177
fuser -v /dev/snd/*
sudo kill -9 1177
fuser -v /dev/snd/*
cat /proc/asound/cards
ls
mkdir -p ~/silentJoyStation/{webroot/hls,webroot/css,webroot/js,musica}
cd ~/silentJoyStation
touch docker-compose.yml nginx.conf webroot/index.html
sudo chown -R 1000:1000 ~/silentJoyStation
ls
sudo nano docker-compose.yml 
ls
sudo nano nginx.conf 
ls
cd webroot/
ls
cd js
ls
cd ..
sudo nano iin
sudo nano index.html 
cd..
cd ..
ls
sudo nano nginx.conf 
cd webroot/
sudo nano index.html 
cd ..
ls
cat docker-compose.yml 
docker compose up -d
sudo nano docker-compose.yml 
docker compose up -d
docker compose up -d --remove-orphans
docker ps
sudo nano docker-compose.yml 
docker compose up -d --force-recreate --no-deps live_stream
docker ps
cd ..
mkdir -p ~/silentJoyAdmin/{backend,webadmin} && cd ~/silentJoyAdmin && touch docker-compose.yml backend/server.js webadmin/index.html
ls
sudo nano docker-compose.yml 
ls
cd webadmin/
ls
sudo nano index.html 
cd ..
ls
cd backend/
ls
sudo nano server.js 
cd ..
docker compose up -d
curl -X POST http://<ip_de_la_pi>:5050/sync   -H "Content-Type: application/json"   -d '{"id": "usuario123", "segment": 42}'
curl -X POST http://localhost:5050/sync   -H "Content-Type: application/json"   -d '{"id": "usuario123", "segment": 42}'
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "usuario123", "segment": 42}'
docker ps
docker ps -a
docker logs silentjoy_admin_backend
sudo nano docker-compose.yml 
docker compose up -d --force-recreate admin-backend
docker ps -a
docker logs silentjoy_admin_backend
cd ..
ls
cd silentJoyStation/
ls
cd webroot/
ls
sudo nano index.html 
cd --
cd silentJoyAdmin/
nano ~/silentJoyAdmin/backend/package.json
ls
sudo nano docker-compose.yml 
docker compose up -d --force-recreate
docker logs silentjoy_admin_backend
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "usuario123", "segment": 42}'
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "usuario123", "segment": 43}'
curl -L http://192.168.88.252:5050/events
cd __
cd --
cd silentJoyStation/
cd webroot/
ls
sudo nano index.html 
sudo cp index.html index.html_bu
sudo rm index.html
sudo nano index.html
sudio nanbo silentJoyAdmin/webadmin/index.html
sudo nano silentJoyAdmin/webadmin/index.html
cd --
sudo nano silentJoyAdmin/webadmin/index.html
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "usuario123", "segment": 43}'
sudo nano silentJoyAdmin/webadmin/index.html
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "usuario123", "segment": 43}'
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "usuario124", "segment": 44}'
sudo nano silentJoyStation/webroot/index.html
sudo nano silentJoyAdmin/webadmin/index.html
cd silentJoyStation/
ls
cd webroot/
ls
cp index.html index.html_bu 
sudo cp index.html index.html_bu 
sudo rm index.html
sudo nano index.html
cat index.html_bu
sudo nano index.html
cd --
cd silentJoyAdmin/
ls
cd backend/
ls
sudo nano server.js 
cd ..
ls
cd webadmin/
ls
sudo nano ~/silentJoyStation/webroot/index.html
cd ..
docker compose up -d --force-recreate --no-deps admin-backend
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "test123", "segment": 77}'
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "test124", "segment": 77}'
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "test1924", "segment": 77}'
sudo nano ~/silentJoyStation/webroot/index.html
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "test194", "segment": 77}'
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "test195", "segment": 77}'
sudo nano ~/silentJoyStation/webroot/index.html
curl -X POST http://192.168.88.252:5050/sync   -H "Content-Type: application/json"   -d '{"id": "test195", "segment": 77}'
sudo nano ~/silentJoyStation/webroot/index.html
exit
ifconfig
nmcli
nmcli device
nmcli device wifi list ifname wlan0
nmcli decive wifi connect "Livebox6-4531-24G" password "4K6v4oxn3NL" ifname WLAN0
nmcli device wifi connect "Livebox6-4531-24G" password "4K6v4oxn3NL" ifname WLAN0
nmcli device wifi connect "Livebox6-4531-24G" password "4K6v4oxn3NL" ifname Wlan0
nmcli device wifi connect "Livebox6-4531-24G" password "4K6v4oxn3NL" ifname wlan0
sudo nmcli device wifi connect "Livebox6-4531-24G" password "4K6v4oxn3NL" ifname wlan0
sudo nmcli device wifi connect "Livebox6-4531-24G" password "4K6v4Koxn3NL" ifname wlan0
cd silentJoyStation/
cd webroot/
curl -o hls.min.js https://cdn.jsdelivr.net/npm/hls.js@latest
ls
mkdir fonts
sudo nano index.html
cd silentJoy
cd silentJoyStation/
sudo nano docker-compose.yml 
docker ps
docker compose up -d
sudo nano docker-compose.yml 
docker compose up -d
alsamixer
cd silentJoyStation/webroot/
sudo nano index.html
sudo nano silentJoyStation/webroot/index.html
cd silentJoy
cd silentJoyStation/
sudo nano docker-compose.yml 
docker compose up -d
sudo nano docker-compose.yml 
docker ps
docker restart live_stream
docker ps
sudo nano docker-compose.yml 
docker restart live_stream
cd webroot/
ls
cat index.html
ls
sudo apt update
sudo apt install openvpn -y
sudo nano /etc/openvpn/client/client1.ovpn
sudo systemctl enable openvpn-client@client1
sudo systemctl start openvpn-client@client1
systemctl status openvpn-client@client1.service
cat /etc/openvpn/client/client1.conf
sudo mv /home/enrique/client1.ovpn /etc/openvpn/client/client1.conf
sudo sudo mv /home/enrique/client1.ovpn /etc/openvpn/client/client1.conf
sudo sudo mv /etc/openvpn/client/client1.ovpn /etc/openvpn/client/client1.conf
sudo systemctl enable openvpn-client@client1
sudo systemctl start openvpn-client@client1
sudo systemctl status openvpn-client@client1
sudo systemctl start openvpn-client@client1
sudo systemctl status openvpn-client@client1
restart
sudo reboot
sudo systemctl status openvpn-client@client1
sudo systemctl edit openvpn-client@client1
/etc/systemd/system/openvpn-client@client1.service.d/override.conf
sudo nano /etc/systemd/system/openvpn-client@client1.service.d/override.conf
sudo systemctl edit openvpn-client@client1
sudo nano /etc/systemd/system/openvpn-client@client1.service.d/override.conf
sudo systemctl daemon-reload
sudo systemctl restart openvpn-client@client1
sudo systemctl status  openvpn-client@client1
sudo systemctl restart openvpn-client@client1
sudo systemctl status  openvpn-client@client1
ping 10.0.10.1
sudo systemctl restart  openvpn-client@client1
sudo systemctl status  openvpn-client@client1
ping 10.0.10.1
