// create tables for db

const pg = require('pg');
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL || '');
client.connect();

const dbUsers = require('./db/users');


async function createTables(client){

    await client.query(`DROP TABLE IF EXISTS user_brands`);
    await client.query(`DROP TABLE IF EXISTS rosters`);
    await client.query(`DROP TABLE IF EXISTS brands`);
    await client.query(`DROP TABLE IF EXISTS users`);
    await client.query(`DROP TABLE IF EXISTS wrestlers`);
    await client.query(`DROP TABLE IF EXISTS championships`);
  


    await client.query(`CREATE TABLE championships(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) not null,
        picture VARCHAR(255) not null,
        display_picture TEXT not null,
        info TEXT not null
    );`)

    await client.query(`CREATE TABLE wrestlers(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) not null,
        bio TEXT not null,
        picture TEXT not null,
        rating INT not null,
        category TEXT not null,
        accomplishments TEXT,
        championship_id int REFERENCES championships(id)
    );`)

    await client.query(`CREATE TABLE users(
        id SERIAL PRIMARY KEY, 
        first_name VARCHAR(100) not null,
        last_name VARCHAR(100) not null,
        username VARCHAR(100) not null,
        email VARCHAR(100) not null,
        password VARCHAR(100) not null,
        admin BOOLEAN DEFAULT false
    );`)

    await client.query(`CREATE TABLE brands(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) not null,
        show_time VARCHAR(100) not null,
        description TEXT not null,
        logo VARCHAR(600) not null,
        is_default BOOLEAN DEFAULT false,
        user_id int REFERENCES users(id) not null
    );`);

    await client.query(`CREATE TABLE rosters(
        id SERIAL PRIMARY KEY,
        user_id int REFERENCES users(id) not null,
        wrestler_id int REFERENCES wrestlers(id) not null,
        brand_id int REFERENCES brands(id) not null
    );`)

};

