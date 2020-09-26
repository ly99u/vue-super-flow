/**
 * User: CHT
 * Date: 2020/9/26
 * Time: 11:44
 */
import { Coordinate } from './types'

type Verification = (val: any) => boolean

export const isFun: Verification = val => toRawType(val) === 'function'
export const isBool: Verification = val => toRawType(val) === 'boolean'
export const isUndef: Verification = val => toRawType(val) === 'undefined'
export const isString: Verification = val => toRawType(val) === 'string'
export const isObject: Verification = val => toRawType(val) === 'object'

export function toRawType(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
}

export function getOffset(evt: MouseEvent, element?: Element): Coordinate {
  const {
    clientX,
    clientY
  } = evt
  
  const {
    top = 0,
    left = 0
  } = element?.getBoundingClientRect() || {}
  
  return [
    clientX - left,
    clientY - top
  ]
}

export function uuid(before = '', after = ''): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const charsLen = chars.length
  let uuid = []
  const len = 16
  for (let i = 0; i < len; i++) {
    uuid[i] = chars[0 | Math.random() * charsLen]
  }
  return before + uuid.join('') + after
}


export function addVector(vectorA: Coordinate, vectorB: Coordinate): Coordinate {
  // 向量相加
  return [vectorA[0] + vectorB[0], vectorA[1] + vectorB[1]]
}

export function differ(pointA: Coordinate, pointB: Coordinate): Coordinate {
  // 向量 B - A
  return [pointB[0] - pointA[0], pointB[1] - pointA[1]]
}

export function minus(pointA: Coordinate, pointB: Coordinate): Coordinate {
  // 向量 A - B
  return [pointA[0] - pointB[0], pointA[1] - pointB[1]]
}

export function unitVector(vector: Coordinate): Coordinate {
  // 向量的单位向量
  const m = Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1])
  return [vector[0] / m, vector[1] / m]
}

export function multiply(vector: Coordinate, k: number): Coordinate {
  // 向量的单位向量
  return [vector[0] * k, vector[1] * k]
}

export function dotProduct(vectorA: Coordinate, vectorB: Coordinate): number {
  // 向量点积
  return vectorA[0] * vectorB[0] + vectorA[1] * vectorB[1]
}

export function cross(vectorA: Coordinate, vectorB: Coordinate): number {
  // 向量叉乘
  return vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0]
}

export function angle(vector: Coordinate): number {
  // 向量夹角
  return Math.round(180 / Math.PI * Math.atan2(vector[1], vector[0])) + 180
}

export function equals(vector: Coordinate, target: Coordinate): boolean {
  // 判断向量 x,y 坐标相等
  return vector[0] === target[0] && vector[1] === target[1]
}

export function parallel(vectorA: Coordinate, vectorB: Coordinate): boolean {
  // 判断向量是否平行
  return vectorA[0] * vectorB[1] - vectorA[1] * vectorB[0] === 0
}

export function yAxisEqual(vectorA: Coordinate, vectorB: Coordinate): boolean {
  // 判断 y 轴相等
  return vectorA[1] === vectorB[1]
}

export function xAxisEqual(vectorA: Coordinate, vectorB: Coordinate): boolean {
  // 判断 x 轴相等
  return vectorA[0] === vectorB[0]
}


