import axios from 'axios'
export default class getTalk {
  constructor() {}
  getTalkCount = null
  init(id) {
    let params = {
      client_id: "0b1f628009d15179d27f",
      client_secret: "69b877da8d038a42dccca8ac2dd6b214b2956abe",
      labels: "Gitalk," + id,
      t: "1574170039411"
    };
    this.getTalkCount = new Promise(resolve => {
      axios.get(
        `https://api.github.com/repos/sunhuapeng/sunhuapeng.github.io/issues`,
        JSON.stringify(params)
      ).then(res => {
        let data = res.data
        // console.log(data)
        data.forEach(chil => {
          let talkParams = {
            client_id: "0b1f628009d15179d27f",
            client_secret: "69b877da8d038a42dccca8ac2dd6b214b2956abe"
          };
          axios.get(`https://api.github.com/repos/sunhuapeng/sunhuapeng.github.io/issues/${chil.number}/comments`, JSON.stringify(talkParams)).then(re => {
            resolve(re.data)
          })
        });
      });
    })
  }
}
