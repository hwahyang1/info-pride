/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Event ending date, in YYYY/M/DD
 */
export type EndingDate = string;
/**
 * A page in wiki that illustrates the event
 */
export type WikiLink = string;
/**
 * Event starting date, in YYYY/M/DD
 */
export type StartingDate = string;
/**
 * The title of this event
 */
export type EventTitle = string;
/**
 * The type of this event
 */
export type EventType =
  | "通常卡池"
  | "限定卡池"
  | "复刻卡池"
  | "定例活动"
  | "links活动"
  | "VENUS对战"
  | "VENUS赛事活动"
  | "联合对战"
  | "摄影活动"
  | "愚人节"
  | "私信任务活动"
  | "合宿活动"
  | "multi links活动"
  | "VENUS联赛";
/**
 * Each YYYY/MM in the calendar.
 */
export type CalendarMonth = CalendarItem[];

/**
 * Calendar data for wiki.biligame.com/idolypride
 */
export interface TheRootSchema {
  tb: TheTable;
}
/**
 * The container of the data.
 */
export interface TheTable {
  [k: string]: CalendarMonth;
}
/**
 * An calendar item
 */
export interface CalendarItem {
  end: EndingDate;
  link?: WikiLink;
  start: StartingDate;
  title: EventTitle;
  type: EventType;
}
