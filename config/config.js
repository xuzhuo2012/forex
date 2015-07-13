/*
  -*- coding:utf-8 -*-
 
 */

/**
 * init config info
 * @return {object} config-info object
 */
exports.appConfig = {
    mongodbConfig : {
        dbURL : 'mongodb://localhost/forex'
    },

    configInfo : {

        //mysql max connections
        default_max_conns : 50,

        // mysqlConfig       : {
        //     "host"      : "172.16.206.16",
        //     "user"      : "root",
        //     "password"  : "123456",
        //     "database"  : "fixedAsset"
        // },

        mysqlConfig       : {
            "host"      : "127.0.0.1",
            "user"      : "root",
            "password"  : "root",
            "database"  : "forex"
        },

        default_page_size : 50,

        statusCode        : {
            STATUS_OK                 : 0,
            STATUS_NOTFOUND           : 1,        //means data not found not url request
            STATUS_SERVER_ERROR       : 2,
            STATUS_INVAILD_PARAMS     : 3,
            STATUS_DBERROR            : 4
            //....
        },

        faType            : {
            ENUM_HC         : "HOSTCOMPUTER",
            ENUM_MOB        : "MOBILE",
            ENUM_MON        : "MONITOR",
            ENUM_NOT        : "NOTEBOOK",
            ENUM_OE         : "OFFICEEQUIPMENT",
            ENUM_OF         : "OFFICEFURNITURE",
            ENUM_OTE        : "OTHEREQUIPMENT",
            ENUM_SERVER     : "SERVER",
            ENUM_VE         : "VIRTUALEQUIPMENT"
        }
    }

    //return configInfo;
}
