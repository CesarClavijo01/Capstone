// create tables for db

const pg = require('pg');
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL || '');
client.connect();

async function createTables(client){


    await client.query(`DROP TABLE IF EXISTS rosters`);
    await client.query(`DROP TABLE IF EXISTS users`);
    await client.query(`DROP TABLE IF EXISTS wrestlers`);
    await client.query(`DROP TABLE IF EXISTS championships`);
    await client.query(`DROP TABLE IF EXISTS brands`);

    await client.query(`CREATE TABLE brands(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) not null,
        show_time VARCHAR(100) not null,
        description TEXT not null,
        logo VARCHAR(255)
    );`);

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
        picture VARCHAR(255) not null,
        rating INT not null,
        category VARCHAR(100) not null,
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


    await client.query(`CREATE TABLE rosters(
        id SERIAL PRIMARY KEY,
        user_id int REFERENCES users(id) not null,
        wrestler_id int REFERENCES wrestlers(id) not null,
        brand_id int REFERENCES brands(id) not null
    );`)

};

async function seedBrands(client){
    const brands = [
        {name: 'RAW', show_time: "Monday", description: "A good show", logo: "https://cdn.wrestletalk.com/wp-content/uploads/2022/10/Raw-logo-october-18.jpg"},

        {name: 'Smack Down', show_time:'Friday', description: 'Second Show', logo: 'https://featuresofwrestling.com/wp-content/uploads/2021/01/wwe-friday-night-smackdown-logo-scaled-1280x720-1.jpg'},

        {name: 'NXT', show_time: 'Tueasday', description: 'Developmental', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmgcwoVO4zlubwnNnJHTfIwpahfNFgA8ymvQ&s'}
    ];

    for(const brand of brands){
        await client.query(`INSERT INTO brands (name, show_time, description, logo) VALUES ($1, $2, $3, $4)`, [brand.name, brand.show_time, brand.description, brand.logo])
    };
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
        }
    ];

    for(const championship of championships){
        await client.query(`INSERT INTO championships(name, picture, display_picture, info) VALUES($1, $2, $3, $4)`, [championship.name, championship.picture, championship.display_picture, championship.info])
    };

}

async function seedWrestlers(client){

    const wrestlers = [
        {
            name: 'Jey Uso',
            bio: 'Uso',
            picture: 'https://b.fssta.com/uploads/application/wwe/headshots/jey-uso.vresize.350.350.medium.69.png',
            rating: 90,
            category: 'singles, male',
            accomplishments: 'tag champ'
        },
        {
            name: 'Drew McIntyre',
            bio: 'Scotish',
            picture: 'https://www.thesmackdownhotel.com/images/wrestling/wrestlers/full-body/drew-mcintyre.png',
            rating: 89,
            category: 'singles, male',
            accomplishments: 'WWE champ',

        },
        {
            name: 'Liv Morgan',
            bio: 'Beat Becky Lynch',
            picture: 'https://www.thesmackdownhotel.com/images/wwe2k24/roster/liv-morgan.png',
            rating: 85,
            category: 'singles, female',
            accomplishments: 'Womens World champ',
            championship_id: 3
        },
        {
            name: 'Cody Rhodes',
            bio: 'Dustys son',
            picture: 'https://www.thesmackdownhotel.com/images/wrestling/wrestlers/c/cody-rhodes-2022-1.png',
            rating: 93,
            category: 'singles, male',
            accomplishments: 'Dustys son',
            championship_id: 2
        },
        {
            name: 'LA Knight',
            bio: 'yeah',
            picture: 'https://www.thesmackdownhotel.com/images/wwe2k23/roster/la-knight.png',
            rating: 88,
            category: 'singles, male',
        },
        {
            name: 'Trick Williams',
            bio: 'whoop that trick',
            picture: 'https://www.thesmackdownhotel.com/images/wrestling/wrestlers/t/trick-williams-2021.png',
            rating: 78,
            category: 'singles, male',
            accomplishments: 'NXT Champion',
            championship_id: 4
        }

    ];

    for(const wrestler of wrestlers){
        await client.query(`INSERT INTO wrestlers(name, bio, picture, rating, category, accomplishments, championship_id) VALUES($1, $2, $3, $4, $5, $6, $7)`, [wrestler.name, wrestler.bio, wrestler.picture, wrestler.rating, wrestler.category, wrestler.accomplishment, wrestler.championship_id])
    }

};

async function seedUsers(client){

    const users = [
        {
            first_name: 'Wade',
            last_name: 'Willson',
            username: 'WadeWWE',
            email: 'wadewillson@gmail.com',
            password: 'wrestlingisnotfake'
        }
    ];

    for(const user of users){
        await client.query(`INSERT INTO users(first_name, last_name, username, email, password) VALUES($1, $2, $3, $4, $5)`, [user.first_name, user.last_name, user.username, user.email, user.password])
    }

}

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

}

async function seed(){
    //create tables
    await createTables(client)

    //seed data
    await seedBrands(client);
    await seedChampionships(client);
    await seedWrestlers(client);
    await seedUsers(client);
    await seedRosters(client);
}

seed().then(() => process.exit(0));