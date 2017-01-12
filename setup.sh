#!/bin/bash
if [[ -z $1 ]]; then
	echo "Usage: ./setup.sh <html_file>"
	exit 1
fi
if [[ ! -r $1 ]]; then
	echo "File does not exist or is unreadable"
	exit 1
fi
INPUT=$1
DIR=$(grep Directory: $INPUT | head -1 | cut -d \> -f3 | cut -d \< -f1)
mkdir $DIR
cp $INPUT $DIR
cd $DIR
echo -e "a.out\n*.swp\n~*\n_betty-s\n_betty-d\n__pycache__\n" >> .gitignore
#Create the files
echo "Creating the files and directory structure"
touch $(grep File: $INPUT | cut -d \> -f3 | cut -d \< -f1)
echo '#!/usr/bin/python3' > py_template
echo "REPLACE" >> py_template
echo '#!/bin/bash' > sh_template
find . -type f -empty -exec cp sh_template '{}' \; -exec chmod u+x '{}' \;
find . -type f -name "*.py" -exec cp py_template '{}' \;
rm *template
wget -N -q $(grep -e "source code</a>" -e "here</a>" $INPUT | sed 's/<a href=\"/\n/g' | grep "http" | cut -d \" -f1 | sed 's/github/raw.githubusercontent/;s|blob/||')
find . -type f -name "*_py" -exec rename -f 's/_py/\.py/' '{}' \;
find . -type f -name "*.py" -exec chmod u+x '{}' \;
#Prototypes
grep Prototype: $INPUT | cut -d \> -f3 | cut -d \< -f1 >> prototypes
I=0
while read c; do
	I=$(($I+1))
	PROTO=$(echo $c | rev | cut -c 2- | rev)
	NAME=$(echo $c | cut -d '(' -f 1 | rev | cut -d ' ' -f1 | rev)
	sed -i "s/REPLACE/$PROTO/g" $(ls -1 | grep "[0-9]-" | sort -h | grep -n "" | grep "$I:" | cut -d : -f2)
	sed -i "s/main - /$NAME - /g" $(ls -1 | grep "[0-9]-" | sort -h | grep -n "" | grep "$I:" | cut -d : -f2)
done<prototypes
rm prototypes
#README.md
echo "Creating the README.md"
echo "#Holberton School - "$DIR > README.md
echo "Description" >> README.md
echo "" >> README.md
echo "## New commands / functions used:" >> README.md
echo "\`\`gcc\`\`" >> README.md
echo "" >> README.md
echo "## Helpful Links" >> README.md
A=$(grep -n "<h2>" $INPUT | grep -A1 "Readme" | cut -d : -f 1 | head -1)
B=$(grep -n "<h2>" $INPUT | grep -A1 "Readme" | cut -d : -f 1 | tail -1)
tail -n +$A $INPUT | head -n $(($B-$A)) | grep "<a href=" | sed 's/<a href=\"/\n/g' | grep "http"| cut -d \" -f1 | sed 's/^/* [link](/;s/$/)/' >> README.md
echo "" >> README.md
echo "## Description of Files" >> README.md
ls -1 | grep "[0-9]-" | sort -h | sed 's/^/<h6>/g;s/$/<\/h6>\n/g' >> README.md
find . -depth -type f -empty -exec rm '{}' \;
rm ../$INPUT
echo "Done."
