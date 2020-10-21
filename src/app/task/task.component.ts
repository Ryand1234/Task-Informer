import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import  gql from 'graphql-tag';

const GET_TASK = gql`
	query task{
		querytask{
	      name
    	  status
	      time
    	}
	}
`;

interface Itask{
	name: string,
	status: boolean,
	time: string
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  /*{name: "Wake up", status: true, time: "14*02*2001"},
  {name: "Take A Bath", status: true, time: "14-02-2001"},
  {name: "Join Online Classes", status: true, time: "14-02-2001"}
  */

	tasks: Array<Itask> = []
  	
  	private query: QueryRef<any>;

  	constructor(public apollo: Apollo) { }


  	ngOnInit(): void {
  		this.query = this.apollo.watchQuery({query: GET_TASK});

  		this.query.valueChanges.subscribe(result =>{
  			this.tasks = result.data.querytask;
  		})
  	}

  	complete(){
  		
  	}

}
