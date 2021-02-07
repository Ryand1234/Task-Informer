const db = require('../db').db

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
			let tasks = await db.Task.findAll({
				order: [
					['taskPriority', 'DESC'],
					['taskName', 'ASC'],
				],
			})
			return tasks;
		}
	},
	Mutation: {
		addTask: async(_, {input}) => {
			input.createdAt = new Date()
			await db.Task.create(input)
			tasks = await db.Task.findAll({
				order: [
					['taskPriority', 'DESC'],
					['taskName', 'ASC'],
				],
			})
			return tasks
		},
		updateTask: async(_,{id, input}) => {
			let task = await db.Task.findOne({where:{id: id}});
			await task.update(input)
			tasks = await db.Task.findAll({
				order: [
					['taskPriority', 'DESC'],
					['taskName', 'ASC'],
				],
			})
			return tasks;
		},
		deleteTask: async(_, {id}) => {
			await db.Task.destroy({where:{id: id}})
			tasks = await db.Task.findAll({
				order: [
					['taskPriority', 'DESC'],
					['taskName', 'ASC'],
				],
			})
			return tasks;
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