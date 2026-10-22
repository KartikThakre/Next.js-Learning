"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() === "";
}

//? Server Actions: Server Actions are a new feature in Next.js 14 that allow you to define server-side functions that can be called from the client. This is useful for handling form submissions, as it allows you to keep your server-side logic separate from your client-side logic. In this case, we are using a server action to handle the form submission and log the meal data to the console.
export async function shareMealHandler(prevState ,formData) {
  const mealData = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    image: formData.get("image"),
  };

  if (
    isInvalidText(mealData.title) ||
    isInvalidText(mealData.summary) ||
    isInvalidText(mealData.instructions) ||
    isInvalidText(mealData.creator) ||
    isInvalidText(mealData.creator_email) ||
    !mealData.creator_email.includes('@') ||
    !mealData.image || mealData.image.size === 0
  ){
    return {
        message : "Invalid Inputs."
    };
  }


  await saveMeal(mealData);
  //? revalidate method use for revalidate the cache while runing the application in production
  revalidatePath("/meals");
  redirect("/meals");
}
