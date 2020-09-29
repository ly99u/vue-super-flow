/**
 * User: CHT
 * Date: 2020/9/26
 * Time: 9:43
 */

export type CustomId = string | number

export type Coordinate = [number, number]

export type ItemMeta = { [key: string]: any }

export interface NodeItem {
  id: CustomId,
  coordinate: Coordinate
  meta: ItemMeta
  
  [key: string]: any
}

export interface LinkItem {
  id: CustomId
  start: CustomId | null
  end: CustomId | null
  startAt: Coordinate
  endAt: Coordinate
  meta: ItemMeta,
  
  [key: string]: any
}

export interface SuperFlowSlotNodeProps {
  node: NodeItem,
  linkOutput: (link: LinkItem) => void
  linkEntry: (endAt: Coordinate) => void
  ondrag: (evt: MouseEvent) => void
}
