#!/bin/bash
echo '=> Configuration...'
PORT=$(json -f package.json config.port | sed -e 's/\n//g')
echo -n "Enter Port [$PORT]: "
read -r newport
if [ -n "$newport" ]
then
  json -I -f package.json -e "this.config.port=$newport"
  echo "Port set to $newport"
else
  echo "Port set to $PORT"
fi
PROVERBS=$(json -f package.json config.proverbs | sed -e 's/\n//g')
echo -n "Enter Port [$PROVERBS]: "
read -r newproverb
if [ -n "$newproverb" ]
then
  json -I -f package.json -e "this.config.proverbs=$newproverb"
  echo "Port set to $newproverb"
else
  echo "Port set to $PROVERBS"
fi
echo '=> Configuration Complete'
