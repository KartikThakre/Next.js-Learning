import MeetupDetails from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetupDetailsPage({ meetupData }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetails
        //   image="https://upload.wikimedia.org/wikipedia/commons/2/2b/S%C3%B8r-Fron_kirke_2.JPG?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original"
        //   title="A First Meetup"
        //   address="Some address 5, 12345 Some City"
        //   description="This is a first meetup!"
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

//? this function is used to specify which dynamic routes should be pre-rendered at build time. It is executed at build time, so the data is fetched only once when the application is built. The paths property is used to specify which dynamic routes should be pre-rendered, and the fallback property is used to specify what should happen if a user requests a route that has not been pre-rendered. In this case, we are pre-rendering two routes with meetupId values of "m1" and "m2", and we are setting fallback to false, which means that any other routes will result in a 404 page.
export async function getStaticPaths() {
  // fetch data from an API

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // paths:

    // [{ params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }],
  };
}

//? this function is used to fetch data for a single meetup based on the meetupId parameter in the URL. It is executed at build time, so the data is fetched only once when the application is built. The context parameter is used to access the params object, which contains the meetupId parameter from the URL.
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // fetch data for a single meetup

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId)
  });
  client.close();

  //   const meetupId = context.params.meetupId;
  //   console.log(meetupId);
  return {
    props: {
      //   meetupData: {
      //     image:
      //       "https://upload.wikimedia.org/wikipedia/commons/2/2b/S%C3%B8r-Fron_kirke_2.JPG?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
      //     id: meetupId,
      //     title: "A First Meetup",
      //     address: "Some address 5, 12345 Some City",
      //     description: "This is a first meetup!",
      //   },

      meetupData: {
        image: selectedMeetup.image,
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      }
    },
  };
}

export default MeetupDetailsPage;
