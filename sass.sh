#!/bin/bash

# Break on error
set -e

ASSETS="src/assets/"
GOV_UK_MODULES="govuk_modules/"
NODE_MODULES="node_modules/"
PUBLIC="public/"
SRC="src/"
VIEWS="src/views/"
ASSETS="src/assets/"
NODE_SASS=$NODE_MODULES/node-sass/bin/node-sass

# Clean
echo Cleaning
rm -rf $GOV_UK_MODULES
mkdir $GOV_UK_MODULES

# Copy gov.uk files
echo Copying gov.uk modules
cp -r $NODE_MODULES/govuk_frontend_toolkit $GOV_UK_MODULES
cp -r $NODE_MODULES/govuk_template_mustache $GOV_UK_MODULES
cp -r $NODE_MODULES/govuk-elements-sass $GOV_UK_MODULES

# Copy gov.uk images, javascripts and files to $PUBLIC
echo Copying assets
cp -r $GOV_UK_MODULES/govuk_template_mustache/assets/images $PUBLIC
cp -r $GOV_UK_MODULES/govuk_template_mustache/assets/javascripts $PUBLIC
cp -r $GOV_UK_MODULES/govuk_template_mustache/assets/stylesheets $PUBLIC

# Copy govuk_template_mustache
echo Copying mustache template
cp $NODE_MODULES/govuk_template_mustache/views/layouts/govuk_template.html $VIEWS/govuk_template_mustache

 # Run node-sass
#echo Building css
$NODE_SASS --source-map true --include-path $GOV_UK_MODULES/govuk_frontend_toolkit/stylesheets/ --include-path $GOV_UK_MODULES/govuk_template_mustache/assets/stylesheets/ --include-path $GOV_UK_MODULES/govuk-elements-sass/public/sass $ASSETS/sass/application.scss $PUBLIC/stylesheets/application.css
