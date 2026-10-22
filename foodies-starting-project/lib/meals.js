import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";


//? Database Connection: This code establishes a connection to the SQLite database using the better-sqlite3 library. It creates a new instance of the database connection, allowing for executing SQL queries and interacting with the meals.db file.
const db = sql("meals.db");

//? all method use for fetch all data from the database and return it as an array of objects. each object represents a row in the meals table. the keys of the object are the column names and the values are the column values.
export async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay of 2 second
  //? Error Handling: This code simulates an error scenario by throwing an error. In a real-world application, you would handle errors that may occur during database operations, such as connection issues or query failures. This is important for providing feedback to the user and ensuring the application can gracefully handle unexpected situations.
  //throw new Error('Loading Meals Failed');
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}


//? for fetching a single meal by its slug, we can use the getMealBySlug function. This function takes a slug as an argument and returns the corresponding meal from the database. The slug is a unique identifier for each meal, typically derived from the meal's title.
export function getMealBySlug(slug) {
  const stmt = db.prepare('SELECT * FROM meals WHERE slug = ?');
  return stmt.get(slug);
}

// export function getMealById(id) {
//   const stmt = db.prepare('SELECT * FROM meals WHERE id = ?');
//   return stmt.get(id);
// }


//? You need a slugify dependency in Next.js to automatically convert messy user titles (like blog posts or product names) into clean, URL-safe, and SEO-friendly strings (transforming "Hello World! My First Post" into /blog/hello-world-my-first-post) without writing complex regular expressions manually.

export async function saveMeal(meal){
meal.slug = slugify(meal.title, {lower: true});
meal.instructions = xss(meal.instructions);

const extension = meal.image.name.split('.').pop();
const fileName = `${meal.slug}.${extension}`;

const stream = fs.createWriteStream(`public/images/${fileName}`);
const bufferedImage = await meal.image.arrayBuffer();

stream.write(Buffer.from(bufferedImage), (error) => {
    if(error){
        throw new error("Saving Image Failed");
    }
});


meal.image = `/images/${fileName}`;

db.prepare(`
    INSERT INTO meals (title, summary,instructions,creator,creator_email,image,slug) VALUES (
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
    )`)
    .run(meal);

}

