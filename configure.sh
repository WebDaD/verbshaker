#!/bin/bash
echo '=> Configuration...'
echo -n "Skip Configuration and use Default Values? (y|n) [n]: "
read -n 1 skip
echo ''
if [ $skip == "y" ]
then
  echo '=> Configuration Skipped'
  exit 0
fi
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
# TODO show docs
# TODO show default
# TODO show changevale
echo '=> Configuration Complete'
exit 0
