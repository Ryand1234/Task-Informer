import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import  gql from 'graphql-tag';
import Swal from 'sweetalert2/dist/sweetalert2.js';
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

  	complete(id, name){
      Swal.fire({
        title: `Are you sure task: ${name} is complete?`,
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.apollo.mutate({
            mutation: UPDATE_TASK,
            variables: {
              id: id,
              taskStatus: "Complete"
            }
          }).subscribe((data: any)=>{
            this.allTasks = data.data.updateTask
            this.tasks = this.allTasks.filter(task => task.taskStatus !== 'Complete')
            Swal.fire(
              'Removed!',
              'Task completed successfully.',
              'success'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Task is still in progress.',
            'error'
          )
        }
      })
  	}

    delete(id, name){
      Swal.fire({
        title: `Do you want to delete task: ${name}?`,
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.apollo.mutate({
            mutation: DELETE_TASK,
            variables: {
              id: id
            }
          }).subscribe((data: any)=>{
            this.allTasks = data.data.deleteTask
            this.tasks = this.allTasks.filter(task => task.taskStatus !== 'Complete')
            Swal.fire(
              'Removed!',
              'Task removed successfully.',
              'success'
            )
          })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Task is still in progress.)',
            'error'
          )
        }
      })
    }

}
