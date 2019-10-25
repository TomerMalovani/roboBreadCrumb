import React from 'react';
import './UserInfo.css';
import { Container, Row, Col } from 'reactstrap';

class UserData extends React.Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        console.log(this.props.userInfo)

    }

    render() {
        return (
            <Col xs="12" md="6" className="UserDatacontainer">
                {this.props.userInfo.money}
            </Col>
        );
    }
}





export default UserData