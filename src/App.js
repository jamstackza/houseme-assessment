import React from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import {
    Card,
    CardHeader,
    CardTitle,
    CardImg,
    CardBody,
    CardFooter,
    Button
} from "shards-react";

class App extends React.Component {
  state = {
    users: [],
    isLoading: true,
    errors: null
  };

  getUsers() {
    axios
      .get("https://randomuser.me/api/?results=5")
      .then(response =>
        response.data.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          image: `${user.picture.large}`
        }))
      )
      .then(users => {
        this.setState({
          users,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      <React.Fragment>
        <div className="user-grid-container">
          {!isLoading ? (
            users.map(user => {
              const { username, name, email, image } = user;
              return (

                  <Card style={{ maxWidth: "300px" }} key={username}>
                      <CardHeader>{name}</CardHeader>
                      <CardImg src={image} />
                      <CardBody>
                          <CardTitle>Contact</CardTitle>
                          <p>{email}</p>
                      </CardBody>
                  </Card>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
