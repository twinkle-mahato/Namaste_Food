import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      // count: 0,
      // count2: 2,
      userInfo: {
        name: "dummy",
        location: "dummy",
        avatar_url: "https://www.dummy.com"
      }
    };
    // console.log(this.props.name + "child constructor")
  }

  async componentDidMount(){
    // console.log(this.props.name + "child component did mount")
    // API CALLS 
          const data = await fetch("https://api.github.com/users/twinkle-mahato")
    const json = await data.json()

    this.setState({
      userInfo: json
    })
    console.log(json)
  }

  componentDidUpdate(){
    console.log("compoent did update")
  }

  componentWillUnmount(){
    console.log("component will unmount")
  }

  render() {
    // const { name, location, contact } = this.props;
    // const { count} = this.state;
    const {name, location, avatar_url} = this.state.userInfo


    // console.log(this.props.name + "child render")
    return (
      <div className="user-card">
        {/* <h1>count: {this.state.count}</h1> */}
        {/* <h1>count: {count}</h1> */}
        {/* <button onClick={()=>{ */}
          {/* // dont update like this - we will never update our state varible directly */}
          {/* // this.state.count = this.state.count + 1 */}
          {/* this.setState({ */}
            {/* count: this.state.count + 1 */}
          {/* }) */}
        {/* }}>Inc Count</button> */}
        {/* <h1>count2: {count2}</h1> */}
        <img  src={avatar_url} alt=""/>
        <h2>Name: {name}</h2>
        <h3>Location: {location || "dummy"}</h3>
        {/* <h4>Contact: {contact}</h4> */}
      </div>
    );
  }
}

export default UserClass;