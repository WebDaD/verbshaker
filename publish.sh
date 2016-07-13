echo '=> Publishing...'
rsync -avz -e ssh node_modules public libs routes proverbs app.js package.json $1
echo '=> OK. Now connect to the server and startup the server'
