import {PostgrestError} from '@supabase/postgrest-js/dist/module/types';

export type EntityListResponse<K = string, T> = {
  [key: typeof K]: T[] | null;
  error: PostgrestError | null;
};
export type EntityResponse<K = string, T> = {
  [key: typeof K]: T | null;
  error: PostgrestError | null;
};

export type EntityWithUserToUpdate<T> = Omit<T, 'user_id'>;
