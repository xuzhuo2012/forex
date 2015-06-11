/*
  #!/usr/local/bin/node
  -*- coding:utf-8 -*-
 
 */

var mysql     = require("mysql");
var mysqlPool = null;
var config    = require("../config").initConfig();

/**
 * init mysql pool
 * @return {null} 
 */
function initMysqlPool () {
    mysqlPool = mysql.createPool(config.mysqlConfig);
}

/**
 * do mysql query
 * @param  {object}   sqlReq   the sql request obj
 * @param  {Function} callback the callback func
 * @return {null}            
 */
exports.query = function (sqlReq, callback) {
	console.log(sqlReq);
    //sql, params
    if (!mysqlPool) {
        initMysqlPool();
    }

    if (!sqlReq) {
        throw new DBError("the sqlReq is null");
    }

    var sql_pattern = sqlReq.sql || "";
    if (sql_pattern.length === 0) {
        throw new DBError("the sql is empty");
    }

    mysqlPool.getConnection(function (err, connection) {

        if (err) {
            throw err;
        }

        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
              if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
              }
              return txt;
            }.bind(this));
        };

        connection.query(sql_pattern, sqlReq.params, function (err, rows) {
            connection.release();
            return callback(err, rows);
        });
    });
};

/**
 * get mysql-connection for transaction
 * @param  {Function} callback the cb func
 * @return {null}            
 */
exports.processTransaction = function (callback) {
    if (!mysqlPool) {
        initMysqlPool();
    }

    mysqlPool.getConnection(function (err, connection) {

        if (err) {
            throw err;
        }

        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
              if (values.hasOwnProperty(key)) {
                return this.escape(values[key]);
              }
              return txt;
            }.bind(this));
        };

        return callback(connection);
    });
};