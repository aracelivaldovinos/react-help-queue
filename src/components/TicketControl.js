import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from "./TicketDetail";
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      formVisibleOnPage: false,
      selectedTicket: null,
      editing: false
    };
  }
  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false 
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleAddingNewTicketToList = (newTicket) => {
    // this.props
    // <MyComponent someProperty={42}
    // this.props.someProperty
    // const someProperty = this.props.someProperty
    // const someArray = [1,2,3]
    // const someOtherArray = [...someArray]
    // someOtherArray [1, 2, 3]
    /*
      const myObj = { a: 1, b: 2, c: 3 }

      const myOtherObj = {
        ...myObj,
      }

      myOtherObj === {
        a: 1, b: 2, c: 3
      }

      const { a } = myObj
      console.log(a) // 1
    */

    const {dispatch} = this.props;
    const {id, names, location, issue} = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id, // id: id,
      names,
      location,
      issue,
    }

    // equivalent
    // const action = {
    //   type: 'Add Ticket',
    //   ...newTicket,
    // }

    dispatch(action);
    this.setState({formVisibleOnPage: false})
  };
  
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.masterTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }
  handleDeletingTicket = (id) => {
    const {dispatch} = this.props;
    const action = {
      types: 'DELETE_ACTION',
      id: id
    }
    dispatch(action);
    this.setState({
      selectedTicket: null
    });
  }

handleEditingTicketInList = (ticketToEdit) => {
  const {dispatch} = this.props;
  const {id, names, location, issue} = ticketToEdit;
  const action = {
    type: 'ADD_TICKET',
    id,
    names,
    location,
    issue
  }
  dispatch(action);
  this.setState({
      editing: false,
      selectedTicket: null
    });
}
  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket}  onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    }
    else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket}  onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick}/>
      buttonText = "Return to Ticket List";
    }
    else if(this.state.formVisibleOnPage){
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List";
    }else{
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>
      buttonText = "Add Ticket";
    }

    return(
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

/*
const mapStateToProps = state => {
  return {
    masterTicketList: state,
  }
}
*/

TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
}

const mapStateToProps = state => ({
  masterTicketList: state,
})

TicketControl = connect(
  mapStateToProps,
)(TicketControl);
export default TicketControl;