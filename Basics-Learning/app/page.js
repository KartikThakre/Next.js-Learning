import Link from "next/link";
import Header from "@/components/header";
import { React } from 'react';

//? for internal link we can use the component provided by next.js called Link. It will help us to navigate between the pages without reloading the page. It will also help us to prefetch the page in the background so that when we navigate to that page it will load faster.
export default function Home() {
  return (
    <main>
      {/* Here the Header is a React component that we have created in the components folder. We can use it in any page or component by importing it. It will help us to keep our code DRY (Don't Repeat Yourself) and also it will help us to keep our code organized. */}
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><Link href="/awasome">Go to Awasome Page</Link></p>
    </main>
  );
}