async function seedChampionships(client){

    const championships = [
        {
            name: 'World Heavyweight Championship', 
            picture: 'https://insidepulse.com/wp-content/uploads/2023/05/WWE-World-Heavyweight-Championship-WWE-Night-Of-Champions-2023-banner-2-e1684029634877.png', 
            display_picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f93c7dd1-057f-44a2-b7d6-a57152289672/dg1cb9q-2f79774a-8ef9-4b32-be01-b991b9a6bf8f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y5M2M3ZGQxLTA1N2YtNDRhMi1iN2Q2LWE1NzE1MjI4OTY3MlwvZGcxY2I5cS0yZjc5Nzc0YS04ZWY5LTRiMzItYmUwMS1iOTkxYjlhNmJmOGYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.s13bznZzqJJuut-h1I-inHPJUcWqYL0FL18bd07RXvY', 
            info: 'important championship'
        },

        {
            name: 'WWE Championship', 
            picture: 'https://preview.redd.it/fixed-wwe-undisputed-universal-championship-on-community-v0-2rv74q8ctp3b1.jpg?width=1080&crop=smart&auto=webp&s=c0f5c751241f8f80ab116202e649b2999911f5d0', 
            display_picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/647e6a29-8668-4209-b382-b8c89e164584/dgvvwip-e7d08cce-1994-4372-a593-2bf5da661471.png/v1/fill/w_1280,h_617/wwe_undisputed_championship_png_by_jomneasa_dgvvwip-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjE3IiwicGF0aCI6IlwvZlwvNjQ3ZTZhMjktODY2OC00MjA5LWIzODItYjhjODllMTY0NTg0XC9kZ3Z2d2lwLWU3ZDA4Y2NlLTE5OTQtNDM3Mi1hNTkzLTJiZjVkYTY2MTQ3MS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.N8QTUYyegAsaDJVUDln1eaeOzUo_MalETTFW9qnZMp0', 
            info: 'Universal'
        },
        {
            name: 'Womens World Championship',
            picture: 'https://i.ytimg.com/vi/mIp5O6NXKzo/maxresdefault.jpg',
            display_picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e6f66cc8-71d2-40ad-a546-85302e2a3d40/dg9359v-4354d34a-cbe9-4f54-8fb7-59998bd9522f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U2ZjY2Y2M4LTcxZDItNDBhZC1hNTQ2LTg1MzAyZTJhM2Q0MFwvZGc5MzU5di00MzU0ZDM0YS1jYmU5LTRmNTQtOGZiNy01OTk5OGJkOTUyMmYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GHDLMVjjD6WP6KmEwHe6EkGjwfz9Xtrb_tZJfFd1uyE',
            info: 'World Championship'
        },
        {
            name: 'NXT Championship',
            picture: 'https://staticg.sportskeeda.com/editor/2022/12/60072-16710641127811-1920.jpg',
            display_picture: 'https://www.wwe.com/f/styles/og_image/public/all/2022/04/NXT_Championship--7d8ea4d925fe43df5a8f0df6f0ba7e3d.png',
            info: 'NXT'
        },
        {
            name: 'WWE Womens Championship',
            picture: 'https://upload.wikimedia.org/wikipedia/en/c/cc/WWE_Women%27s_Championship_%282023%29.jpeg',
            display_picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/307c21f9-99cb-4088-b4ed-5c65cb4dcf94/dfzfjv3-8a95ce8a-2553-4d7f-b767-4f25069f1566.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMwN2MyMWY5LTk5Y2ItNDA4OC1iNGVkLTVjNjVjYjRkY2Y5NFwvZGZ6Zmp2My04YTk1Y2U4YS0yNTUzLTRkN2YtYjc2Ny00ZjI1MDY5ZjE1NjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xilikuLjPp2-c-RhSXSGRAuJmUPfSt0cRTw6SiNY5VU',
            info: 'Womens Title'
        },
        {
            name: 'NXT Womens Championship',
            picture: 'https://images.footballfanatics.com/nxt/nxt-20-womens-championship-replica-title-belt_pi5110000_ff_5110012-0f0e32e1f5e76aa7f8aa_full.jpg?_hv=2',
            display_picture: 'https://upload.wikimedia.org/wikipedia/en/b/b5/NXT_Women%27s_Championship_2.0.png',
            info: 'NXT Womens'
        },
        {
            name: 'NXT North American Championship',
            picture: 'https://m.media-amazon.com/images/I/71MyNRd9c+L._AC_UY1000_.jpg',
            display_picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d68173b4-aa80-4d4d-88cb-69434e7cc381/dc896zx-7ea5c86b-18a9-41fc-b13a-0b29eb396fbc.png/v1/fill/w_1024,h_506/nxt_north_american_championship_tv__by_aplikes_by_aplikes_dc896zx-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTA2IiwicGF0aCI6IlwvZlwvZDY4MTczYjQtYWE4MC00ZDRkLTg4Y2ItNjk0MzRlN2NjMzgxXC9kYzg5Nnp4LTdlYTVjODZiLTE4YTktNDFmYy1iMTNhLTBiMjllYjM5NmZiYy5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.hZG9wm6BptNE97BvJY3VPh1BiHnwTE3h06jXUqpeBwc',
            info: 'Mens NXT'
        },
        {
            name: 'WWE Womens Tag-Team Champions',
            picture: 'https://www.wwe.com/f/styles/og_image/public/all/2019/01/001_TITLE_10122018gd_0319--390f194f92091c9f81fda4c77820a975.jpg',
            display_picture: 'https://upload.wikimedia.org/wikipedia/en/d/d3/WWE_Women%27s_Tag_Team_Championship.png',
            info: 'Womens tag-team'
        },
        {
            name: 'WWE Tag-Team Championship',
            picture: 'https://upload.wikimedia.org/wikipedia/en/3/31/WWE_Tag_Team_Championship_2024.jpeg',
            display_picture: 'https://www.wwe.com/f/styles/wwe_large/public/all/2024/04/TITLES_03212024gd_0025_crop_Fin_(2)--03ef24470e34bc0f7065611873d7e8df.png',
            info: 'Smack Down Tag Team'
        },
        {
            name: 'World Heavyweight Tag-Team Championship',
            picture: 'https://i.ytimg.com/vi/oSVpoNcvkck/maxresdefault.jpg',
            display_picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c4754840-fe04-4592-adfb-27c3160cbb5b/dhaw9wn-2e9b2b65-27f2-4e8c-941c-94eece3e99d6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M0NzU0ODQwLWZlMDQtNDU5Mi1hZGZiLTI3YzMxNjBjYmI1YlwvZGhhdzl3bi0yZTliMmI2NS0yN2YyLTRlOGMtOTQxYy05NGVlY2UzZTk5ZDYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RzKFzAVbHGoxBj3tURhvju_2890gzEiTTdS16iIZdro',
            info: 'RAW Tag Team'
        },
        {
            name: 'United States Championship',
            picture: 'https://imageio.forbes.com/specials-images/imageserve/5f03d757bd097a000695ad1d/WWE-Unveiled-a-new-United-States-Championship-on-Raw-/960x0.jpg?format=jpg&width=960',
            display_picture: 'https://upload.wikimedia.org/wikipedia/en/9/92/WWE_United_States_Championship_July_2020.png',
            info: 'US Champ'
        },
        {
            name: 'Intercontinental Championship',
            picture: 'https://cdn3.whatculture.com/images/2019/11/ad9596b87960b84d-600x338.jpg',
            display_picture: 'https://upload.wikimedia.org/wikipedia/en/b/b8/WWE_Intercontinental_Championship_2019.png',
            info: 'Intercontinental Champ'
        },
        {
            name: 'Speed Championship',
            picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQayIfv0YYzm4EXo9d5PmMZRFcAL0-Tt4-smQ&s',
            display_picture: 'https://www.wwe.com/f/styles/wwe_large/public/all/2024/05/SpeedTitle--849e7999c3d7fb657994a4b18ddaa6fa.png',
            info: 'Speed only on X'
        },
        {
            name: 'NXT Womens North American Championship',
            picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1kQlashxBslwGz-gtBEwQrf5uRIC2oCzfbg&s',
            display_picture: 'https://upload.wikimedia.org/wikipedia/en/c/c4/NXT_Womens_North_American_Championship.png',
            info: 'Newest Championship'
        },

    ];

    for(const championship of championships){
        await client.query(`INSERT INTO championships(name, picture, display_picture, info) VALUES($1, $2, $3, $4)`, [championship.name, championship.picture, championship.display_picture, championship.info])
    };

    console.log('finished championships')

}

