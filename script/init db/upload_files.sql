/*
Navicat MySQL Data Transfer

Source Server         : surface pro 3
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : forex

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2015-06-12 00:04:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for upload_files
-- ----------------------------
DROP TABLE IF EXISTS `upload_files`;
CREATE TABLE `upload_files` (
  `id` bigint(20) unsigned zerofill NOT NULL AUTO_INCREMENT COMMENT '默认唯一标示符',
  `user_id` bigint(20) NOT NULL COMMENT '对应上传用户的ID值',
  `file_name` varchar(255) NOT NULL COMMENT '上传文件的原始文件名',
  `store_path` varchar(255) NOT NULL COMMENT '上传后的存储位置，包含文件名，与原始文件名不同，为系统自动命名',
  `type` varchar(255) DEFAULT NULL COMMENT '判断上传交易纪录的类型，包含交易商、文件格式等',
  `CreateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
