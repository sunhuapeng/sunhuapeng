import axios from 'axios'
const context = require.context('../../../static/md', true, /.(md)$/).keys()
var getFile = new Promise(resolve => {
  let fileList = []
  context.forEach(file => {
    let fil = file.slice(2)
    axios.get(`static/md/${fil}`).then(res => {
      let Item,
        dom = document.createElement('div')
      dom.innerHTML = res.data
      Item = {
        // 文章名称
        name: dom.getElementsByClassName('name')[0].innerHTML?dom.getElementsByClassName('name')[0].innerHTML:null,
        // 文章标签
        tag: dom.getElementsByClassName('tag')[0].innerHTML?dom.getElementsByClassName('tag')[0].innerHTML:null,
        // 文章作者
        author: dom.getElementsByClassName('author')[0].innerHTML?dom.getElementsByClassName('author')[0].innerHTML:null,
        // 文章日期
        date: dom.getElementsByClassName('date')[0].innerHTML?dom.getElementsByClassName('date')[0].innerHTML:null,
        // 文章链接
        reprint: dom.getElementsByClassName('reprint')[0].innerHTML?dom.getElementsByClassName('reprint')[0].innerHTML:null,
        // 文章简介
        brief: dom.getElementsByClassName('brief')[0].innerHTML?dom.getElementsByClassName('brief')[0].innerHTML:null,
        // 文章图片
        coverPng: dom.getElementsByClassName('coverPic')[0].innerHTML?dom.getElementsByClassName('coverPic')[0].innerHTML:null,
        // 文章案例
        case: dom.getElementsByClassName('case')[0].innerHTML?dom.getElementsByClassName('case')[0].innerHTML:null,
        fileName:fil
      }
      if(Item.brief.length>60){
        Item.brief = Item.brief.slice(0,59) + '...'
      }
      fileList.push(Item)
      fileList.sort((a,b)=>{
        return Number(b.date) - Number(a.date)
      })
      resolve(fileList)
    })
  })
})
export default {
  fileList: getFile
}
