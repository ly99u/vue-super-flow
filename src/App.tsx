/**
 * User: CHT
 * Date: 2020/9/25
 * Time: 9:33
 */
import {Component, Vue} from 'vue-property-decorator'
import SuperFlow from '../packages/SuperFlow'
import {CustomId, LinkItem, NodeItem} from '../packages/types'
import './index.less'

@Component({
  components: {
    SuperFlow
  }
})
export default class App extends Vue {
  nodeList: NodeItem[] = [
    {
      id: 1,
      coordinate: [0, 0],
      width: 150,
      height: 80,
      meta: {
        a: 1,
        b: 2
      }
    },
    {
      id: 2,
      coordinate: [0, 0],
      width: 150,
      height: 80,
      meta: {
        a: 1,
        b: 2
      }
    }
  ]
  linkList: LinkItem[] = [
    {
      id: 11,
      start: 1,
      end: 2,
      startAt: [0, 0],
      endAt: [0, 0],
      meta: {
        a: 1,
        b: 2
      }
    }
  ]
  
  add() {
    this.nodeList.push({
      id: Math.random().toString(32).substring(2),
      coordinate: [0, 0],
      width: 150,
      height: 80,
      meta: {
        a: 1,
        b: 2
      }
    })
  }
  
  remove() {
    this.nodeList.splice(0, 1)
  }
  
  render() {
    return (
      <div class="demo-root">
        <header>
          <button onclick={this.add}>添加</button>
          <button onclick={this.remove}>删除</button>
        </header>
        <super-flow
          nodeList={this.nodeList}
          linkList={this.linkList}
          scopedSlots={
            {
              node: (prop: any) => (
                <div onmousedown={prop.ondrag}>
                  {prop.node.id}
                </div>
              )
            }
          }
        />
      </div>
    )
  }
}
