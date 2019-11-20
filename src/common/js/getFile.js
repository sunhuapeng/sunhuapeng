import axios from 'axios'
import getTalk from './getTalk.js'
export default class GetFiles {
  getFile = null
  fileArr = []
  constructor(tag) {
    this.tag = tag
  }
  init(tag) {
    const context = require.context('../../../static/md', true, /.(md)$/).keys()
    this.getFile = new Promise(resolve => {
      let fileList = []
      let idArr = []
      context.forEach(file => {
        let fil = file.slice(2)
        axios.get(`static/md/${fil}`).then(res => {
          let Item,
            dom = document.createElement('div')
          dom.innerHTML = res.data
          // 标签分为：前端,设计，笔记，小记，美文
          Item = {
            // 文章名称
            name: dom.getElementsByClassName('name')[0].innerHTML ? dom.getElementsByClassName('name')[0].innerHTML : null,
            // 文章标签
            tag: dom.getElementsByClassName('tag')[0].innerHTML ? dom.getElementsByClassName('tag')[0].innerHTML.split('|') : null,
            // 文章作者
            author: dom.getElementsByClassName('author')[0].innerHTML ? dom.getElementsByClassName('author')[0].innerHTML : null,
            // 文章日期
            date: dom.getElementsByClassName('date')[0].innerHTML ? dom.getElementsByClassName('date')[0].innerHTML : null,
            // 文章链接
            reprint: dom.getElementsByClassName('reprint')[0].innerHTML ? dom.getElementsByClassName('reprint')[0].innerHTML : null,
            // 文章简介
            brief: dom.getElementsByClassName('brief')[0].innerHTML ? dom.getElementsByClassName('brief')[0].innerHTML : null,
            // 文章图片
            coverPng: dom.getElementsByClassName('coverPic')[0].innerHTML ? dom.getElementsByClassName('coverPic')[0].innerHTML : null,
            // 文章案例
            case: dom.getElementsByClassName('case')[0] ? dom.getElementsByClassName('case')[0].innerHTML : null,
            id: dom.getElementsByClassName('id')[0] ? dom.getElementsByClassName('id')[0].innerHTML : null,
            fileName: fil
          }
          let talk = new getTalk()
          talk.init(Item.id)
          talk.getTalkCount.then(res=>{
            Item.talkLength = res.length
            // console.log(Item)
            if (tag === Item.tag[0]) {
              fileList.push(Item)
            } else if (!tag) {
              fileList.push(Item)
            }
            fileList.sort((a, b) => {
              return Number(b.date) - Number(a.date)
            })
            resolve(fileList)
          })

        })
      })
    })
  }
}
