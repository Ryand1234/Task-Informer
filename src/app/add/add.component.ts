import { Component } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router'

const ADD_TASK = gql`
mutation addtask($name: String, $status: Boolean, $time: String, $priority: Number ){
  addtask(input:[{
    id: "hello"
    name:$name
    status:$status
    time:$time
    priority: $priority
  }]) {
    task{
      name
      status
      time
      priority
    }
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
  status: boolean = false;
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
  			status: false,
  			time: this.date,
        priority: this.priority
  		}
  	}).subscribe(({data})=>{
  		this.router.navigate(['/task']);
  	}, (err)=>{
  		this.isDisabled = !this.isDisabled;
      console.log("T: ", this.isDisabled)
  	})
  }

}
