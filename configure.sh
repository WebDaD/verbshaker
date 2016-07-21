#!/bin/bash
echo '=> Configuration...'
echo -n "Skip Configuration and use Default Values? (y|n) [n]: "
read -r -n 1 skip
echo ''
if [ "$skip" == "y" ]
then
  echo '=> Configuration Skipped'
  exit 0
fi
function textValue {
  PARM=$(json -f package.json config."$1" | sed -e 's/\n//g')
  read -r -p "$2 [$PARM]: " newparm
  if [ -n "$newparm" ]
  then
    exeString="this.config."
    exeString+=$1
    exeString+="="
    exeString+=$newparm
    json -I -q -f package.json -e "$exeString"
    echo "$1 set to $newparm"
  else
    echo "$1 set to $PARM"
  fi
}
function colorValue {
  PARM=$(json -f package.json config."$1" | sed -e 's/\n//g')
  read -r -p "$2 [$PARM]: " newparm
  if [ -n "$newparm" ]
  then
    exeString="this.config."
    exeString+=$1
    exeString+="=\""
    exeString+=$newparm
    exeString+="\""
    json -I -q -f package.json -e "$exeString"
    echo "$1 set to $newparm"
  else
    echo "$1 set to $PARM"
  fi
}
function pathValue {
  PARM=$(json -f package.json config."$1" | sed -e 's/\n//g')
  read -r -p "$2 [$PARM]: " -e newparm
  if [ -n "$newparm" ]
  then
    exeString="this.config."
    exeString+=$1
    exeString+="="
    exeString+=$newparm
    json -I -q -f package.json -e "$exeString"
    echo "$1 set to $newparm"
  else
    echo "$1 set to $PARM"
  fi
}
function boolValue {
  PARM=$(json -f package.json config."$1" | sed -e 's/\n//g')
  if [ "$PARM" == "true" ]
  then
    parm_char="y"
  else
    parm_char="n"
  fi
  read -r -p "$2 (y|n) [$parm_char]? " -n 1 newparm
  echo ''
  if [ -n "$newparm" ]
  then
    if [ "$newparm" == "y" ]
    then
      newparm_value="true"
    else
      newparm_value="false"
    fi
    exeString="this.config."
    exeString+=$1
    exeString+="="
    exeString+=$newparm_value
    json -I -q -f package.json -e "$exeString"
    echo "$1 set to $newparm_value"
  else
    echo "$1 set to $PARM"
  fi
}
echo "==> Basic Values"
textValue port "Enter Port"
pathValue proverbs "Enter Path to Proverbs"
boolValue show_docs "Show Docs"
echo "------------------"
echo "==> Default Values"
colorValue default.backgroundcolor "Default BackgroundColor"
colorValue default.fontcolor "Default Fontcolor"
textValue default.fontsize "Default Fontsize (int)"
textValue default.fontfamily "Default Fontfamily"
boolValue default.hiddenNav "Hide Navigation initially"
boolValue default.proverbbutton "Show Proverbbutton initially"
textValue default.autoupdate "Default Autoupdate (int, 0=off)"
boolValue default.shareButton "Show ShareButton"
boolValue default.unhideNavButton "Show UnhideNavButton"
boolValue default.introjs "Show intro.js"
textValue default.image_width "Default Width of the image generated (int)"
textValue default.image_height "Default Height of the image generated (int)"
textValue default.image_text "Default Text of the image generated"
echo "------------------"
echo "==> Editable Values"
boolValue changeable.language "Allow Edit of language"
boolValue changeable.backgroundcolor "Allow Edit of backgroundcolor"
boolValue changeable.fontcolor "Allow Edit of fontcolor"
boolValue changeable.fontsize "Allow Edit of fontsize"
boolValue changeable.fontfamily "Allow Edit of fontfamily"
boolValue changeable.hideNav "Allow Hding of Navigation"
boolValue changeable.proverbbutton "Allow Toggling of proverbbutton"
boolValue changeable.autoupdate "Allow Edit of autoupdate"
echo "------------------"
echo '=> Configuration Complete'
exit 0
