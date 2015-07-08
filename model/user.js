
var client = require("../util/mysqlUtil");
var sqlQuery = require("../script/sql");

exports.findUserByName = function(username, callback) {

};
exports.userExist = function(username, callback) {
	console.log(sqlQuery.userExist);
	client.query({
		sql: sqlQuery.userExist,
		params: {
			UserName : username
		}
	},function(err, rows) {
		console.log("userExist result : ");
		console.log(rows);
 		if (err) {
            console.log(err);
        }

        if (rows && rows.length > 0) {
            callback(null,true);
        } else {
            callback(null,false);
        }
	});
};

exports.addUser = function(user, callback) {
	console.log(sqlQuery.addUser);
	client.query({
		sql: sqlQuery.addUser,
		params: {
			UserName : user.username,
			PassWord : user.password
		}
	},callback);
};
exports.editPassword = function(user, callback) {

};
