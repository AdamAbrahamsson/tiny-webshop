import pool from './db';

// Insert three products to populate the database

const products = [
    { title: 'Playstation 5', description: 'Description for product 1', image_url: 'https://images.ctfassets.net/31h9ykss8g0q/5li1NSdttFEOdN8m8IcTN9/224d5d849435e677ad6ee52c8cb31756/blog_gaming-playstation_16x9.png?w=709&q=80&fm=avif', price: 6990, quantity: 10 },
  
    { title: 'iphone 17', description: 'Description for product 2', image_url: 'https://swedroid.se/wp-content/uploads/2024/12/iphone-17-pro-render-a-711x441.webp', price: 15000, quantity: 5 },

    { title: 'Apple Headphones', description: 'Description for product 3', image_url: 'https://www.apple.com/v/airpods-max/j/images/overview/bento/midnight/bento_1_airpod_max_midnight__4jy1tkqh9qay_xlarge.jpg', price: 2999.95, quantity: 20 },
];

async function seedProducts() {
    /* Loop through each product in the products array and insert into the database.
       The 'VALUES ($1, $2, $3, $4, $5)' is important to prevent SQL injections, they
       act as a placeholders and they are overwritten by the real values
    */
  for (const p of products) {
    await pool.query(
      `INSERT INTO products (title, description, image_url, price, quantity)
       VALUES ($1, $2, $3, $4, $5)`,
      [p.title, p.description, p.image_url, p.price, p.quantity]
    );
  }
    console.log('Products are added');
    
    // Close the database connection pool to prevent leaving open connections after seeding is done
    pool.end();
}

seedProducts();
