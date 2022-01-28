import { useState } from "react";
import axios from "axios";
import { type } from "os";

interface Person {
    firstname: number;
    lastname: string;
    age: number;  
}

type FormProps = {
    add: Function;
}

const Form = (props: FormProps) => {

    const [fname, setFname] = useState<string>('');
    const [lname, setLname] = useState<string>('');
    const [age, setAge] = useState<number>();

    const changeFname = (e: any) => { setFname(e.target.value)}
    const changeLname = (e: any) => { setLname(e.target.value)}
    const changeAge = (e: any) => { setAge(e.target.value)}

    const addPerson = () => {
        console.log('add');
        (async () => {
            const resp = await axios.post<Person>('http://localhost:8080/person',
            {
                firstname: fname,
                lastname: lname,
                age: age,
            });
            props.add(resp.data);
          })();
    }

    return <tr>
            <th scope="row">#</th>
            <td><input className="form-control" onChange={changeFname}></input></td>
            <td><input className="form-control" onChange={changeLname}></input></td>
            <td><input className="form-control" onChange={changeAge}></input></td>
            <td><button className="btn btn-primary" onClick={addPerson}>Add</button></td>
        </tr>
}

export default Form;