import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

export type EntityResponse<K = string, T> = {
  [key: typeof K]: T[] | null;
  error: PostgrestError | null;
};
