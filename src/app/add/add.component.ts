import { Component } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router'
import Swal from 'sweetalert2/dist/sweetalert2.js';

const ADD_TASK = gql`
mutation addtask($name: String, $email: String, $status: String, $time: String, $priority: Int ){
  addTask(input:{
    taskName:$name
    taskStatus:$status
    taskTime:$time
    taskPriority: $priority
    emailId: $email
  }) {
      taskName
      taskStatus
      taskTime
      taskPriority
  }
}`;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(private apollo: Apollo,
  			private router: Router) { }

  task: string;
  status: string = "progress";
  date: string;
  priority: number;

  add(){
  	this.apollo.mutate({
  		mutation: ADD_TASK,
  		variables: {
  			name: this.task,
  			status: this.status,
  			time: this.date,
        priority: this.priority,
        email: "riyandhiman14@gmail.com"
  		}
  	}).subscribe(({data})=>{
  		this.router.navigate(['/task']);
  	}, (err)=>{
  		Swal.fire(
        'Error',
        'Task Cannot be created.',
        'error'
      )
  	})
  }

}
