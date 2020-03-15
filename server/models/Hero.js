/**
 * 英雄数据模型
 */
const mongoose = require('mongoose')

// 创建英雄集合规则
const heroSchema = new mongoose.Schema({
    // 英雄名称
    name: { type: String },
    // 头像
    avatar: { type: String },
    // 海报
    banner: { type: String },
    // 称号
    title: { type: String },
    // 分类
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    // 评分
    scores: {
        difficult: { type: Number }, // 难度
        skills: { type: Number }, // 技能
        attack: { type: Number }, // 攻击
        survice: { type: Number }, // 生存
    },
    // 技能
    skills: [{
        icon: { type: String },
        name: { type: String },
        delay: { type: String }, // 冷却值
        cost: { type: String }, // 消耗
        description: { type: String },
        tips: { type: String },
    }],
    // 顺风出装
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    // 逆风出装
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    usageTips: { type: String }, // 使用技巧
    battleTips: { type: String }, // 对抗技巧
    teamTips: { type: String }, // 团战思路
    // 英雄关系
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]
})

// 创建英雄结合
const Hero = mongoose.model('Hero', heroSchema, 'heroes')

module.exports = Hero