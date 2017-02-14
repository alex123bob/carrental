-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2017 at 01:54 AM
-- Server version: 5.6.32
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `carrental`
--

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
  `status` int(20) NOT NULL COMMENT '-1: failed, 0: initial status(ready for admin check), 1: ready for director check, 2: director checked and car is distributed, 3: car is returned back.',
  `carId` int(200) DEFAULT NULL COMMENT 'the id of rented car',
  `remark` varchar(200) DEFAULT NULL COMMENT 'remark',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` varchar(5) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `application`
--

INSERT INTO `application` (`id`, `depa`, `renter`, `contact`, `headcount`, `startTime`, `endTime`, `workContent`, `scope`, `address`, `status`, `carId`, `remark`, `createTime`, `isDeleted`) VALUES
(1, '5', '33010488', '13122270965', 1, '2017-02-06 10:59:59', '2017-02-08 10:59:59', '1,2', 0, 'asdfasdf', 3, 1, 'asdfa', '2017-02-06 11:00:14', 'false'),
(2, '1', '33010574', '13122270965', 3, '2017-02-13 09:54:46', '2017-03-11 14:02:01', '1,2', 0, '秋涛路', 2, 3, '请批准，来自秘书科', '2017-02-12 09:55:31', 'false');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `application_records`
--

INSERT INTO `application_records` (`id`, `applicationId`, `checker`, `originalStatus`, `newStatus`, `drt`, `remark`, `createTime`, `isDeleted`) VALUES
(1, 1, '33010526', 0, 1, '+1', '车馆员同意', '2017-02-06 11:02:47', 'false'),
(2, 1, '33016565', 1, 2, '+1', '局长同意', '2017-02-06 11:03:39', 'false'),
(3, 2, '33010526', 0, 1, '+1', '可以', '2017-02-12 09:55:51', 'false'),
(4, 2, '33016565', 1, 2, '+1', '领导同意', '2017-02-12 09:56:21', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
CREATE TABLE IF NOT EXISTS `car` (
  `id` int(200) NOT NULL,
  `name` varchar(200) NOT NULL COMMENT 'plate number of car',
  `carType` varchar(100) DEFAULT NULL COMMENT 'the type of car, e.g. bus, truck, car.',
  `depaId` int(10) NOT NULL COMMENT 'which bureau the car belongs to. here we classify car by bureau instead of department, all departments in the same bureau could rent cars of their own bureau.',
  `brand` varchar(100) DEFAULT NULL COMMENT 'brand name, like Volkswagen, Audi, BMW',
  `seats` int(3) NOT NULL COMMENT 'how many seats in a car',
  `remark` varchar(100) DEFAULT NULL,
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` varchar(5) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `car`
--

INSERT INTO `car` (`id`, `name`, `carType`, `depaId`, `brand`, `seats`, `remark`, `createTime`, `isDeleted`) VALUES
(1, '浙A00001', '小汽车', 9, '大众', 5, '测试车辆', '2016-12-18 10:20:10', 'false'),
(2, '浙A0002', '轿车', 9, '奥迪', 5, '测试2号车', '2016-12-18 10:24:13', 'false'),
(3, '浙A0003', '轿车', 9, 'mini cooper', 2, '测试用车,mini,my favourite', '2017-01-05 14:28:22', 'false');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `depa`
--

INSERT INTO `depa` (`id`, `name`, `parentId`, `createTime`, `isDeleted`) VALUES
(1, '秘书科', 9, '2016-12-09 16:33:20', 'false'),
(2, '科技管理科', 9, '2016-12-09 16:38:11', 'false'),
(3, '安全技术防范管理科', 9, '2016-12-09 16:38:11', 'false'),
(4, '通信勤务保障科', 9, '2016-12-09 16:38:11', 'false'),
(5, '计算机应用管理科', 9, '2016-12-09 16:38:11', 'false'),
(6, '系统运行服务科', 9, '2016-12-09 16:38:11', 'false'),
(7, '网络与信息安全科', 9, '2016-12-09 16:38:11', 'false'),
(8, '局领导', 9, '2016-12-09 17:52:58', 'false'),
(9, '科技信息化局', -1, '2016-12-28 21:10:33', 'false');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(200) NOT NULL,
  `depa` int(200) NOT NULL COMMENT 'deparment id',
  `level` int(10) NOT NULL COMMENT 'user''s level in his depa, zero is the highest.',
  `leveltitle` varchar(200) DEFAULT NULL COMMENT 'title of specific level',
  `name` varchar(200) NOT NULL COMMENT 'user''s name, police number by default',
  `pwd` varchar(200) NOT NULL COMMENT 'password, 12345 initially',
  `realname` varchar(200) NOT NULL COMMENT 'user''s realname',
  `contact` varchar(200) DEFAULT NULL COMMENT 'contact info, usually cellphone number',
  `officephone` varchar(200) DEFAULT NULL COMMENT 'office phone number',
  `shortnum` varchar(200) DEFAULT NULL COMMENT 'short phone number',
  `email` varchar(200) DEFAULT NULL COMMENT 'email address',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` varchar(5) NOT NULL DEFAULT 'false'
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `depa`, `level`, `leveltitle`, `name`, `pwd`, `realname`, `contact`, `officephone`, `shortnum`, `email`, `createTime`, `isDeleted`) VALUES
(1, 8, 0, NULL, '33016565', '12345', '许关夫', '13122270965', NULL, NULL, NULL, '2016-12-09 17:55:09', 'false'),
(2, 8, 1, NULL, '33014256', '12345', '刘蓝', '13122270965', NULL, NULL, NULL, '2016-12-11 18:02:44', 'false'),
(3, 8, 1, NULL, '33010567', '12345', '王卫', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(4, 8, 1, NULL, '33015296', '12345', '吴江宏', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(5, 1, 0, NULL, '33010574', '12345', '秘书科账号', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(6, 2, 0, NULL, '33010484', '12345', '科技管理科账号', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(7, 3, 0, NULL, '33010083', '12345', '安全技术防范管理科账号', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(8, 4, 0, NULL, '33010536', '12345', '通信勤务保障科账号', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(9, 5, 0, NULL, '33010488', '12345', '计算机应用管理科账号', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(10, 6, 0, NULL, '33010542', '12345', '系统运行服务科账号', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(11, 7, 0, NULL, '33010489', '12345', '网络与信息安全科账号', '13122270965', NULL, NULL, NULL, '2016-12-11 18:04:06', 'false'),
(12, 1, 1, NULL, '33010526', '12345', '车管员', '18611940752', NULL, NULL, NULL, '2016-12-14 23:02:24', 'false'),
(13, 4, 0, NULL, '33010536', '12345', '张菁', '13858017110', NULL, NULL, NULL, '2017-02-13 22:33:22', 'false');

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
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `depa`
--
ALTER TABLE `depa`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
