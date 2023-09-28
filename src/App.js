import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  const getUsers = async () => {
    try {
      const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await usersResponse.json();
      setMonsters(users);
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return(
    <div className="App">
      <h1 className='app-title'>Monsters Valeriu</h1>
      <SearchBox 
        className='monsters-search-box' 
        placeholder='search monsters' 
        onChangeHandler={onSearchChange}
      />
       <CardList monsters={filteredMonsters}/> 
    </div>    
  );
}


export default App;
