echo 'Verbshaker Installer started'
echo 'Installing System Requirements'
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs git build-essential
echo 'Cloning Source Code into /opt/verbshaker'
cd /opt
sudo mkdir -p /opt/verbshaker
sudo chmod 755 verbshaker
cd verbshaker
git clone https://github.com/WebDaD/verbshaker.git .
echo 'Deploying App'
sudo npm run deploy -s
