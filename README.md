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

## Resources
animegif - https://www.npmjs.com/package/anyanime?activeTab=readme <br>
anime api- https://rapidapi.com/brian.rofiq/api/anime-db <br>


## Contribution 
Luis Cerna - Handlebars/Views <br>
Louis Antolin - Controllers and Routes <br>
Dylan Allison - Handlebars/Views <br>
Ashley Tan - CSS, models, and animegif <br>
Thanks for TA's and tutors for help as well