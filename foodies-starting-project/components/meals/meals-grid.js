import React from 'react'
import MealItem from './meals-item'
import classes from './meals-grid.module.css'

//? Scalability: Makes large web applications much cleaner to build, test, and scale.

const MealsGrid = ({meals}) => {
  return (
    <ul className={classes.meal}>
        {meals.map((meal) => (
            <li key={meal.id}>
                <MealItem {...meal} />
            </li>
    ))}
    </ul>
   
  )
}

export default MealsGrid