const Task = require('../model/task');

const taskTypeDefs = `

	type Task {
		id: String!
		taskName: String!
		taskPriority: Int!
		taskTime: String!
		taskStatus: String!
		emailId: String!
		createdAt: String!
	}

	extend type Query {
		task: [Task]
	}

	input UpdateTask {
		taskPriority: Int
		taskStatus: String
	}

	input NewTask {
		taskName: String
		taskPriority: Int
		taskTime: String
		taskStatus: String
		emailId: String
	}

	extend type Mutation {
		addTask(input: NewTask!): [Task]
		updateTask(id: String!, input: UpdateTask!): [Task]
		deleteTask(id: String!): [Task]		
	}
`;


const taskResolver = {
	Query: {
		task: async(_) =>{
			let tasks = await Task.find({})
			return tasks;
		}
	},
	Mutation: {
		addTask: async(_, {input}) => {
			input.createdAt = new Date()
			const task = new Task(input);
			await task.save(async(err, tasks)=>{
				tasks = await Task.find({})
				return tasks;
			});
		},
		updateTask: async(_,{id, input}) => {
			let task = await Task.findById(id);
			if(input.taskPriority != undefined)
			{
				task.taskPriority = input.taskPriority
			}
			if(input.taskStatus != undefined)
			{
				task.taskStatus = input.taskStatus
			}
			await Task.findByIdAndUpdate(id, task, async(err, tasks)=>{
				tasks = await Task.find({})
				return tasks;
			})
		},
		deleteTask: async(_, {id}) => {
			await Task.findByIdAndRemove(id, async(err, task)=>{
				tasks = await Task.find({})
				return tasks;
			})
		}
	}
}

module.exports = {
	taskResolver: taskResolver,
	taskTypeDefs: taskTypeDefs
}

//Mutation Query
/*mutation addTask(
	$taskName: String,
  $taskPriority: Int,
  $taskTime: String,
  $taskStatus: String,
  $emailId: String
){
  addTask(input: {
    taskName: $taskName,
		taskPriority: $taskPriority,
		taskTime: $taskTime,
		taskStatus: $taskStatus,
		emailId: $emailId
  }){
    id
  }
}*/