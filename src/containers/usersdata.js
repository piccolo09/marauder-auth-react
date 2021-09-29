import React from 'react';
import { Link } from 'react-router-dom';
import {  Table } from "semantic-ui-react";

export default class UsersData extends React.Component{

    state = {   //loading untile data is featch
        loading:true,
        person:[]

    };
    async componentDidMount(){  //componenet has reander atleast onces 
        if (localStorage.getItem('access')){
        const url = `${process.env.REACT_APP_API_URl}/auth/users/`
        const response = await fetch(url, { 
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`, //auth token
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        this.setState({person:data,loading:false});      
    }else{
      console.log('Invalid')
    }
    console.log(typeof(person))
  }

    render() {
        return (
          <div>
                {this.state.loading || !this.state.person ?
                (
                    <div>Loading</div>
                ):(
                  <div className='container mt-5'>     
                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell>Id</Table.HeaderCell>
                                <Table.HeaderCell>UserName</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {this.state.person.map(data => ( 
                            <Table.Row key={data.id}>
                                <Table.Cell>{data.id}</Table.Cell>
                                <Table.Cell>{data.username}</Table.Cell>
                                <Table.Cell>{data.email}</Table.Cell>
                                <Table.Cell>{data.address}</Table.Cell>
                                <Link 
                                  type="submit"
                                  style = {{
                                    backgroundColor: "white",
                                    color: 'black',
                                    borderRadius: '12PX',
                                    boxShadow:' 0 5px #666',
                                    border:'2px solid ',
                                  }} to='/users/data/edit' > edit </Link>
                                  <Link 
                                  type="submit"
                                  style = {{
                                    backgroundColor: "white",
                                    color: 'black',
                                    borderRadius: '10px',
                                    boxShadow:' 0 5px #666',
                                    border:'2px solid',
                                  }}to='/users/data/delete'>delete</Link>
                              </Table.Row>
                            ))}
                          </Table.Body>
                        </Table>
                    </div>   
                )}       
            </div>
        );
    }
}
    