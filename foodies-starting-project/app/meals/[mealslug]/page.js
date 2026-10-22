import React from "react";
import { getMealBySlug } from "@/lib/meals";
import classes from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";



//? we also can generate the metadata dynamically as we did the [mealslug] for nested routeing.
export async function generateMetaData ({params}){
  const meal = getMealBySlug(params.mealslug);

   if(!mealDetails) {
    notFound();
  }
  
  return {
    title : meal.title,
    description : meal.summary,
  };
}



const MealsDetailPage = ({ params }) => {

  //? Data Fetching: In Next.js, you can fetch data on the server side using getServerSideProps or getStaticProps. In this case, we are using getMealBySlug to fetch the meal details based on the slug passed in the URL params. This allows us to fetch the meal details before rendering the page, which improves performance and SEO.
  //? getMealBySlug is a server side function that fetches the meal details from the database based on the slug passed in the URL params. we are using this function in the page.js file to fetch the meal details and display them on the page.
  const mealDetails = getMealBySlug(params.mealslug);


  //? Error Handling: In Next.js, you can use the notFound function to handle cases where the requested data is not found. In this case, if the meal details are not found, we are calling the notFound function to render a 404 page. This improves user experience and helps with SEO.
  if(!mealDetails) {
    notFound();
  }

  mealDetails.instructions = mealDetails.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={mealDetails.image} alt={mealDetails.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{mealDetails.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${mealDetails.creator_email}`}>{mealDetails.creator}</a>
          </p>
          <p className={classes.summary}>{mealDetails.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: mealDetails.instructions }}
        />
      </main>
    </>
  );
};

export default MealsDetailPage;
