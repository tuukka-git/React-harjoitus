import { render } from "@testing-library/react";
import axios from "axios";
import { Component, useEffect, useState } from "react";
import { unmountComponentAtNode } from "react-dom";

interface Person {
    firstname: number;
    lastname: string;
    age: number;  
}
type RowProps = {
    deletePerson: Function;
    id: number;
    firstname: string;
    lastname: string;
    age: number;
}

const Row = ( props : RowProps) => {

    const deleteP = async () => {
        console.log('delete');
        props.deletePerson(props.id);
        const resp = await axios.get<Person>('http://localhost:8080/person/' + props.id);
    }
    
    return(
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.firstname}</td>
            <td>{props.lastname}</td>
            <td>{props.age}</td>
            <td><button className="btn btn-primary" onClick={deleteP}>Delete</button></td>
        </tr>
        );

};

export default Row;