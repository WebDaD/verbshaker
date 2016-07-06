echo 'myVerses Installer started'
echo 'Installing System Requirements'
sudo apt-get install -y git build-essential
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
echo 'Cloning Source Code into /opt/verbshaker'
cd /opt
sudo mkdir -p /opt/verbshaker
sudo chmod 755 verbshaker
cd verbshaker
git clone https://github.com/WebDaD/verbshaker.git .
echo 'Deploying App'
sudo npm run deploy -s
