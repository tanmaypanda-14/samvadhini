import React from "react";
import Header from "./components/header";
import Message from "./components/message";
class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Message />
      </div>
    );
  }
}
export default App;
