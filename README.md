# OpenClassRooms Project 7*

GitHub - link
[Github project 7](https://github.com/stefannitu/openclassrooms-P7.git)


API - diagram
[Figma](https://www.figma.com/file/yTFBDUU0AVF8JKRTUo7qmS/Untitled?node-id=0%3A1&t=sJHDXUhjbvbJnhWt-1)


## Install quide:

1. Clone repo
2. In root folder start postgres and redis docker containers
   1. ```docker compose up -d```
3. "api" folder
   1. ``` cd api ```
   2. ``` npm i ```
   3. ``` npm start```
   4. onSuccess:  ```Server running``` 
4. "client" folder
   1. ```cd client```
   2. ```npm i```
   3. ```cd /src/prisma```
   4. ```npx prisma generate```
   5. ```npx prisma migrate dev```
   6. ``` cd ./client```
   7. ```npm run dev```
   8. on Success : "http://localhost:5173"