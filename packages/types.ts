/**
 * User: CHT
 * Date: 2020/9/25
 * Time: 9:43
 */

export type CustomId = string | number

export type Coordinate = [number, number]

export type ItemMeta = { [key: string]: any }

export interface NodeItem {
  id: CustomId,
  coordinate: Coordinate
  width: number
  height: number
  meta: ItemMeta
}

export interface LinkItem {
  id: CustomId
  start: CustomId
  end: CustomId
  startAt: Coordinate
  endAt: Coordinate
  meta: ItemMeta
}

