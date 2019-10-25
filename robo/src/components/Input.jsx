import React from 'react';
import './Input.css';
import { Container, Row, Col } from 'reactstrap';

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description: undefined,
            amount: 0,
            type: "income",
            categories: ["shopping", "car", "food"],
            selectedCategory: "",
            error: undefined
        }
    }
    componentDidMount() {
        this.setState({ selectedCategory: this.state.categories[0] });
    }

    sendExpense = e => {
        fetch('http://localhost:5500/addtransfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: 'jamal',
                category: this.state.selectedCategory,
                description: this.state.description,
                amount: this.state.amount,
                type: this.state.type
            })
        }).then(res => res.json())
            .then(data => this.setState({ error: data }))
            .catch(error => console.log(error));

        this.props.callback();

    }



    updateDescInfo(e) {
        this.setState({ description: e.target.value });
    }

    updateAmountInfo(e) {
        this.setState({ amount: e.target.value });
    }

    changeTypeofExpense() {
        console.log(this.state.type)
        this.setState({ type: (this.state.type === "income") ? "Expense" : "income" });
    }

    changeCategory(e) {
        this.setState({ selectedCategory: e.target.value })
    }





    render() {
        return (
            <Col xs="12" md="6" className="formcontainer">
                <label for="category">category:</label>
                <select id="category" onChange={(e) => { this.changeCategory(e); }}>
                    {
                        this.state.categories.map((category, index) => {
                            return <option key={index} value={category}>{category}</option>
                        })
                    }
                </select>
                <label for="description">description:</label>
                <input id="description" onChange={(e) => { this.updateDescInfo(e) }} type="text"></input>
                <label for="amount">amount:</label>
                <input id="amount" onChange={(e) => { this.updateAmountInfo(e) }} type="number"></input>
                <div className="btnArea">
                    <button onClick={() => { this.changeTypeofExpense() }} className={'ExpenseTypeBtn ' + this.state.type}>{this.state.type}</button>
                </div>
                <span>{this.state.error}</span>

                <input className="submitBtn" onClick={this.sendExpense} type="submit" value="submit"></input>
            </Col>


        );
    }
}

export default Input