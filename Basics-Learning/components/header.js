import React from "react";

//? React component thta we can create inside the components folder and we can use it in any page or component by importing it. It will help us to keep our code DRY (Don't Repeat Yourself) and also it will help us to keep our code organized.
const Header = () => {
  return (
    <div>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
    </div>
  );
};

export default Header;
