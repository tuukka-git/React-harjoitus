import React, { useEffect, useState } from 'react';
import './App.css';
import Row from './components/Row';
import Form from './components/Form';
import axios from 'axios';
import { getEnvironmentData } from 'worker_threads';

interface Person {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
}

const App = () => {

  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    getPersons()
  },[])

  const getPersons = async () => {
    const resp = await axios.get<Person[]>('http://localhost:8080/persons');
    setPersons(resp.data)
  }
  const add = (newPerson : Person) => {
    setPersons(persons => [...persons, newPerson]);
  }
  const deletePerson = (id: number) => {
    console.log(id)
   setPersons(persons.filter(p => p.id !== id));
  }


  return <div className=''>  
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Firstname</th>
                    <th scope="col">Lastname</th>
                    <th scope="col">Age</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                {persons.map(p => <Row deletePerson={deletePerson} id={p.id} firstname={p.firstname} lastname={p.lastname} age={p.age}/>)}
                <Form add={add}/>
                </tbody>
              </table>
        </div>
}

export default App;
