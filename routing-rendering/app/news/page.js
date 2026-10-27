import Link from "next/link";
import React from "react";
import { DUMMY_NEWS } from "@/public/dummy-news";
import NewsList from "@/components/news-list";

const page = () => {
  return (
    <div>
      <h1>Welcome to the News Page</h1>
      <NewsList news = {DUMMY_NEWS} />
    </div>
  );
};

export default page;
