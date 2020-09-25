/**
 * User: CHT
 * Date: 2020/9/25
 * Time: 10:08
 */
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
import {Coordinate, NodeItem, CustomId, ItemMeta} from './types'

@Component({name: 'FlowLink'})
export default class FlowLink extends Vue {
  @Prop() origin!: Coordinate
  @Prop() start!: NodeItem | undefined | null
  @Prop() end!: NodeItem | undefined | null
  @Prop() startAt!: Coordinate
  @Prop() endAt!: Coordinate
  @Prop() meta!: ItemMeta
  
  render() {
    return (
      <canvas>
      
      </canvas>
    )
  }
}
