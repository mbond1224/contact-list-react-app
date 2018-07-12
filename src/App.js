import React, { Component } from 'react';
import ListContacts from './ListContacts';
import {Route} from 'react-router-dom'
import CreateContact from './CreateContact'
import * as ContactsApi from './utils/ContactsAPI';
/* constructor () {
  this.state = {
    contacts: []
  };
} */

class App extends Component {

  state = {
      contacts: []
  }
  componentDidMount(){
    ContactsApi.getAll().then(
      (contacts)=>{this.setState({contacts})}
    );

  }
  removeContact = (contact) => {
       this.setState((state) => ({
          contacts: state.contacts.filter((c) => c.id !== contact.id)
        }))

        ContactsApi.remove(contact);
      }


  render() {
      return (
            <div className="app">
            <Route exact path="/" render={()=> (
             <ListContacts  onDeleteContact={this.removeContact} contacts={this.state.contacts} 
             onNavigate={()=>{this.setState({screen:'create'})}} />
            )}/>
            <Route path="/create" component={CreateContact}/>
            </div>
          );
  }
}

export default App;
