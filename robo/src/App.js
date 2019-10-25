import React from 'react';
import './App.css';
import Input from './components/Input';
import Header from './components/Header';
import MoneyTable from './components/MoneyTable';
import UserInfo from './components/UserInfo';
import { Container, Row, Col } from 'reactstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    }
    this.callback = this.callback.bind(this);
  }

  componentDidMount() {
    this.callback();
  }

  changeuserInfo() {
    console.log("hey")
    fetch('http://localhost:5500/getuserstatus', {
      method: 'GET',
    }).then(res => res.json())
      .then(data => this.setState({ user: data }))
      .catch(error => console.log(error));
  }

  callback = () => {
    this.changeuserInfo();
  }

  render() {



    return (
      <Container fluid className="containApp">
        <Header />
        <Row className="UserInterface">
          <Input callback={this.callback} />
          <UserInfo userInfo={this.state.user} />
        </Row>
      </Container >



    )
  }
}

export default App;
