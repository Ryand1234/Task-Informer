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
      id
      taskName
      taskPriority
      taskTime
      taskStatus
    }
  }
`;

const DELETE_TASK = gql `
  mutation delete_Task($id: String!){
    deleteTask(id: $id){
      id
      taskName
      taskPriority
      taskTime
      taskStatus
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


	  allTasks: Array<any> = []
    tasks: Array<any> = []
  	
  	private query: QueryRef<any>;

  	constructor(public apollo: Apollo, public router: Router) { }


  	ngOnInit(): void {
  		this.query = this.apollo.watchQuery({query: GET_TASK});

  		this.query.valueChanges.subscribe(result =>{
  			this.allTasks = result.data.task
        this.tasks = this.allTasks.filter(task => task.taskStatus !== 'Complete')
      })
  	}

  	complete(id){
  		this.apollo.mutate({
        mutation: UPDATE_TASK,
        variables: {
          id: id,
          taskStatus: "Complete"
        }
      }).subscribe((data: any)=>{
        this.allTasks = data.data.deleteTask
        this.tasks = this.allTasks.filter(task => task.taskStatus !== 'Complete')
      })
  	}

    delete(id){
      this.apollo.mutate({
        mutation: DELETE_TASK,
        variables: {
          id: id
        }
      }).subscribe((data: any)=>{
        this.allTasks = data.data.deleteTask
        this.tasks = this.allTasks.filter(task => task.taskStatus !== 'Complete')
      })
    }

}
