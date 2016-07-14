echo "=> Copying to server $1..."
rsync -avz -e ssh node_modules public libs routes proverbs app.js package.json $1:$2
echo '=> OK. Now connecting to the server and starting ...'
ssh $1 -e "cd $2 && curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get update && sudo apt-get install -y nodejs git build-essential && npm install -g pm2 && npm start && pm2 save"
echo "=> Done. You Should run 'pm2 startup' on the remote machine to allow the server to start the app on restart"
