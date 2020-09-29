/**
 * User: CHT
 * Date: 2020/9/26
 * Time: 9:33
 */
import { Vue, Component } from 'vue-property-decorator'
import { LinkItem, NodeItem, SuperFlowSlotNodeProps } from '../packages/types'
import SuperFlow from '../packages/SuperFlow'
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
      meta: {
        a: 1,
        b: 2
      }
    },
    {
      id: 2,
      coordinate: [0, 0],
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
          123
        </header>
        <super-flow
          nodeList={this.nodeList}
          linkList={this.linkList}
          scopedSlots={
            {
              node: (prop: SuperFlowSlotNodeProps) => (
                <template>
                  <div
                    class="node-content"
                    onmousedown={prop.ondrag}>
                    {prop.node.id}
                  </div>
                  
                </template>
              )
            }
          }
        />
      </div>
    )
  }
}
