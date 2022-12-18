#!/usr/bin/env sh

npm run sequelize db:migrate
npm run sequelize db:seed:all
