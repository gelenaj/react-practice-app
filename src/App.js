import React, { Component } from 'react';
import './App.css';
import Person  from './Person/Person'

class App extends Component {
  state = {
    persons: [
      {id:1, name: 'Gloria Elena', age: 23},
      {id:2, name: 'Natty', age: 3},
      {id:3, name: 'Sophia', age: 13}
    ],
    otherState:'some other value',
    showPersons: false
  }

  switchNameHandler = (newName, othername) =>{
    //console.log('was clicked');
    //this.state.persons[0].name="Jimenez";
    this.setState({
      persons: [
        {name: newName, age: 23},
        {name: othername, age: 3},
        {name: 'Sophia', age: 0}
      ]

    })
  }
  //fetching index of that person whose name ur changing
nameChangeHandler = (event, id) => {
  const personIndex =this.state.persons.findIndex(p => {
    return p.id === id;
  });

/*
getting individual person
so you do not mutate original array,
use spread to copy original array into new object
*/
  const person = {...this.state.persons[personIndex]};

//update person's name in copy
  person.name= event.target.value;

//get array
  const persons =[...this.state.persons];
  //update array at position you changed
  persons[personIndex]=person;
//set state
  this.setState({persons: persons})
}

deletePersonHandler=(personIndex) =>{
  //const persons = this.state.persons.slice();
  const persons =[...this.state.persons];
  persons.splice(personIndex, 1);
  this.setState({persons: persons})
}

togglePersonHandler=()=>{
  const doesShow = this.state.showPersons;
  this.setState({showPersons: !doesShow})
}

  render() {
    const style ={
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons){
    persons =(
      <div>
      {this.state.persons.map((person, index)=> {
        return <Person
          click={()=>this.deletePersonHandler(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed ={(event)=>this.nameChangeHandler(event, person.id)}
          />
      })}
    </div>
);
  style.backgroundColor='red';
}

const classes=[];

if(this.state.persons.length<=2){
  classes.push('red');
}
if(this.state.persons.length<=1){
  classes.push('bold');
}


    return (
      <div className="App">
        <h1>hello</h1>
        <p className={classes.join('')}>This is working</p>
        <button
          style={style}
          onClick={this.togglePersonHandler}>Switch Name</button>
          {persons}
      </div>
    );
  }
}

export default App;
