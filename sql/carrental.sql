-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2016 at 07:26 AM
-- Server version: 5.6.32
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `carrental`
--
CREATE DATABASE IF NOT EXISTS `carrental` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `carrental`;

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

DROP TABLE IF EXISTS `application`;
CREATE TABLE IF NOT EXISTS `application` (
  `id` int(200) NOT NULL,
  `depa` varchar(200) NOT NULL COMMENT 'department id',
  `renter` varchar(200) NOT NULL COMMENT 'user name,should be unique,fetched from another db',
  `contact` varchar(200) DEFAULT NULL,
  `headcount` int(10) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `workContent` varchar(200) DEFAULT NULL,
  `scope` int(20) NOT NULL COMMENT 'application scope, inside or outside the city',
  `address` varchar(200) DEFAULT NULL COMMENT 'specific address of the rented car',
  `status` int(20) NOT NULL COMMENT 'application status',
  `carId` int(200) DEFAULT NULL COMMENT 'the id of rented car',
  `remark` varchar(200) DEFAULT NULL COMMENT 'remark',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` varchar(5) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`id`, `depa`, `renter`, `contact`, `headcount`, `startTime`, `endTime`, `workContent`, `scope`, `address`, `status`, `carId`, `remark`, `createTime`, `isDeleted`) VALUES
(1, '8', '33015296', '13122270965', 1, '2016-12-19 12:02:50', '2016-12-30 12:02:50', '1,2,6,7', 0, '秋涛路', 2, 1, '谢谢', '2016-12-18 12:03:19', 'false'),
(2, '8', '33015296', '13122270965', 1, '2016-12-24 12:05:51', '2016-12-30 12:05:51', '1,2', 1, '安吉', 0, NULL, '哈哈', '2016-12-18 12:06:08', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `application_records`
--

DROP TABLE IF EXISTS `application_records`;
CREATE TABLE IF NOT EXISTS `application_records` (
  `id` int(200) NOT NULL,
  `applicationId` int(200) NOT NULL COMMENT 'id of application',
  `checker` varchar(200) NOT NULL,
  `originalStatus` int(20) DEFAULT NULL,
  `newStatus` int(20) DEFAULT NULL,
  `drt` varchar(10) DEFAULT NULL COMMENT 'direction of status changing. +1 means forward, -1 means backward',
  `remark` varchar(200) DEFAULT NULL COMMENT 'remark when change application status',
  `createTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` varchar(5) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `application_records`
--

INSERT INTO `application_records` (`id`, `applicationId`, `checker`, `originalStatus`, `newStatus`, `drt`, `remark`, `createTime`, `isDeleted`) VALUES
(1, 1, '33010526', 0, 1, '+1', '可以', '2016-12-18 12:04:17', 'false'),
(2, 1, '33016565', 1, 2, '+1', '很好', '2016-12-18 12:05:13', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
CREATE TABLE IF NOT EXISTS `car` (
  `id` int(200) NOT NULL,
  `name` varchar(200) NOT NULL COMMENT 'plate number of car',
  `seats` int(3) NOT NULL COMMENT 'how many seats in a car',
  `remark` varchar(100) DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` varchar(5) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `name`, `seats`, `remark`, `createTime`, `isDeleted`) VALUES
(1, '浙A00001', 5, '测试车辆', '2016-12-18 10:20:10', 'false'),
(2, '浙A0002', 5, '测试2号车', '2016-12-18 10:24:13', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `depa`
--

DROP TABLE IF EXISTS `depa`;
CREATE TABLE IF NOT EXISTS `depa` (
  `id` int(200) NOT NULL,
  `name` varchar(200) NOT NULL COMMENT 'deparment''s name',
  `parentId` int(200) NOT NULL COMMENT 'parent department id, -1 if that is the first level',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` varchar(5) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `depa`
--

INSERT INTO `depa` (`id`, `name`, `parentId`, `createTime`, `isDeleted`) VALUES
(1, '秘书科', -1, '2016-12-09 16:33:20', 'false'),
(2, '科技管理科', -1, '2016-12-09 16:38:11', 'false'),
(3, '安全技术防范管理科', -1, '2016-12-09 16:38:11', 'false'),
(4, '通信勤务保障科', -1, '2016-12-09 16:38:11', 'false'),
(5, '计算机应用管理科', -1, '2016-12-09 16:38:11', 'false'),
(6, '系统运行服务科', -1, '2016-12-09 16:38:11', 'false'),
(7, '网络与信息安全科', -1, '2016-12-09 16:38:11', 'false'),
(8, '领导层', -1, '2016-12-09 17:52:58', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(200) NOT NULL,
  `depa` int(200) NOT NULL COMMENT 'deparment id',
  `level` int(10) NOT NULL COMMENT 'user''s level in his depa, zero is the highest.',
  `name` varchar(200) NOT NULL COMMENT 'user''s name, police number by default',
  `pwd` varchar(200) NOT NULL COMMENT 'password, 12345 initially',
  `realname` varchar(200) NOT NULL COMMENT 'user''s realname',
  `contact` varchar(200) DEFAULT NULL COMMENT 'contact info, usually cellphone number',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` varchar(5) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `depa`, `level`, `name`, `pwd`, `realname`, `contact`, `createTime`, `isDeleted`) VALUES
(1, 8, 0, '33016565', '12345', '许关夫', '13122270965', '2016-12-09 17:55:09', 'false'),
(2, 8, 1, '33014256', '12345', '刘蓝', '13122270965', '2016-12-11 18:02:44', 'false'),
(3, 8, 1, '33010567', '12345', '王卫', '13122270965', '2016-12-11 18:04:06', 'false'),
(4, 8, 1, '33015296', '12345', '吴江宏', '13122270965', '2016-12-11 18:04:06', 'false'),
(5, 1, 0, '33010574', '12345', '秘书科账号', '13122270965', '2016-12-11 18:04:06', 'false'),
(6, 2, 0, '33010484', '12345', '科技管理科账号', '13122270965', '2016-12-11 18:04:06', 'false'),
(7, 3, 0, '33010083', '12345', '安全技术防范管理科账号', '13122270965', '2016-12-11 18:04:06', 'false'),
(8, 4, 0, '33010536', '12345', '通信勤务保障科账号', '13122270965', '2016-12-11 18:04:06', 'false'),
(9, 5, 0, '33010488', '12345', '计算机应用管理科账号', '13122270965', '2016-12-11 18:04:06', 'false'),
(10, 6, 0, '33010542', '12345', '系统运行服务科账号', '13122270965', '2016-12-11 18:04:06', 'false'),
(11, 7, 0, '33010489', '12345', '网络与信息安全科账号', '13122270965', '2016-12-11 18:04:06', 'false'),
(12, 1, 1, '33010526', '12345', '车管员', '18611940752', '2016-12-14 23:02:24', 'false');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `application_records`
--
ALTER TABLE `application_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `depa`
--
ALTER TABLE `depa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `application_records`
--
ALTER TABLE `application_records`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `depa`
--
ALTER TABLE `depa`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
