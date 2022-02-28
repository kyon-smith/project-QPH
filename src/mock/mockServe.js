import Mock from 'mockjs'
import banners from './banners.json'
import floors from './floors.json'

//webpack默认对外暴露：图片，JSON

Mock.mock('/mock/banners',{code:200,data:banners})
Mock.mock('/mock/floors',{code:200,data:floors})