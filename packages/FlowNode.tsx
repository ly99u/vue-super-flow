/**
 * User: CHT
 * Date: 2020/9/26
 * Time: 9:54
 */
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Coordinate, ItemMeta } from './types'
import { addVector, minus } from './utils'

@Component({name: 'FlowNode'})
export default class FlowNode extends Vue {
  readonly $el!: HTMLDivElement
  
  @Prop() origin!: Coordinate
  @Prop() coordinate!: Coordinate
  @Prop() meta!: ItemMeta
  @Prop() width!: number
  @Prop() height!: number
  
  get position(): Coordinate {
    return addVector(this.coordinate, this.origin)
  }
  
  created() {}
  
  render() {
    return (
      <div
        class="super-flow__node"
        style={
          {
            position: 'absolute',
            left: `${this.position[0]}px`,
            top: `${this.position[1]}px`
          }
        }>
        {
          this.$slots.default
        }
      </div>
    )
  }
}
