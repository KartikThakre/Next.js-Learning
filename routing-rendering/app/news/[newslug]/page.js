import { DUMMY_NEWS } from '@/public/dummy-news'
import { notFound } from 'next/navigation';
import React from 'react'

const page = ({params}) => {

    const newsSlug = params.newslug
    const newsItem = DUMMY_NEWS.find((newsItem) => newsItem.slug === newsSlug);

    //? not found methjod check the closest not found page and render the data accordingly.
    if(!newsItem){
        notFound();
    }

  return (
    <article className='news-article'>
        <header>
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
            <h1>{newsItem.title}</h1>
            <time datetime={newsItem.date}>{newsItem.date}</time>
        </header>
        <p>{newsItem.content}</p>
    </article>
  )
}

export default page