'use client';
import { useFormState } from "react-dom";
import { shareMealHandler } from "@/lib/action";
import classes from './page.module.css';
import ImagePicker from '@/components/meals/image-picker';
import MealsFormSubmit from "@/components/meals/meals-form-submit";

export default function ShareMealPage() {

 //? shareMealHandler: This function is a server action that handles the form submission for sharing a meal. It takes the form data, extracts the relevant information (like title, summary, instructions, image, name, and email), and logs it to the console. In a real application, this function would likely send the data to a server or database for storage.
 //? we have used the 'use server' directive in the action.js file to tell nextjs that this function is a server action and should be executed on the server side. this is important because we don't want to expose our server side logic to the client side.


 
  const [state, formAction] = useFormState(shareMealHandler, {message: null});


  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Meal Image" name="image" required  />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}