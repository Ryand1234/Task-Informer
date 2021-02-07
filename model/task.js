module.exports = (sequelize, type) => {
	const Task = sequelize.define('task', 
  {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    taskName: {
      type: type.STRING,
      allowNull: false
    },
    taskPriority: {
      type: type.INTEGER
    },
    taskTime: {
      type: type.STRING
    },
    taskStatus: {
      type: type.STRING
    },
    emailId: {
      type: type.STRING
    }
  })

  return Task;
}