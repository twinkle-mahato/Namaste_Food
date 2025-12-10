import { useEffect, useState } from "react";

const User = (props) => {
  const [count, setCount] = useState(1);
  // mutiple state create
  // const [count2] = useState(2);

  useEffect(()=>{
    // API call
    fetchGithub()
  },[]) 

  const fetchGithub = async () => {
        const data = await fetch(
      "https://api.github.com/users/munish-01"
    );

    const json = await data.json();

    console.log(json);
  }

  return (
    <div className="user-card">
      <h1>Count :{count}</h1>
      <button onClick={()=>{
        setCount(count + 1)
      }}>
        Inc Count
      </button>
      {/* <h1>Count :{count2}</h1> */}
      <h2>Name: {props.name}</h2>
      <h3>Location: punjab</h3>
      <h4>Contact: @munish.com</h4>
    </div>
  );
};

export default User;