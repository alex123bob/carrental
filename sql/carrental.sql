-- phpMyAdmin SQL Dump
-- version 4.3.9
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2017 at 06:49 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `depa`, `level`, `leveltitle`, `name`, `pwd`, `realname`, `contact`, `officephone`, `shortnum`, `email`, `createTime`, `isDeleted`) VALUES
(1, 8, 0, NULL, '33016565', '12345', '许关夫', '536658', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(2, 8, 1, NULL, '33014256', '12345', '刘蓝', '532222', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(3, 8, 1, NULL, '33010567', '12345', '王卫', '530204', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(4, 8, 1, NULL, '33015296', '12345', '吴江宏', '612134', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(5, 1, 0, NULL, '33010574', '12345', '裘韬', '530139', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(6, 1, 1, NULL, '33010558', '12345', '寿琳洁', '530121', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(7, 1, 1, NULL, '33010555', '12345', '杨蕾', '530306', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(8, 1, 1, NULL, '33010526', '12345', '王强', '530155', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(9, 1, 1, NULL, '33010551', '12345', '陈啸', '530120', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(10, 1, 1, NULL, '33116387', '12345', '陈国璋', '716332', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(11, 2, 0, NULL, '33010484', '12345', '周春燕', '530086', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(12, 2, 1, NULL, '33013562', '12345', '高建国', '527353', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(13, 2, 1, NULL, '33015948', '12345', '胡华瑜', '575759', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(14, 2, 1, NULL, '33010568', '12345', '冯吉萌', '530208', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(15, 2, 1, NULL, '33010486', '12345', '姚一鸣', '526739', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(16, 2, 1, NULL, '33115280', '12345', '王飞', '711665', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(17, 3, 0, NULL, '33010083', '12345', '胡彦', '530111', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(18, 3, 1, NULL, '33016405', '12345', '郑俊', '569000', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(19, 3, 1, NULL, '33114324', '12345', '钟毅', '530378', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(20, 3, 1, NULL, '33113842', '12345', '金梦珺', '575949', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(21, 3, 1, NULL, 'Rm015797', '12345', '徐波', '530318', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(22, 4, 0, NULL, '33010536', '12345', '张菁', '530300', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(23, 4, 1, NULL, '33015456', '12345', '钟尚忠', '535101', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(24, 4, 1, NULL, '010545', '12345', '程金林', '530123', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(25, 4, 1, NULL, '33010535', '12345', '邹伯成', '530313', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(26, 4, 1, NULL, '33010561', '12345', '李靖', '530070', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(27, 4, 1, NULL, '33113833', '12345', '章悦', '578469', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(28, 4, 1, NULL, '115814', '12345', '郎一萍', '717676', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(29, 4, 1, NULL, '33116036', '12345', '张江', '719399', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(30, 5, 0, NULL, '33010488', '12345', '秦旭东', '530091', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(31, 5, 1, NULL, '33010571', '12345', '何琦春', '530321', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(32, 5, 1, NULL, '33010560', '12345', '李婷', '530397', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(33, 5, 1, NULL, '33113581', '12345', '周凌鹏', '710256', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(34, 5, 1, NULL, '33115217', '12345', '华晓阳', '551717', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(35, 5, 1, NULL, '114243', '12345', '刘斐', '710829', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(36, 5, 1, NULL, '114251', '12345', '张旭东', '710866', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(37, 5, 1, NULL, '33116044', '12345', '黄冰倩', '719398', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(38, 6, 0, NULL, '33010542', '12345', '黄海鹰', '13858090331', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(39, 6, 1, NULL, '33010485', '12345', '陈宇', '13858012170', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(40, 6, 1, NULL, '33010483', '12345', '聂汉军', '13588070367', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(41, 6, 1, NULL, '33010534', '12345', '俞健', '13819179801', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(42, 6, 1, NULL, '33114812', '12345', '虞蕾', '13656690123', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(43, 6, 1, NULL, 'Rm015884', '12345', '胡昕', '15355030420', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(44, 6, 1, NULL, 'Rm015885', '12345', '许露', '13819179330', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(45, 6, 1, NULL, 'Rm015886', '12345', '孙颖', '13858028513', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(46, 6, 1, NULL, 'Rm015887', '12345', '章丽蓉', '13958179836', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(47, 6, 1, NULL, 'Rm015888', '12345', '童勤', '13738030502', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(48, 6, 1, NULL, 'Rm015889', '12345', '任碧菁', '13857110812', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(49, 6, 1, NULL, 'TEMP9966', '12345', '汤莉', '13588170654', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(50, 6, 1, NULL, 'Rm015891', '12345', '黄晓晶', '13906712307', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(51, 6, 1, NULL, 'Rm015893', '12345', '李晨', '13989897531', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(52, 6, 1, NULL, 'Rm015894', '12345', '郭小琪', '13588175171', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(53, 6, 1, NULL, 'Rm015897', '12345', '倪佳琪', '13738198480', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(54, 6, 1, NULL, 'Rm015895', '12345', '刘雁', '18258890136', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(55, 6, 1, NULL, 'Rm015898', '12345', '蔡嫣妮', '13857112389', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(56, 6, 1, NULL, 'Rm015899', '12345', '沈丹丹', '13758100147', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(57, 6, 1, NULL, 'Rm015900', '12345', '李敏劼', '15858221847', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(58, 6, 1, NULL, 'Rm710786', '12345', '徐莹', '13606635582', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(59, 6, 1, NULL, 'RM015999', '12345', '葛慧伶', '13175105229', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(60, 7, 0, NULL, '33010489', '12345', '赵宇', '530092', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(61, 7, 1, NULL, '33110790', '12345', '庞若蔚', '530113', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(62, 7, 1, NULL, '33010548', '12345', '傅光英', '530119', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false'),
(63, 7, 1, NULL, '33113727', '12345', '吴泉功', '535347', NULL, NULL, NULL, '2017-02-14 14:48:32', 'false');

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
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=64;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
