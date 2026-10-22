import React from 'react'
import Link from 'next/link'
//? using the dynamic route feature of next.js we can create a dynamic route by creating a file with the name [slug].js inside the blog folder. The [slug] is a placeholder for the actual value that we will pass in the url. For example if we want to access the post-1 page then we can access it by going to the url /blog/post-1. The value of the slug will be post-1 and we can access it inside the [slug].js file by using the useRouter hook provided by next.js.
const page = () => {
  return (
    <main>
      <h1>Welcome to the Blog Page</h1>
      <p>
        <Link href="/blog/post-1">Go to Post 1</Link>
      </p>
     <p>    
    <Link href="/blog/post-2">Go back to Home Page</Link>
     </p>
    </main>

  )
}

export default page