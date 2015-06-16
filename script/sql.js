

var sqlQuery = {
	userExist : "select 1 from user where username = :UserName limit 1",
	addUser : "insert into user set username = :UserName , password= :PassWord"
}

module.exports = sqlQuery;