async function seedWrestlers(client){

    const wrestlers = [
        {
            name: 'Jey Uso',
            bio: 'Yeet',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/jey-uso.vresize.350.350.medium.69.png',
            rating: 90,
            category: 'singles, male',
            accomplishments: 'tag champ'
        },
        {
            name: 'Drew McIntyre',
            bio: 'Scotish Nightmare',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/drew-mcintyre.vresize.350.350.medium.99.png',
            rating: 89,
            category: 'singles, male',
            accomplishments: 'WWE champ',

        },
        {
            name: 'Liv Morgan',
            bio: 'Rvenge Tour',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/liv-morgan.vresize.350.350.medium.58.png',
            rating: 85,
            category: 'singles, female',
            accomplishments: 'Womens World champ',
            championship_id: 3
        },
        {
            name: 'Cody Rhodes',
            bio: 'American Nightmare',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/stardust.vresize.350.350.medium.82.png',
            rating: 93,
            category: 'singles, male',
            accomplishments: 'Dustys son',
            championship_id: 2
        },
        {
            name: 'LA Knight',
            bio: 'Mega Star',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/la-knight.vresize.350.350.medium.20.png',
            rating: 88,
            category: 'singles, male',
        },
        {
            name: 'Trick Williams',
            bio: 'Whoop That Trick',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/trick-williams.vresize.350.350.medium.47.png',
            rating: 78,
            category: 'singles, male',
            accomplishments: 'NXT Champion',
            championship_id: 4
        },
        {
            name: 'John Cena',
            bio: 'Hustle, Loyalty and Respect',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/john-cena.vresize.350.350.medium.6.png',
            rating: 89,
            category: 'singles, male',
            accomplishments: '16 time WWE champion',            
        },
        {
            name: 'Roman Reigns',
            bio: 'Tribal Chief, Head of the Table',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/roman-reigns.vresize.350.350.medium.91.png',
            rating: 97,
            category: 'singles, male',
            accomplishments: 'Longest WWE championship reign in the last 35 years',            
        },
        {
            name: 'CM Punk',
            bio: 'The Best in the World',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/cm-punk.vresize.350.350.medium.83.png',
            rating: 90,
            category: 'singles, male',
            accomplishments: '5 times WWE champion',           
        },
        {
            name: 'AJ Styles',
            bio: 'Phenomenal',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/aj-styles.vresize.220.220.medium.42.png',
            rating: 85,
            category: 'singles, male',
            accomplishments: 'Grand slam champion',           
        },
        {
            name: 'Alba Fyre',
            bio: 'From Scottland',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/kay-lee-ray.vresize.220.220.medium.62.png',
            rating: 74,
            category: 'singles, female',
            accomplishments: 'NXT UK womens champion, Women tag-team champion',  
            championship_id: 8,          
        },
        {
            name: 'Alexa Bliss',
            bio: '5 Feet of Fury',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/alexa-bliss.vresize.220.220.medium.93.png',
            rating: 83,
            category: 'singles, female',
            accomplishments: '5 times WWE womens champion',           
        },
        {
            name: 'Andrade',
            bio: 'Cien Almas',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/andrade.vresize.220.220.medium.44.png',
            rating: 84,
            category: 'singles, males',
            accomplishments: 'US champion & NXT champion',
            championship_id: 13,           
        },
        {
            name: 'Angel Dawkins',
            bio: 'Street Profit',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/angelo-dawkins.vresize.220.220.medium.5.png',
            rating: 74,
            category: 'tag-team, males',
            accomplishments: '2 times WWE tag-team champion, NXT tag-team champion',            
        },
        {
            name: 'Asuka',
            bio: 'The empress of tomorrow',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/asuka.vresize.220.220.medium.9.png',
            rating: 90,
            category: 'tag-team, female',
            accomplishments: 'WWE womens champion, Raw womens champion, SmackDown womens champion, 2020 womens money in the bank winner, First-ever womens Royal Rumble winner, WWE womens tag-team champion, NXT womens champion',            
        },
        {
            name: 'Andre Chase',
            bio: 'Chase U',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/andre-chase.vresize.220.220.medium.32.png',
            rating: 73,
            category: 'singles, male',
            accomplishments: 'NXT superstar',            
        },
        {
            name: 'Axiom',
            bio: 'High flying',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/axiom.vresize.220.220.medium.68.png',
            rating: 73,
            category: 'tag-team, male',
            accomplishments: 'NXT tag-team Champion',            
        },
        {
            name: 'Bayley',
            bio: 'Role Model',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/bayley.vresize.220.220.medium.67.png',
            rating: 85,
            category: 'singles, female',
            accomplishments: 'WWE womens champion, SmackDown Womens champion, RAW womens champion, WWE womens tag-team champion, NXT womens champion, 2024 Royal Rumble winner, 2019 Money in the bank winner, 2015 NXT female competitor of the year ', 
            championship_id: 5,           
        },
        {
            name: 'Becky Lynch',
            bio: 'The Man',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/becky-lynch.vresize.220.220.medium.98.png',
            rating: 94,
            category: 'singles, female',
            accomplishments: 'Raw womens champion, SmackDown womens champion NXT womens championWWE tag-team champion, 2019 womens Royal Rumble winner',          
        },
        {
            name: 'Bianca Belair',
            bio: 'EST of WWE',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/bianca-belair.vresize.220.220.medium.92.png',
            rating: 95,
            category: 'singles, female',
            accomplishments: 'WWE womens champion, Raw womens champion, SmackDown womens champion, 2021 Royal Rumble winner, WWE womens tag-team champion',            
        },
        {
            name: 'Big E',
            bio: 'New Day',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/big-e.vresize.220.220.medium.50.png',
            rating: 78,
            category: 'tag-team, male',
            accomplishments: 'Mr. Money in the Bank, Intercontinental champion, Raw tag-team champion, SmackDown tag-team champion, WWE champion, NXT champion',            
        },
        {
            name: 'Blair Dvenport',
            bio: 'English-New Zelander',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/blair-davenport.vresize.220.220.medium.45.png',
            rating: 74,
            category: 'singles, female',
            accomplishments: 'Drafted to SmackDown in 2024',           
        },
        {
            name: 'Bobby Lashley',
            bio: 'The All Mighty',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/bobby-lashley.vresize.220.220.medium.63.png',
            rating: 89,
            category: 'sinles, male',
            accomplishments: 'WWE champion, Intercontinental champion, US champion, ECW champion, 2023 Andre the Giant Battle Royal winner',            
        },
        {
            name: 'Braun Strowman',
            bio: 'The Monster Among Men',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/braun-strowman.vresize.220.220.medium.6.png',
            rating: 82,
            category: 'singles, male',
            accomplishments: 'Universal champion, Intercontinental champion, RAW tag-team champion, Greatest Royal Rumble winner, Mr. Money in the Bank, 2019 Andre the Giant Memorial Battle Royal winner',            
        },
        {
            name: 'Brock Lesnar',
            bio: 'The Beast Incarnate',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/brock-lesnar.vresize.220.220.medium.3.png',
            rating: 95,
            category: 'singles, male',
            accomplishments: 'Universal champion, WWE champion, Mr. Money in the Bank, 2002 King of the Ring, 2003 & 2022 Royal Rumble winner',          
        },
        {
            name: 'Bray Wyatt',
            bio: 'Eater of Worlds, Fiend',
            picture: 'https://www.pngall.com/wp-content/uploads/15/Bray-Wyatt-PNG-Photo.png',
            rating: 8,
            category: 'singles, make',
            accomplishments: 'WWE champion, RAW tag-team champion, SmackDown tag-team champion, Universal champion',            
        },
        {
            name: 'Bron Breaker',
            bio: 'Wolf-Dog',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/bron-breakker.vresize.220.220.medium.40.png',
            rating: 80,
            category: 'singles, male',
            accomplishments: 'NXT champion, 2024 Dusty Rhodes tag-team Classic winner, NXT tag-team champion',           
        },
        {
            name: 'Candace Larae',
            bio: 'The Poison Pixie',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/candice-lerae.vresize.220.220.medium.47.png',
            rating: 67,
            category: 'tag-team, female',
            accomplishments: 'NXT womens tag-team champion',            
        },
        {
            name: 'Chad Gable',
            bio: 'Alpha Academy',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/shorty-g.vresize.220.220.medium.22.png',
            rating: 80,
            category: 'singles, male',
            accomplishments: 'RAW tag-team champion, SmackDown tag-team champion, NXT tag-team champion',          
        },
        {
            name: 'Carmello Hayes',
            bio: 'Mello dont miss',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/carmelo-hayes.vresize.220.220.medium.33.png',
            rating: 81,
            category: 'singles, male',
            accomplishments: 'NXT champio, NXT North Amercian champion, NXT Cruiserweight champion, 2021 NXT breakout tournament winner',           
        },
        {
            name: 'Channing Lorenzo',
            bio: 'Stacks',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/channing-stacks-lorenzo.vresize.220.220.medium.65.png',
            rating: 69,
            category: 'tag-team, male',
            accomplishments: 'NXT tag-team champion',            
        },
        {
            name: 'Charlotte Flair',
            bio: 'The Queen',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/charlotte-flair.vresize.220.220.medium.1.png',
            rating: 92,
            category: 'singles, female',
            accomplishments: '14 time WWE womens champion, NXT womens champion, 2020 Womens Royal Rumble Winner',          
        },
        {
            name: 'Damian Priest',
            bio: 'The Archer of Infamy',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/damian-priest.vresize.220.220.medium.11.png',
            rating: 86,
            category: 'Singles, male',
            accomplishments: 'World Hevyweight champion, Señor Money in the Bank, Undisputed WWE tag-team champion, US champion, NXT North American champion ', 
            championship_id: 1,           
        },
        {
            name: 'Isla Dawn',
            bio: 'The White Witch',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/isla-dawn.vresize.220.220.medium.9.png',
            rating: 74,
            category: 'tag-team, female',
            accomplishments: 'NXT womens champion, WWE womens champion', 
            championship_id: 8,           
        },
        {
            name: 'Logan Paul',
            bio: 'Internet Sensation',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/logan-paul.vresize.220.220.medium.66.png',
            rating: 90,
            category: 'singles, male',
            accomplishments: 'US champion', 
            championship_id: 11,           
        },
        {
            name: 'Oba Femi',
            bio: 'Nigerian',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/oba-femi.vresize.220.220.medium.74.png',
            rating: 85,
            category: 'singles, male',
            accomplishments: 'NXT North American champion, 2024 NXT Mens Breakout winner', 
            championship_id: 7,          
        },
        {
            name: 'Zami Zayn',
            bio: 'The Master Strategist',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/sami-zayn.vresize.220.220.medium.7.png',
            rating: 87,
            category: 'singles, male',
            accomplishments: 'NXT champion, Intercontinental champion, Undisputed WWE tag-team champion', 
            championship_id: 12,          
        },
        {
            name: 'The Miz',
            bio: 'The A-Lister, Awesome',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/the-miz.vresize.220.220.medium.4.png',
            rating: 81,
            category: 'tag-team, male',
            accomplishments: 'WWE champion, Intercontinental champion, US champion, RAW tag-team champion, SmackDown tag-team champion, WWE tag-team champion, World tag-team champion, Unified tag-team champion, Mr. Money in the Bank, 2 time Grand Slam Champion (first ever), Mixed Match Challenge Season 1 winner', 
            championship_id: 10        
        },
        {
            name: 'Austin Theory',
            bio: 'A-Town',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/austin-theory.vresize.220.220.medium.16.png',
            rating: 72,
            category: 'tag-team, male',
            accomplishments: 'US champion, Mr. Money in the Bank, SmackDown tag-team champion, WWE tag-team champion', 
            championship_id: 9,           
        },
        {
            name: 'R-Thruth',
            bio: 'Little Jimmy',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/r-truth.vresize.220.220.medium.39.png',
            rating: 67,
            category: 'tag-team, male',
            accomplishments: 'RAW tag-team champion, US champion, WWE tag-team champion, 2015 LOL! Moment of the Year Slammy winner, 54 time 24/7 champion (most of all time)', 
            championship_id: 10,           
        },
        {
            name: 'Randy Orton',
            bio: 'The Viper, Legend Killer',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/randy-orton.vresize.220.220.medium.95.png',
            rating: 90,
            category: 'singles, male',
            accomplishments: '14 times WWE Worldhevyweight champion, Intercontinental champion, US champion, RAW tag-team champion, Wolrd tag-team champion, SmackDown tag-team champion, 2009 & 2017 Royal Rumble winner, Mr. Money in the Bank',            
        },
        {
            name: 'Grayson Waller',
            bio: 'Aussie Sensation',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/grayson-waller.vresize.220.220.medium.48.png',
            rating: 74,
            category: 'tag-team, male',
            accomplishments: 'SmackDown tag-team champion, WWE tag-team champion',
            championship_id: 9,           
        },
        {
            name: 'Paul Sherer',
            bio: 'Wolfy Master',
            picture: 'https://app.gemoo.com/share/image-annotation/663605242293768192?codeId=Mpm60A4yQem2V&origin=imageurlgenerator&card=663605241589112832',
            rating: 98,
            category: 'singles, male',
            accomplishments: 'Fullstack Champion of the world',            
        },
        {
            name: 'Kayden Carter',
            bio: 'Highlight Reel',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/kayden-carter.vresize.220.220.medium.94.png',
            rating: 74,
            category: 'singles, female',
            accomplishments: 'WWE womens tag-team champion, NXT womens tag-team champion',            
        },
        {
            name: 'Dominik Mysterio',
            bio: 'Dirty',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/dominik-mysterio.vresize.220.220.medium.10.png',
            rating: 83,
            category: 'singles, male',
            accomplishments: 'SmackDown tag-team champion, NXT North American champion',            
        },
        {
            name: 'Adriana Rizzo',
            bio: 'The Family',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/adriana-rizzo.vresize.220.220.medium.52.png',
            rating: 68,
            category: 'singles, female',
            accomplishments: '',            
        },
        {
            name: 'Akam',
            bio: 'Author of Pain',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/akam.vresize.220.220.medium.47.png',
            rating: 86,
            category: 'tag-team, male',
            accomplishments: 'NXT tag-team champion, RAW tag-team champion, 2016 Dusty Rhodes Tag-Team Classic winner',            
        },
        {
            name: 'Akira Tozawa',
            bio: 'The Powa of Tozawa',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/akira-tozawa.vresize.220.220.medium.99.png',
            rating: 68,
            category: 'singles, male',
            accomplishments: '24/7 champion, WWE Cruiserweight champion',            
        },
        {
            name: 'Angel Garza',
            bio: 'Mexican Sensation',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/angel-garza.vresize.220.220.medium.36.png',
            rating: 67,
            category: 'singles, male',
            accomplishments: '24/7 champion, NXT Cruiserweight champion',            
        },
        {
            name: 'Apollo Crews',
            bio: 'Nigerian, Prince',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/apollo-crews.vresize.220.220.medium.97.png',
            rating: 71,
            category: 'singles,male',
            accomplishments: 'Intercontinental champion, US champion',            
        },
        {
            name: 'Arianna Grace',
            bio: 'Miss NXT',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/arianna-grace.vresize.220.220.medium.79.png',
            rating: 61,
            category: 'singles, female',
            accomplishments: '',            
        },
        {
            name: 'Ashante Adonis',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/ashante-adonis.vresize.220.220.medium.27.png',
            rating: 62,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'B-Fab',
            bio: 'Fabulous',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/b-fab.vresize.220.220.medium.35.png',
            rating: 66,
            category: 'singles, female',
            accomplishments: 'Drafted to SmackDown',            
        },
        {
            name: 'Baron Corbin',
            bio: 'The Lone Wolf',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/king-corbin.vresize.220.220.medium.14.png',
            rating: 76,
            category: 'singels, male',
            accomplishments: '2019 King Of The Ring, US champion, Mr. Money in the Bank, 2016 Andre the Giant Memoryal Battler Royal winner, 2024 Dusty Rhodes Tag Team Classic winner',            
        },
        {
            name: 'Berto',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/humberto-carrillo.vresize.220.220.medium.25.png',
            rating: 61,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Beth Phoenix',
            bio: 'The Glamazon',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/beth-phoenix.vresize.220.220.medium.36.png',
            rating: 87,
            category: 'singles, female',
            accomplishments: 'Womens champion, Divas champion, 2017 WWE Hall of Fame Inductee',            
        },
        {
            name: 'Booker T',
            bio: 'King Booker',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/booker-t.vresize.220.220.medium.97.png',
            rating: 85,
            category: 'singles, male',
            accomplishments: 'World Heavyweight Champion, WCW Champion, Worl tag-team champion, WCW World tag-team champion, WCW tag-team champion, Intercontinental champion, US champion, WCW World TV champion, Hardcore champion, 2006 King of the Ring, 2013 WWE Hall of Fame Inductee',            
        },
        {
            name: 'Brinley Reece',
            bio: 'Brin Active',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/brinley-reece.vresize.220.220.medium.68.png',
            rating: 61,
            category: 'singles, female',
            accomplishments: '',            
        },
        {
            name: 'Bronco Nima',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/bronco-nima.vresize.220.220.medium.77.png',
            rating: 61,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Bronson Reed',
            bio: 'Tsunami',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/bronson-reed.vresize.220.220.medium.13.png',
            rating: 84,
            category: 'singles,male',
            accomplishments: 'NXT North American champion, 2024 Andre the Giant Memortial Battle Royal winner',            
        },
        {
            name: 'Brooks Jensen',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/brooks-jensen.vresize.220.220.medium.42.png',
            rating: 67,
            category: 'tag-team, male',
            accomplishments: 'NXT UK Tag Team Champion',            
        },
        {
            name: 'Brutus Creed',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/brutus-creed.vresize.220.220.medium.44.png',
            rating: 78,
            category: 'tag-team, male',
            accomplishments: 'Dusty Rhodes Tag Team Classic Winner, NXT Tag Team Champion',            
        },
        {
            name: 'Carlito',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/carlito.vresize.220.220.medium.78.png',
            rating: 68,
            category: 'singles, male',
            accomplishments: 'Intercontinental champion, US champion, WWE tag-team champion, Unified tag-team champion',            
        },
        {
            name: 'Carmella',
            bio: 'The Princess of Staten Island',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/carmella.vresize.220.220.medium.94.png',
            rating: 74,
            category: 'singles, female',
            accomplishments: 'SmackDown womens champion,  2017 Mrs. Money in the Bank, Mixed Match Challenge Season 2 winner, 2019 WrestleMania Women’s Battle Royal winner, 24/7 champion',            
        },
        {
            name: 'Cedric Alexander',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/cedric-alexander.vresize.220.220.medium.97.png',
            rating: 69,
            category: 'singles, male',
            accomplishments: 'RAW tag-team champion, WWE Cruiserweight champion, 24/7 champion',            
        },
        {
            name: 'Charlie Dempsey',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/charlie-dempsey.vresize.220.220.medium.58.png',
            rating: 61,
            category: 'singles, male',
            accomplishments: 'NXT Heritage Cup champion',            
        },
        {
            name: 'Chelsea Green',
            bio: 'Iconic',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/chelsea-green.vresize.220.220.medium.95.png',
            rating: 75,
            category: 'singles, female',
            accomplishments: 'WWE womens tag-team champion',            
        },
        {
            name: 'Cora Jade',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/cora-jade.vresize.220.220.medium.41.png',
            rating: 74,
            category: 'singles, female',
            accomplishments: 'NXT womens tag-team champion',            
        },
        {
            name: 'Cruz Del Toro',
            bio: '',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/raul-mendoza.vresize.220.220.medium.31.png',
            rating: 69,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Dakota Kai',
            bio: 'Kiwi Superstar',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/dakota-kai.vresize.220.220.medium.30.png',
            rating: 78,
            category: 'singles, female',
            accomplishments: '2021 Dusty Rhodes Tag Team Classic winner, WWE Womens Tag Team Champion, NXT Womens Tag Team Champion',            
        },
        {
            name: 'Damon Kemp',
            bio: 'Freestyle',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/damon-kemp.vresize.220.220.medium.63.png',
            rating: 68,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Dani Palmer',
            bio: 'Energetic and Athletic',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/dani-palmer.vresize.220.220.medium.74.png',
            rating: 61,
            category: 'singles, female',
            accomplishments: '',            
        },
        {
            name: 'Dante Chen',
            bio: 'First WWE Singapore-born superstar',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/dante-chen.vresize.220.220.medium.38.png',
            rating: 61,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Dexter Lumis',
            bio: 'Disconcerting. Unsettling. Mysterious.',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/dexter-lumis.vresize.220.220.medium.75.png',
            rating: 66,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Dijak',
            bio: 'Feast Your Eyes',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/dominik-dijakovic.vresize.220.220.medium.49.png',
            rating: 77,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Dragon Lee',
            bio: 'LWO',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/dragon-lee.vresize.220.220.medium.74.png',
            rating: 68,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Duke Hudson',
            bio: 'Chase U',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/duke-hudson.vresize.220.220.medium.49.png',
            rating: 71,
            category: 'tag-team, male',
            accomplishments: '',            
        },
        {
            name: 'Eddie Thorpe',
            bio: 'Alpha Wolf',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/eddy-thorpe.vresize.220.220.medium.72.png',
            rating: 61,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Edris Enofe',
            bio: 'Prove them Wrong',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/edris-enofe.vresize.220.220.medium.56.png',
            rating: 61,
            category: 'singles, male',
            accomplishments: '',            
        },
        {
            name: 'Elektra Lopez',
            bio: 'Elektra',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/elektra-lopez.vresize.220.220.medium.36.png',
            rating: 61,
            category: 'singles, female',
            accomplishments: '',            
        },
        {
            name: 'Elton Prince',
            bio: 'Pretty Deadly',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/lewis-howley.vresize.220.220.medium.18.png',
            rating: 76,
            category: 'tag-team, male',
            accomplishments: 'NXT tag-team champion, NXT UK tag-team champion',            
        },
        {
            name: 'Erik',
            bio: 'Viking Raider',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/erik.vresize.220.220.medium.34.png',
            rating: 78,
            category: 'tag-team, male',
            accomplishments: 'RAW tag-team champion, NXT tag-team champion, 24/7 champion',            
        },
        {
            name: 'Finn Balor',
            bio: 'Demon',
            picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1f2e3247-62d6-4d91-8b66-596cdde4d62b/dfa7qqi-20eafc67-14f2-4f84-81d6-93cd5259da1d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzFmMmUzMjQ3LTYyZDYtNGQ5MS04YjY2LTU5NmNkZGU0ZDYyYlwvZGZhN3FxaS0yMGVhZmM2Ny0xNGYyLTRmODQtODFkNi05M2NkNTI1OWRhMWQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.NUlhOeX2zQXrp8AL9PTHr2ri_3BLxFdtJGozm8BFQXY',
            rating: 87,
            category: 'singles, male',
            accomplishments: 'Universal champion (first ever), Intercontinental champion, Undisputed tag-team champion, US champion, NXT champion, 2015 Dusty Rhodes Tag Team Classic winner, 2015 NXT Overall Competitor of the Year',            
        },
        {
            name: 'Gunther',
            bio: 'Ring General',
            picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e4ecd59f-a1bb-4080-9f4d-208c14ee7c29/dfeo492-6e38baaf-0498-4818-9272-befa64fc50ce.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U0ZWNkNTlmLWExYmItNDA4MC05ZjRkLTIwOGMxNGVlN2MyOVwvZGZlbzQ5Mi02ZTM4YmFhZi0wNDk4LTQ4MTgtOTI3Mi1iZWZhNjRmYzUwY2UucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.OBQm9HTObovol1-cRGIXyPWlGLpUuIwGG85Fjm_t5w4',
            rating: 90,
            category: 'singles, male',
            accomplishments: 'Longest reigning Intercontinental champion, King of the Ring, WWE United Kingdom champion',            
        },
        {
            name: 'Gigi Dolin',
            bio: 'Toxic Attraction',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/gigi-dolin.vresize.220.220.medium.37.png',
            rating: 74,
            category: 'tag-team, female',
            accomplishments: 'NXT womens tag-team champion',            
        },
        {
            name: 'Iyo Sky',
            bio: 'The Genius of the Sky',
            picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/426a90e4-24b6-4ac1-a379-6d730e0022bd/dh6cksd-d113ed18-324f-4311-99bc-ac7edd6cea4e.png/v1/fill/w_705,h_1134/iyo_sky_wwe_render_png_by_wwewomendaily_dh6cksd-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjA0OCIsInBhdGgiOiJcL2ZcLzQyNmE5MGU0LTI0YjYtNGFjMS1hMzc5LTZkNzMwZTAwMjJiZFwvZGg2Y2tzZC1kMTEzZWQxOC0zMjRmLTQzMTEtOTliYy1hYzdlZGQ2Y2VhNGUucG5nIiwid2lkdGgiOiI8PTEyNzMifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zmz9BBIys7upgjuslBzpjCOTaqXpC6FyVml0tWcFdKs',
            rating: 88,
            category: 'singles, female',
            accomplishments: 'Ms. Money in the Bank, WWE womens champion, WWE womens tag-team champion, NXT womens champion, NXT womens tag-team champion',            
        },
        {
            name: 'Ilja Dragunov',
            bio: 'Unbesiegbar',
            picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/420f37eb-c6be-499d-a050-3b9294d8aa3a/de7hi1a-22917a1e-7780-4116-9e3b-d3d297c720e4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQyMGYzN2ViLWM2YmUtNDk5ZC1hMDUwLTNiOTI5NGQ4YWEzYVwvZGU3aGkxYS0yMjkxN2ExZS03NzgwLTQxMTYtOWUzYi1kM2QyOTdjNzIwZTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.mpmCVPyGr3GT4zTy5EMoImgME1BeFSUPDE2jh5A8LGI',
            rating: 81,
            category: 'singles, male',
            accomplishments: 'NXT champion, NXT UK champion',            
        },
        {
            name: 'Ivar',
            bio: 'Viking Raider',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/ivar.vresize.220.220.medium.34.png',
            rating: 79,
            category: 'tag-team, male',
            accomplishments: 'RAW tag-team champion, NXT tag-team champion',            
        },
        {
            name: 'Jade Cargill',
            bio: 'Inevitable Storm',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/jade-cargill.vresize.220.220.medium.81.png',
            rating: 86,
            category: 'tag-team, female',
            accomplishments: 'WWE womens tag-team champion',            
        },
        {
            name: 'Jimmy Uso',
            bio: 'No Yeet, Bloodline Member',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/jimmy-uso.vresize.220.220.medium.68.png',
            rating: 84,
            category: 'tag-team, male',
            accomplishments: 'RAW tag-team champion, SmackDown tag-team champion, WWE tag-team champion',            
        },
        {
            name: 'Johnny Gargano',
            bio: 'DIY',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/johnny-gargano.vresize.220.220.medium.3.png',
            rating: 74,
            category: 'tag-team, male',
            accomplishments: 'NXT champion, NXT North American champion, NXT tag-team champion',            
        },
        {
            name: 'Kevin Owens',
            bio: 'KO, Fight Owens Fight',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/kevin-owens.vresize.220.220.medium.63.png',
            rating: 86,
            category: 'singles, male',
            accomplishments: 'NXT champion, Universal Champion, Undisputed WWE tag-team champion, US champion, Intercontinental champion',            
        },
        {
            name: 'Kofi Kingston',
            bio: 'New Day',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/kofi-kingston.vresize.220.220.medium.49.png',
            rating: 80,
            category: 'tag-team ,male',
            accomplishments: 'WWE champion, Intercontinental champio, Worl tag-team champion, US champion, WWE tag-team champion, RAW tag-team champion, SmackDown champion, NXT tag-team champion',            
        },
        {
            name: 'Motez Form',
            bio: 'Street Profit',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/montez-ford.vresize.220.220.medium.5.png',
            rating: 76,
            category: 'tag-team, male',
            accomplishments: 'SmackDown tag-team champion, RAW tag-team champion, NXT tag-team champion',            
        },
        {
            name: 'Naomi',
            bio: 'Feel the Glow',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/naomi.vresize.220.220.medium.53.png',
            rating: 89,
            category: 'singles, female',
            accomplishments: 'SmackDown womens champion, WWE womens tag-team champion, First-ever WrestleMania Womens Battle Royal winner',            
        },
        {
            name: 'Nikki Cross',
            bio: 'Wyatt sick6',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/nikki-cross.vresize.220.220.medium.92.png',
            rating: 62,
            category: 'singles, female',
            accomplishments: 'RAW womens champion, WWE womens tag-team champion, last 24/7 champion, 2021 Money in the Bank Ladder Match winner',            
        },
        {
            name: 'Otis',
            bio: 'Alpha Academy',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/otis.vresize.220.220.medium.42.png',
            rating: 74,
            category: 'singles, male',
            accomplishments: '2020 Mens Money in the Bank Ladder Match winner, RAW tag-team champion',            
        },
        {
            name: 'Rey Mysterio',
            bio: 'The Master of the 619, LWO',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/rey-mysterio.vresize.220.220.medium.92.png',
            rating: 88,
            category: 'singles, male',
            accomplishments: 'WWE champion, Wolrd Hevyweight champion, 2006 Royal Rumble winner, Cruiserweight champion, US champion, WWE tag-team champion, WCW tag-team champion, SmackDown tag-team champion, WCW Cruiserweight champion, Intercontinental champion, 2023 WWE Hall of Fame Inductee',            
        },
        {
            name: 'Rhea Ripley',
            bio: 'Mommy',
            picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c782e4c-fae0-4a87-b7b1-a752598d9df9/deb2z6o-be0e5e4c-9f66-4817-9e05-fae8f8c377c7.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjNzgyZTRjLWZhZTAtNGE4Ny1iN2IxLWE3NTI1OThkOWRmOVwvZGViMno2by1iZTBlNWU0Yy05ZjY2LTQ4MTctOWUwNS1mYWU4ZjhjMzc3YzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5-E9aMS7Y-3V3o-im3WWOIkdG4_h2IJI1vr5WSAzBoE',
            rating: 96,
            category: 'singles, female',
            accomplishments: 'Womens World champion, SmackDown womens champion, RAW womens champion, Royal Rumble winner, WWE womens tag-team champion, First-ever NXT UK womens champion, NXT womens champion',            
        },
        {
            name: 'Scarlett',
            bio: 'The Angel of Doom',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/scarlett.vresize.220.220.medium.6.png',
            rating: 69,
            category: 'singles, female',
            accomplishments: '',            
        },
        {
            name: 'Seath Rolling',
            bio: 'The Beast Slayer',
            picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c782e4c-fae0-4a87-b7b1-a752598d9df9/dabyjtk-7b18a35d-0286-4ca1-89d2-bb6fad4fc5a9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjNzgyZTRjLWZhZTAtNGE4Ny1iN2IxLWE3NTI1OThkOWRmOVwvZGFieWp0ay03YjE4YTM1ZC0wMjg2LTRjYTEtODlkMi1iYjZmYWQ0ZmM1YTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.JZqqeK1PDs_oXuxx5lXhCj8UFGYMfsUanRut3ZjTHGs',
            rating: 93,
            category: 'singles, male',
            accomplishments: 'First-ever World Heavyweight champion, Universal champion, WWE champion, US champion, Intercontinental champion, WWE tag-team champion, RAW tag-team champion, NXT champion,  2019 Royal Rumble Match winner, 2014 Mens Money in the Bank Ladder Match winner, 2015 Superstar of the Year Slammy Award winner',            
        },
        {
            name: 'Sheamus',
            bio: 'Celtic Warrior',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/sheamus.vresize.220.220.medium.65.png',
            rating: 86,
            category: 'singles, male',
            accomplishments: 'WWE champion, World Hevyweight champion, US champion, RAW tag-team champion, SmackDown tag-team champion, 2010 King of the Ring, 2012 Royal Rumble Match winner, 2015 Money in the Bank Contract winner',            
        },
        {
            name: 'Tommaso Ciampa',
            bio: 'DIY',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/tommaso-ciampa.vresize.220.220.medium.3.png',
            rating: 76,
            category: 'tag-team, male',
            accomplishments: 'NXT champion, NXT tag-team champion',            
        },
        {
            name: 'Tony D-Angelo',
            bio: 'The Don of NXT',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/tony-dangelo.vresize.220.220.medium.45.png',
            rating: 75,
            category: 'singles, male',
            accomplishments: 'NXT Heritage Cup Champion, NXT Tag Team Champion',            
        },
        {
            name: 'Triple H',
            bio: 'The Game, Cerebral Assasin',
            picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6da3cacc-4e5e-40b7-acc3-a313a9fb22b6/dd3crnf-4df91a87-4baa-48f0-a3db-ed010dcf6e97.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZkYTNjYWNjLTRlNWUtNDBiNy1hY2MzLWEzMTNhOWZiMjJiNlwvZGQzY3JuZi00ZGY5MWE4Ny00YmFhLTQ4ZjAtYTNkYi1lZDAxMGRjZjZlOTcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8QC3ZrLyDc9FBsNBOTHxTxcjhmQLInH56il7NHxtoZk',
            rating: 91,
            category: 'singles, male, legend',
            accomplishments: 'WWE champion, World Hevyweight champion, Intercontinental champion, Unified WWE tag-team champion, Wrold tag-team champion, European champion, 2002 and 2016 Roya Rumble winner, 1997 King of the Ring, 2019 WWE Hall of Fame Inductee',            
        },
        {
            name: 'Xavier Woods',
            bio: 'New Day',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/xavier-woods.vresize.220.220.medium.66.png',
            rating: 78,
            category: 'tag-team, male',
            accomplishments: '2021 King of the Ring Tournament winner, RAW tag-team champion, SmacDown tag-team champion, WWE tag-team champion, NXT tag-team champion',            
        },
        {
            name: 'The Undertaker',
            bio: 'The Deadmen',
            picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0c782e4c-fae0-4a87-b7b1-a752598d9df9/db27lsj-7745d6e9-3fe2-4e54-bc57-2618b0a17819.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzBjNzgyZTRjLWZhZTAtNGE4Ny1iN2IxLWE3NTI1OThkOWRmOVwvZGIyN2xzai03NzQ1ZDZlOS0zZmUyLTRlNTQtYmM1Ny0yNjE4YjBhMTc4MTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hMq_PPDFqXUIIF_b_QRuyxeovb9f_uTjMIWrDuj0wEw',
            rating: 96,
            category: 'singles, male, legend',
            accomplishments: '2007 Royal Rumble winner, WWE champion, World Hevyweight champion, Hardcore champion, Worl tag-team champion',            
        },
    ];

    for(const wrestler of wrestlers){
        await client.query(`INSERT INTO wrestlers(name, bio, picture, rating, category, accomplishments, championship_id) VALUES($1, $2, $3, $4, $5, $6, $7)`, [wrestler.name, wrestler.bio, wrestler.picture, wrestler.rating, wrestler.category, wrestler.accomplishments, wrestler.championship_id])
    }

    console.log('finished wrestlers')

};

