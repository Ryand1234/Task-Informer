import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import  gql from 'graphql-tag';
import { Router } from '@angular/router'
const GET_TASK = gql`
	query task{
		task{
	      id
        taskName
        taskPriority
        taskTime
        taskStatus
    	}
	}
`;

const UPDATE_TASK = gql`
  mutation update_task(
      $id: String!
      $taskStatus: String
    ) {
    updateTask(id: $id, input:{
      taskStatus: $taskStatus
    }){
      taskName
      taskStatus
    }
  }
`;

const DELETE_TASK = gql `
  mutation delete_Task($id: String!){
    deleteTask(id: $id){
      taskName
      id
    }
  }
`;

interface Itask{
	taskName: string,
	taskTime: string,
  taskPriority: number,
  taskStatus: string
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


	  tasks: Array<Itask> = []
  	
  	private query: QueryRef<any>;

  	constructor(public apollo: Apollo, public router: Router) { }


  	ngOnInit(): void {
  		this.query = this.apollo.watchQuery({query: GET_TASK});

  		this.query.valueChanges.subscribe(result =>{
  			this.tasks = result.data.task;
  		})
  	}

  	complete(id){
  		this.apollo.mutate({
        mutation: UPDATE_TASK,
        variables: {
          id: id,
          taskStatus: "Complete"
        }
      }).subscribe(({data})=>{
        this.router.navigate(["/task"])
      })
  	}

    delete(id){
      this.apollo.mutate({
        mutation: DELETE_TASK,
        variables: {
          id: id
        }
      }).subscribe(({data})=>{
        this.router.navigate(["/task"]);
      })
    }

}
