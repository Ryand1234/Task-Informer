import { Component } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router'

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
  isDisabled: boolean = false;
  status: string = "progress";
  date: string;
  priority: number;

  change(){
    this.isDisabled = !this.isDisabled;
  }

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
  		this.isDisabled = !this.isDisabled;
      console.log("T: ", this.isDisabled)
  	})
  }

}
