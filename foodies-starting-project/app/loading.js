import React from 'react'
import classes from './loading.module.css'

//? loading.js is a special file in Next.js that is used to show a loading state while the page is being loaded. It is automatically rendered by Next.js when the page is being loaded. This is useful for showing a loading spinner or a loading message while the page is being loaded.
const MealsLoadingPage = () => {
  return (
    <p className={classes.loading}>Fetching Meals...</p>
  )
}

export default MealsLoadingPage