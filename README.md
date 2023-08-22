# Weeaboo-Wisdom

Weeaboo Wisdom is a website that helps you access a list of recommended anime. You may also save the anime to watch for later. 

## Installation and Usage
First you would need to install npm
```bash
npm i
```

Then you would install the database table.

```bash
mysql -u root -p 
```

Enter your password and then type:
```bash
SOURCE db/schema.sql
```
After that you would install the animegif library
```bash
npm install anyanime
```

Finally, you would run 
```bash
node server.js
```
Then you can open it up on http://localhost:3001/
As well as https://weeaboo-wisdomm-04ded8f01ad7.herokuapp.com/

## Resources
animegif - https://www.npmjs.com/package/anyanime?activeTab=readme <br>
anime api- https://rapidapi.com/brian.rofiq/api/anime-db <br>
Startup code from UofM Bootcamp week 14 miniproject 


## Pictures
![image](https://github.com/atan39/Weeaboo-Wisdom/assets/126987766/ac6fd15e-06f4-4070-b0ae-e90beada1c5f) <br>
![image](https://github.com/atan39/Weeaboo-Wisdom/assets/126987766/9e8efd93-8d77-4a49-9a30-bba403f12c4c) <br>
![image](https://github.com/atan39/Weeaboo-Wisdom/assets/126987766/99cf709d-2457-4ba1-a717-19bdc96238b4)


## Contribution 
Luis Cerna - Handlebars/Views <br>
Louis Antolin - Controllers and Routes <br>
Dylan Allison - Handlebars/Views <br>
Ashley Tan - CSS, models, and animegif <br>
Thanks for TA's and tutors for help as well
