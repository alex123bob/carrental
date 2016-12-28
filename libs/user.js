'use strict';

const
    conn = require('../libs/pool');

let
    arr = [
        {
            id: 9,
            name: '科技信息化局',
            depas: [
                {
                    id: 1,
                    name: '秘书科',
                    members: [
                        {
                            level: 0,
                            levelRealname: '科长'
                        },
                        {
                            level: 1,
                            levelRealname: '车管员'
                        }
                    ]
                },
                {
                    id: 2,
                    name: '科技管理科',
                    members: [
                        {
                            level: 0,
                            levelRealname: '科长'
                        },
                        {
                            level: 1,
                            levelRealname: '科员'
                        }
                    ]
                },
                {
                    id: 3,
                    name: '安全技术防范管理科',
                    members: [
                        {
                            level: 0,
                            levelRealname: '科长'
                        },
                        {
                            level: 1,
                            levelRealname: '科员'
                        }
                    ]
                },
                {
                    id: 4,
                    name: '通信勤务保障科',
                    members: [
                        {
                            level: 0,
                            levelRealname: '科长'
                        },
                        {
                            level: 1,
                            levelRealname: '科员'
                        }
                    ]
                },
                {
                    id: 5,
                    name: '计算机应用管理科',
                    members: [
                        {
                            level: 0,
                            levelRealname: '科长'
                        },
                        {
                            level: 1,
                            levelRealname: '科员'
                        }
                    ]
                },
                {
                    id: 6,
                    name: '系统运行服务科',
                    members: [
                        {
                            level: 0,
                            levelRealname: '科长'
                        },
                        {
                            level: 1,
                            levelRealname: '科员'
                        }
                    ]
                },
                {
                    id: 7,
                    name: '秘书科',
                    members: [
                        {
                            level: 0,
                            levelRealname: '科长'
                        },
                        {
                            level: 1,
                            levelRealname: '车管员'
                        }
                    ]
                },
                {
                    id: 8,
                    name: '网络与信息安全科',
                    members: [
                        {
                            level: 0,
                            levelRealname: '科长'
                        },
                        {
                            level: 1,
                            levelRealname: '科员'
                        }
                    ]
                },
                {
                    id: 8,
                    name: '领导层',
                    members: [
                        {
                            level: 0,
                            levelRealname: '局长'
                        },
                        {
                            level: 1,
                            levelRealname: '副局长'
                        }
                    ]
                }
            ]
        }
    ],
    user = {
        // obj consists depa and level fields.
        isAdmin: (obj) => {
            return obj.depa == '1' && obj.level == '1';
        },
        // determine if this person could do the director checking.
        isDirector: (obj) => {
            return obj.depa == '8' && obj.level == '0';
        },
        // obj: depa, level; both of them are in the type of id
        find: (obj) => {
            let packet = {},
                sql = "select * from depa where id = " + obj.depa;
            conn.getConnection((error, connection) => {
                conn.query(sql, (err, rows, fields) => {
                    let rec = rows[0],
                        bureau = rec.parentId;
                    arr.forEach((b, i) => {
                        if (b.id == bureau) {
                            packet.bureauId = b.id;
                            packet.bureauRealname = b.name;
                            b.depas.forEach((item, index, self) => {
                                if (item.id == obj.depa) {
                                    packet.depaId = item.id;
                                    packet.depaRealname = item.name;
                                    item.members.forEach((item, index, self) => {
                                        if (item.level == obj.level) {
                                            packet.level = item.level;
                                            packet.levelRealname = item.levelRealname;
                                            return false;
                                        }
                                    });
                                    return false;
                                }
                            });
                            return false;
                        }
                    });
                });
            });
            return packet;
        },

    };


module.exports = user;