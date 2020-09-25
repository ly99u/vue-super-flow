/**
 * User: CHT
 * Date: 2020/9/25
 * Time: 9:26
 */

import Vue from 'vue'
import {
  Component,
  Prop,
  Watch
} from 'vue-property-decorator'

import FlowNode from './FlowNode'
import FlowLink from './FlowLink'

import {
  CustomId,
  LinkItem,
  NodeItem,
  Coordinate
} from './types'

import './index.less'

@Component({
  name: 'SuperFlow',
  components: {
    FlowNode,
    FlowLink
  }
})
export default class SuperFlow extends Vue {
  @Prop({default: () => [0, 0]}) origin!: Coordinate
  @Prop({default: () => []}) nodeList!: NodeItem[]
  @Prop({default: () => []}) linkList!: LinkItem[]
  
  nodeMap = new Map<CustomId, NodeItem>()
  
  created() {
    this.convertNodeMap()
  }
  
  mounted() {
  
  }
  
  @Watch('nodeList')
  protected convertNodeMap() {
    const nodeMap = new Map<CustomId, NodeItem>()
    this.nodeList.forEach(node => nodeMap.set(node.id, node))
    this.nodeMap = nodeMap
  }
  
  protected render() {
    return (
      <div class="super-flow">
        {
          this.nodeList.map(node => (
            <flow-node
              origin={this.origin}
              key={node.id}
              coordinate={node.coordinate}
              width={node.width}
              height={node.height}
              meta={node.meta}
              scopedSlots={
                {
                  default: (prop: any) => (
                    this.$scopedSlots.node
                      ? this.$scopedSlots.node({
                        node,
                        ondrag: prop.ondrag
                      })
                      : undefined
                  )
                }
              }>
            </flow-node>
          ))
        }
        {
          this.linkList.map(link => (
            <flow-link
              origin={this.origin}
              key={link.id}
              start={this.nodeMap.get(link.start)}
              end={this.nodeMap.get(link.end)}
              startAt={link.startAt}
              endAt={link.endAt}
              meta={link.meta}
            />
          ))
        }
      </div>
    )
  }
}
