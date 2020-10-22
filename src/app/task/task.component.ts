import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import  gql from 'graphql-tag';

const GET_TASK = gql`
	query task{
		task{
	      id
        taskName
        taskPriority
        taskTime
    	}
	}
`;

interface Itask{
	taskName: string,
	taskTime: string,
  taskPriority: number
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


	tasks: Array<Itask> = []
  	
  	private query: QueryRef<any>;

  	constructor(public apollo: Apollo) { }


  	ngOnInit(): void {
  		this.query = this.apollo.watchQuery({query: GET_TASK});

  		this.query.valueChanges.subscribe(result =>{
  			this.tasks = result.data.task;
  		})
  	}

  	complete(){
  		
  	}

}
