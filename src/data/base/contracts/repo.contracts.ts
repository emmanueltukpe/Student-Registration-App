import {
  ClientSession,
  UnpackedIntersection,
  Document,
  IfAny,
  Require_id,
  SortOrder
} from 'mongoose';

export interface QueryResult<T> {
  page: number;
  per_page: number;
  total: number;
  filter_total: number;
  total_pages: number;
  sort: string | { [key: string]: SortOrder | { $meta: 'textScore' } };
  result: T[];
}

/**
 * A repository query that specifies pagination options
 */
export interface PaginationQuery {
  query?: any;
  page?: number;
  per_page?: number;
  projections?: any;
  populations?: any;
  sort?: string | { [key: string]: SortOrder | { $meta: 'textScore' } };
}

/**
 * A repository query
 */
export interface Query {
  query: any;
  projections?: any;
  populations?: any;
  session?: ClientSession;
  sort?: string | { [key: string]: SortOrder | { $meta: 'textScore' } };
}

export interface SelectOptions {
  projections?: any;
  populations?: any;
}

export interface Repository<T> {
  create(attributes: T): Promise<T>;
  createMany(attributes: T[], session: ClientSession): Promise<T[]>;
  byID(
    id: string,
    opts: SelectOptions
  ): Promise<
    UnpackedIntersection<
      IfAny<T, any, Document<unknown, {}, T> & Omit<Require_id<T>, never>>,
      {}
    >
  >;
  byQuery(
    query: any,
    opts: SelectOptions
  ): Promise<
    UnpackedIntersection<
      IfAny<T, any, Document<unknown, {}, T> & Omit<Require_id<T>, never>>,
      {}
    >
  >;
  getPaged(query: PaginationQuery): Promise<QueryResult<T>>;
  get(query: Query): Promise<T[]>;
  update(condition: string | object, update: any): Promise<T>;
  updateAll(condition: string | object, update: any): Promise<T[]>;
  remove(condition: string | object): Promise<T>;
  destroy(condition: string | object): Promise<T>;
}
