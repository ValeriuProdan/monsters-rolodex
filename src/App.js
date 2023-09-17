import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state =
    {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    /*fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => { return { monsters: users } }))*/

    const getUsers = async () => {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await usersResponse.json();
        console.log("valeriu")
        console.log(users);
        this.setState(() => {
          return {monsters: users}
        });
      }
      catch (err) {
        console.log(err)
      }
    }

    getUsers();
  }

  onSearchChange = (event) => {
    const searchString = event.target.value.toLocaleLowerCase();
    this.setState(() => { return { searchField: searchString } })
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Valeriu</h1>
        <SearchBox className='monsters-search-box' placeholder='search monsters' onChangeHandler={onSearchChange}/>
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
