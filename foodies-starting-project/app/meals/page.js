import React, { Suspense } from "react";
import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getAllMeals } from "@/lib/meals";

//? Data Fetching: Next.js 13 allows you to fetch data on the server side, which can improve performance and SEO. In this case, we are fetching all meals from the database and passing them to the MealsGrid component.
//? getAllMeals is a server side function that fetches all meals from the database. we are using this function in the page.js file to fetch all meals and pass them to the MealsGrid component.
 


//? OutSource the Means of Data Fetching: We are outsourcing the data fetching to a separate function (getAllMeals) in the lib folder. This makes our code cleaner and more maintainable. If we want to change the way we fetch data, we can do it in one place (the getAllMeals function) instead of changing it in multiple places (the page.js file and the MealsGrid component).


//? to show the metadata all the pages created. we can add this kind of metadata.
export const metadata = {
  title: "All Meals",
  description: "Browse the delicious meals shared by our vibreant community.",
};




async function Meals() {
    const meals = await getAllMeals();
    return <MealsGrid meals={meals} />

}

const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite meals and cook them yourself. It's easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Meals</Link>
        </p>
      </header>

      <main className={classes.main}>
        {/* Suspense: React Suspense allows you to "wait" for some code to load and declaratively specify a loading state (like a spinner) while waiting. In this case, we are using Suspense to wait for the Meals component to load and show a loading message while waiting. */}
        <Suspense fallback={<p className={classes.loading}>Loading Meals...</p>}>
           <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
