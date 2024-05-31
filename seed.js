// create tables for db

const pg = require('pg');
require('dotenv').config();

const client = new pg.Client(process.env.DATABASE_URL || '');
client.connect();

async function createTables(client){

    console.log("creating tables");

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
        photo VARCHAR(255) not null,
        rating INT not null,
        category VARCHAR(100) not null,
        accomplishments TEXT,
        championship_id int REFERENCES championships(id)
    );`)

    await client.query(`CREATE TABLE users(
        id SERIAL PRIMARY, 
        first_name VARCHAR(50) not null,
        last_name Varchar(50) not null,
        email VARCHAR(100) not null,
        password VARCHAR(100) not null,
        admin BOOLEAN DEFAULT false 
    );`)

    await client.query(`CREATE TABLE user/roster(
        id SERIAL PRIMARY KEY,
        user_id int REFERENCES users(id) not null,
        wrestler_id int REFERENCES wrestlers(id) not null,
        brand_id int REFERENCES brands(id) not null
    );`)

    console.log("tables created");
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
        {name: 'World Heavyweight Championship', picture: 'https://insidepulse.com/wp-content/uploads/2023/05/WWE-World-Heavyweight-Championship-WWE-Night-Of-Champions-2023-banner-2-e1684029634877.png', display_picture: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f93c7dd1-057f-44a2-b7d6-a57152289672/dg1cb9q-2f79774a-8ef9-4b32-be01-b991b9a6bf8f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y5M2M3ZGQxLTA1N2YtNDRhMi1iN2Q2LWE1NzE1MjI4OTY3MlwvZGcxY2I5cS0yZjc5Nzc0YS04ZWY5LTRiMzItYmUwMS1iOTkxYjlhNmJmOGYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.s13bznZzqJJuut-h1I-inHPJUcWqYL0FL18bd07RXvY'}
    ]

}

async function seedWrestlers(client){

}

async function seedUsers(client){

}

async function seedUserRosters(client){

}