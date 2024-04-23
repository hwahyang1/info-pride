/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Song data for wiki.biligame.com/idolypride
 */
export interface TheRootSchema {
  [k: string]: SongInfo;
}
export interface SongInfo {
  name: string;
  slug: string;
  lyricist: string;
  composer: string;
  arranger: string;
  lyrics?: string;
  bvid?: string;
  pid?: string;
  [k: string]: unknown;
}
