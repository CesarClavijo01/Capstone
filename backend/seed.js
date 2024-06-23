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
            display_picture: 'https://www.wwe.com/f/styles/og_image/public/all/2023/06/TITLE_04212023gd_0006_Fin--39727c5972135200bd8983992c1424e3.png',
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
            picture: 'https://mail.google.com/mail/u/0?ui=2&ik=f4fd21daa1&attid=0.1&permmsgid=msg-a:r-4903430058338878212&th=19041b934d6c3ae7&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ8PDS0D7EQu-FIdh0GTcwiZ2e7CR4aTfYQVhicM_xdKrYzqFuDrwr-4yB4JzxDNNmdEChw6CXmkcd6GYUqBeAfsYbqhlpUGQzrOrtSMeHSemJDOZNB6JGeJyrE&disp=emb&realattid=19041b919a03e11d5bb1',
            rating: 98,
            category: 'singles, male',
            accomplishments: 'Fullstack Champion of the world',            
        },
    ];

    for(const wrestler of wrestlers){
        await client.query(`INSERT INTO wrestlers(name, bio, picture, rating, category, accomplishments, championship_id) VALUES($1, $2, $3, $4, $5, $6, $7)`, [wrestler.name, wrestler.bio, wrestler.picture, wrestler.rating, wrestler.category, wrestler.accomplishment, wrestler.championship_id])
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