async function seedUsers(client){

    const users = [
        {
            first_name: 'Wade',
            last_name: 'Willson',
            username: 'WadeWWE',
            email: 'wadewillson@gmail.com',
            password: 'wrestlingisnotfake'
        },
        {
            first_name: 'John',
            last_name: 'James',
            username: 'johnjames3000',
            email: 'johnjames@gmail.com',
            password: 'myPassword',
            admin: true
        }
    ];

    for(const user of users){
        await dbUsers.createUser(user)
    }

    console.log('finished users')

}

async function seedBrands(client){
    const brands = [

        {name: 'RAW', 
        show_time: "Monday", 
        description: "A good show", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/WWE_Raw_Logo_2019.svg/1280px-WWE_Raw_Logo_2019.svg.png", 
        is_default: true,
        user_id: 1
        },

        {name: 'Smack Down', 
        show_time:'Friday', 
        description: 'Second Show', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/WWE_SmackDown_%282019%29_Logo.svg/750px-WWE_SmackDown_%282019%29_Logo.svg.png',
        is_default: true, 
        user_id: 1},

        {name: 'NXT', 
        show_time: 'Tueasday', 
        description: 'Developmental', 
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/97/WWE_NXT_New_Logo_2022_White_%26_Gold.png', 
        is_default: true,
        user_id: 1
        }

    ];

    for(const brand of brands){
        await client.query(`INSERT INTO brands (name, show_time, description, logo, is_default, user_id) VALUES ($1, $2, $3, $4, $5, $6)`, [brand.name, brand.show_time, brand.description, brand.logo, brand.is_default, brand.user_id])
    };

    console.log('finished brands')
};


async function seedRosters(client){

    const rosters = [
        {
            user_id: 1,
            wrestler_id: 1,
            brand_id: 1
        },
        {
            user_id: 1,
            wrestler_id: 2,
            brand_id: 1
        },
        {
            user_id: 1,
            wrestler_id: 3,
            brand_id: 1
        },
        {
            user_id: 1,
            wrestler_id: 4,
            brand_id: 2
        },
        {
            user_id: 1,
            wrestler_id: 5,
            brand_id: 2
        },
        {
            user_id: 1,
            wrestler_id: 6,
            brand_id: 3
        }
    ];

    for(const roster of rosters){
        await client.query(`INSERT INTO rosters(user_id, wrestler_id, brand_id) VALUES($1, $2, $3)`, [roster.user_id, roster.wrestler_id, roster.brand_id])
    }

    console.log('finished rosters')

}

async function seed(){
    //create tables
    await createTables(client)

    //seed data
    
    await seedChampionships(client);
    await seedWrestlers(client);
    await seedUsers(client);
    await seedBrands(client);
    await seedRosters(client);
}

seed().then(() => process.exit(0));