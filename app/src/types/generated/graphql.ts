import { Upload } from '../scalars';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Latitude: any;
  Longitude: any;
  URL: any;
  Upload: Upload;
};


export type GeoPoint = {
  __typename?: 'GeoPoint';
  latitude: Scalars['Latitude'];
  longitude: Scalars['Longitude'];
};



export type Me = Node & {
  __typename?: 'Me';
  id: Scalars['ID'];
  spots: Array<Spot>;
};

export type Mutation = {
  __typename?: 'Mutation';
  spotAdd: SpotAddPayload;
};


export type MutationSpotAddArgs = {
  input: SpotAddInput;
  file: Scalars['Upload'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Me>;
};

export type Spot = Node & {
  __typename?: 'Spot';
  id: Scalars['ID'];
  title: Scalars['String'];
  imageURL: Scalars['URL'];
  createdDate: Scalars['Date'];
  deletedDate?: Maybe<Scalars['Date']>;
  archivedDate?: Maybe<Scalars['Date']>;
  authorID: Scalars['ID'];
  author: User;
  geoPoint: GeoPoint;
};

export type SpotAddInput = {
  title: Scalars['String'];
};

export type SpotAddPayload = {
  __typename?: 'SpotAddPayload';
  uploadedFile: UploadedFile;
  spot: Spot;
};



export type UploadedFile = {
  __typename?: 'UploadedFile';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
  url: Scalars['URL'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Date: ResolverTypeWrapper<Partial<Scalars['Date']>>;
  GeoPoint: ResolverTypeWrapper<Partial<GeoPoint>>;
  Latitude: ResolverTypeWrapper<Partial<Scalars['Latitude']>>;
  Longitude: ResolverTypeWrapper<Partial<Scalars['Longitude']>>;
  Me: ResolverTypeWrapper<Partial<Me>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Me'] | ResolversTypes['Spot'] | ResolversTypes['User'];
  Query: ResolverTypeWrapper<{}>;
  Spot: ResolverTypeWrapper<Partial<Spot>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  SpotAddInput: ResolverTypeWrapper<Partial<SpotAddInput>>;
  SpotAddPayload: ResolverTypeWrapper<Partial<SpotAddPayload>>;
  URL: ResolverTypeWrapper<Partial<Scalars['URL']>>;
  Upload: ResolverTypeWrapper<Partial<Scalars['Upload']>>;
  UploadedFile: ResolverTypeWrapper<Partial<UploadedFile>>;
  User: ResolverTypeWrapper<Partial<User>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Date: Partial<Scalars['Date']>;
  GeoPoint: Partial<GeoPoint>;
  Latitude: Partial<Scalars['Latitude']>;
  Longitude: Partial<Scalars['Longitude']>;
  Me: Partial<Me>;
  ID: Partial<Scalars['ID']>;
  Mutation: {};
  Node: ResolversParentTypes['Me'] | ResolversParentTypes['Spot'] | ResolversParentTypes['User'];
  Query: {};
  Spot: Partial<Spot>;
  String: Partial<Scalars['String']>;
  SpotAddInput: Partial<SpotAddInput>;
  SpotAddPayload: Partial<SpotAddPayload>;
  URL: Partial<Scalars['URL']>;
  Upload: Partial<Scalars['Upload']>;
  UploadedFile: Partial<UploadedFile>;
  User: Partial<User>;
  Boolean: Partial<Scalars['Boolean']>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type GeoPointResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GeoPoint'] = ResolversParentTypes['GeoPoint']> = ResolversObject<{
  latitude?: Resolver<ResolversTypes['Latitude'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Longitude'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface LatitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Latitude'], any> {
  name: 'Latitude';
}

export interface LongitudeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Longitude'], any> {
  name: 'Longitude';
}

export type MeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  spots?: Resolver<Array<ResolversTypes['Spot']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  spotAdd?: Resolver<ResolversTypes['SpotAddPayload'], ParentType, ContextType, RequireFields<MutationSpotAddArgs, 'input' | 'file'>>;
}>;

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Me' | 'Spot' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
}>;

export type SpotResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Spot'] = ResolversParentTypes['Spot']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageURL?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  archivedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  authorID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  geoPoint?: Resolver<ResolversTypes['GeoPoint'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotAddPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SpotAddPayload'] = ResolversParentTypes['SpotAddPayload']> = ResolversObject<{
  uploadedFile?: Resolver<ResolversTypes['UploadedFile'], ParentType, ContextType>;
  spot?: Resolver<ResolversTypes['Spot'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UploadedFileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UploadedFile'] = ResolversParentTypes['UploadedFile']> = ResolversObject<{
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Date?: GraphQLScalarType;
  GeoPoint?: GeoPointResolvers<ContextType>;
  Latitude?: GraphQLScalarType;
  Longitude?: GraphQLScalarType;
  Me?: MeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Spot?: SpotResolvers<ContextType>;
  SpotAddPayload?: SpotAddPayloadResolvers<ContextType>;
  URL?: GraphQLScalarType;
  Upload?: GraphQLScalarType;
  UploadedFile?: UploadedFileResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

