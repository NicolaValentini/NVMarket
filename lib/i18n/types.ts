import { i18n } from './config';
import { en } from './dictionaries';

export type Dictionary = typeof en;

export type Locale = (typeof i18n)['locales'][number];
