import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import { useRouter } from 'next/router';


function MeetupItem(props) {
const router = useRouter();

//? why we use router here because we want to navigate to a different page when the user clicks on the "Show Details" button. The useRouter hook provides access to the router object, which allows us to programmatically navigate to different routes in our Next.js application.
  function showDetailsHandler() {
   router.push('/' + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
