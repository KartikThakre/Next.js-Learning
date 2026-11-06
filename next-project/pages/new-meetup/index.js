import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from 'next/head';

function NewMeetupPage() {
  //? useRouter use  for programettically navigating to a different page after the form is submitted. In this case, we are using it to navigate back to the home page ("/") after the new meetup has been added successfully.
  const router = useRouter();

  //? this function is used to handle the submission of the new meetup form. It takes the entered meetup data as an argument, and sends a POST request to the /api/new-meetup endpoint with the data in the request body. The response from the server is then logged to the console. In a real application, you would typically handle the response and update the UI accordingly.

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.push("/");
  };

  return (
    <>
     <Head>
            <title>Add a New Meetup</title>
            <meta name="description" content="Add a new React meetup to the list!" />
        </Head>
  <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  )
}

export default NewMeetupPage;
