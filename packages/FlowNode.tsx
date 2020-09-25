/**
 * User: CHT
 * Date: 2020/9/25
 * Time: 9:54
 */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {
  Coordinate,
  ItemMeta
} from './types'
import {getOffset} from './utils'

@Component({name: 'FlowNode'})
export default class FlowNode extends Vue {
  readonly $el!: HTMLDivElement
  
  @Prop() origin!: Coordinate
  @Prop() coordinate!: Coordinate
  @Prop() meta!: ItemMeta
  @Prop() width!: number
  @Prop() height!: number
  
  isDrag: boolean = false
  isMove: boolean = false
  
  get position() {
    return
  }
  
  created() {
  }
  
  mounted() {
    document.addEventListener('mousemove', this.move)
    document.addEventListener('mouseup', this.up)
    this.$once('hook:beforeDestory', () => {
      document.removeEventListener('mousemove', this.move)
      document.removeEventListener('mouseup', this.up)
    })
  }
  
  up(): void {
  
  }
  
  move(evt: MouseEvent): void {
    if(this.isDrag) {
    
    }
  }
  
  ondrag(evt: MouseEvent): void {
    const [top, left] = getOffset(evt, this.$el)
    this.isDrag = true
  }
  
  render() {
    return (
      <div
        style={
          {
            position: 'absolute',
            width: `${this.width}px`,
            height: `${this.height}px`
          }
        }
        class="super-flow__node">
        {
          this.$scopedSlots.default
            ? this.$scopedSlots.default({
              ondrag: this.ondrag
            })
            : undefined
        }
      </div>
    )
  }
}
