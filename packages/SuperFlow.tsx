/**
 * User: CHT
 * Date: 2020/9/26
 * Time: 9:26
 */

import {
  Vue,
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
  Coordinate,
  SuperFlowSlotNodeProps
} from './types'

import { addVector, minus, multiply, uuid } from './utils'
import { ScopedSlotChildren } from 'vue/types/vnode'

@Component({
  name: 'SuperFlow',
  components: {
    FlowNode,
    FlowLink
  }
})
export default class SuperFlow extends Vue {
  readonly $el!: HTMLDivElement
  readonly $scopedSlots!: {
    node: (prop: SuperFlowSlotNodeProps) => ScopedSlotChildren
  }
  
  @Prop({default: 1}) zoom!: number
  @Prop({default: () => [0, 0]}) origin!: Coordinate
  @Prop({default: () => []}) nodeList!: NodeItem[]
  @Prop({default: () => []}) linkList!: LinkItem[]
  
  
  nodeMap = new Map<CustomId, NodeItem>()
  private isDrag: boolean = false
  private isMove: boolean = false
  private isLinking: boolean = false
  private dragNode: NodeItem | null = null
  private templateLink: LinkItem | null = null
  
  // Update when mousedown.
  private mousedownPosition: Coordinate = [0, 0]
  // Update when mousedown.
  private mousedownCoordinate: Coordinate = [0, 0]
  
  
  protected created() {
    this.convertNodeMap()
  }
  
  protected mounted() {
    document.addEventListener('mousemove', this.move)
    document.addEventListener('mouseup', this.up)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('mousemove', this.move)
      document.removeEventListener('mouseup', this.up)
    })
  }
  
  protected move(evt: MouseEvent) {
    if (this.isDrag && this.dragNode) {
      this.moveNode(evt)
    }
  }
  
  protected moveNode(evt: MouseEvent) {
    if (this.isMove) {
      const coordinate = addVector(this.mousedownCoordinate, this.deviation(evt))
      this.dragNode!.coordinate.splice(0, this.dragNode!.coordinate.length, ...coordinate)
    } else {
      const [left, top] = this.deviation(evt)
      this.isMove = Math.sqrt(Math.pow(left, 2) + Math.pow(top, 2)) > 5
    }
  }
  
  protected up() {
    this.isLinking = false
    this.templateLink = null
    this.isDrag = false
    this.dragNode = null
    this.isMove = false
    this.$el.style.userSelect = 'auto'
  }
  
  
  // Get the vector difference between the original coordinates and the current coordinates.
  protected deviation(evt: MouseEvent): Coordinate {
    return multiply(
      minus([evt.clientX, evt.clientY], this.mousedownPosition),
      1 / this.zoom
    )
  }
  
  // Called when mousedown.
  protected ondrag(evt: MouseEvent, node: NodeItem, idx: number): void {
    const nodeListLastIndex = this.nodeList.length - 1
    this.isDrag = true
    this.dragNode = node
    this.mousedownCoordinate = [...node.coordinate]
    this.mousedownPosition = [evt.clientX, evt.clientY]
    this.nodeList.splice(
      nodeListLastIndex,
      1,
      ...this.nodeList.splice(idx, 1)
    )
    this.$el.style.userSelect = 'none'
  }
  
  protected linkEntry(endAt: Coordinate): void {
  
  }
  
  protected linkOutput(evt: MouseEvent, link: LinkItem) : void {
    this.templateLink = link
    evt.stopPropagation()
    evt.preventDefault()
  }
  
  @Watch('nodeList')
  protected convertNodeMap() {
    const nodeMap = new Map<CustomId, NodeItem>()
    this.nodeList.forEach(node => nodeMap.set(node.id, node))
    this.nodeMap = nodeMap
  }
  
  protected render() {
    const tempLink = this.templateLink
    return (
      <div
        style={
          {
            position: 'relative',
            transformOrigin: `${this.origin.join(' ')}`,
            transform: `scale(${this.zoom})`
          }
        }
        class="super-flow">
        {
          this.linkList.map(link => (
            <flow-link
              origin={this.origin}
              key={link.id}
              start={link.start ? this.nodeMap.get(link.start) : null}
              end={link.end ? this.nodeMap.get(link.end) : null}
              startAt={link.startAt}
              endAt={link.endAt}
              meta={link.meta}
            />
          ))
        }
        {
          this.isLinking && tempLink ? (
            <flow-link
              origin={this.origin}
              key={tempLink.id}
              start={tempLink.start ? this.nodeMap.get(tempLink.start) : null}
              end={tempLink.end ? this.nodeMap.get(tempLink.end) : null}
              startAt={tempLink.startAt}
              endAt={tempLink.endAt}
              meta={tempLink.meta}
            />
          ) : undefined
        }
        {
          this.nodeList.map((node, idx) => (
            <flow-node
              origin={this.origin}
              key={node.id}
              coordinate={node.coordinate}
              meta={node.meta}>
              {
                this.$scopedSlots.node
                  ? this.$scopedSlots.node({
                    node,
                    linkOutput: this.linkOutput,
                    linkEntry: this.linkEntry,
                    ondrag: (evt: MouseEvent) => this.ondrag(evt, node, idx)
                  })
                  : undefined
              }
            </flow-node>
          ))
        }
      </div>
    )
  }
}
