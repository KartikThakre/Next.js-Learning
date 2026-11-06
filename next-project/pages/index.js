import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head';

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/2/2b/S%C3%B8r-Fron_kirke_2.JPG?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
//     address: "Some address 5, 12345 Some City",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/2/2b/S%C3%B8r-Fron_kirke_2.JPG?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original",
//     address: "Some address 10, 12345 Some City",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage({ meetups }) {
  return (
    <>
    <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!" />
    </Head>
      <MeetupList meetups={meetups} />
    </>
  );
}

// //? this function is used to fetch data from an API and return it as props to the component. It is executed at build time, so the data is fetched only once when the application is built. The revalidate property is used to specify how often the data should be re-fetched. In this case, it is set to 1 second, which means that the data will be re-fetched every second.
export async function getStaticProps() {
  // fetch data from an API
  //? we are using the MongoClient class from the mongodb package to connect to a MongoDB database. The connect method takes a connection string as an argument, which specifies the location of the database and any authentication credentials needed to access it. Once connected, the db method can be used to get a reference to the database, and then use the collection method to get a reference to a specific collection within that database. Finally, the insertOne method can be used to insert a new document into that collection.

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();

  const meetupsCollection = await db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    //? revalidate is used to specify how often the data should be re-fetched. In this case, it is set to 1 second, which means that the data will be re-fetched every second.
    revalidate: 1,
  };
}

//? we use getServerSideProps when we want to fetch data on every request. This is useful when we want to fetch data that changes frequently or when we want to fetch data that is specific to the user making the request. In this case, we are fetching data from an API and returning it as props to the component. The context parameter is used to access the request and response objects, which can be used to fetch data based on the user's request.
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
