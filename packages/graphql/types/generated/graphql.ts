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
  Latitude: number;
  Longitude: number;
  URL: any;
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
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  spotAdd: SpotAddPayload;
};


export type MutationSpotAddArgs = {
  input: SpotAddInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Me>;
  spot: Spot;
  spots: Array<Spot>;
};


export type QuerySpotArgs = {
  id: Scalars['ID'];
};


export type QuerySpotsArgs = {
  maxLatitude: Scalars['Latitude'];
  maxLongitude: Scalars['Longitude'];
  minLatitude: Scalars['Latitude'];
  minLongitude: Scalars['Longitude'];
};

/**
 * ResizedSpotImageURLs container of resized image URLs on Cloud Functions
 * All of these properties are optional because they are determined asynchronously.
 * Also, the newly added ResizedImageURL type will be null.
 */
export type ResizedSpotImageUrLs = {
  __typename?: 'ResizedSpotImageURLs';
  thumbnail?: Maybe<Scalars['URL']>;
};

/**
 * ResizedUserProfileImageURLs container of resized image URLs on Cloud Functions
 * All of these properties are optional because they are determined asynchronously.
 * Also, the newly added ResizedImageURL type will be null.
 */
export type ResizedUserProfileImageUrLs = {
  __typename?: 'ResizedUserProfileImageURLs';
  thumbnail?: Maybe<Scalars['URL']>;
};

export type Spot = Node & {
  __typename?: 'Spot';
  archivedDate?: Maybe<Scalars['Date']>;
  author: User;
  authorID: Scalars['ID'];
  createdDate: Scalars['Date'];
  deletedDate?: Maybe<Scalars['Date']>;
  geoPoint: GeoPoint;
  id: Scalars['ID'];
  imageURL: Scalars['URL'];
  resizedSpotImageURLs: ResizedSpotImageUrLs;
  title: Scalars['String'];
};

export type SpotAddInput = {
  id?: Maybe<Scalars['ID']>;
  imageURL: Scalars['URL'];
  latitude: Scalars['Latitude'];
  longitude: Scalars['Longitude'];
  title: Scalars['String'];
};

export type SpotAddPayload = {
  __typename?: 'SpotAddPayload';
  spot: Spot;
};

export type User = Node & {
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  profileImageURL?: Maybe<Scalars['URL']>;
  resizedProfileImageURLs: ResizedUserProfileImageUrLs;
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
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  Date: ResolverTypeWrapper<Partial<Scalars['Date']>>;
  GeoPoint: ResolverTypeWrapper<Partial<GeoPoint>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  Latitude: ResolverTypeWrapper<Partial<Scalars['Latitude']>>;
  Longitude: ResolverTypeWrapper<Partial<Scalars['Longitude']>>;
  Me: ResolverTypeWrapper<Partial<Me>>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Me'] | ResolversTypes['Spot'] | ResolversTypes['User'];
  Query: ResolverTypeWrapper<{}>;
  ResizedSpotImageURLs: ResolverTypeWrapper<Partial<ResizedSpotImageUrLs>>;
  ResizedUserProfileImageURLs: ResolverTypeWrapper<Partial<ResizedUserProfileImageUrLs>>;
  Spot: ResolverTypeWrapper<Partial<Spot>>;
  SpotAddInput: ResolverTypeWrapper<Partial<SpotAddInput>>;
  SpotAddPayload: ResolverTypeWrapper<Partial<SpotAddPayload>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  URL: ResolverTypeWrapper<Partial<Scalars['URL']>>;
  User: ResolverTypeWrapper<Partial<User>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Partial<Scalars['Boolean']>;
  Date: Partial<Scalars['Date']>;
  GeoPoint: Partial<GeoPoint>;
  ID: Partial<Scalars['ID']>;
  Latitude: Partial<Scalars['Latitude']>;
  Longitude: Partial<Scalars['Longitude']>;
  Me: Partial<Me>;
  Mutation: {};
  Node: ResolversParentTypes['Me'] | ResolversParentTypes['Spot'] | ResolversParentTypes['User'];
  Query: {};
  ResizedSpotImageURLs: Partial<ResizedSpotImageUrLs>;
  ResizedUserProfileImageURLs: Partial<ResizedUserProfileImageUrLs>;
  Spot: Partial<Spot>;
  SpotAddInput: Partial<SpotAddInput>;
  SpotAddPayload: Partial<SpotAddPayload>;
  String: Partial<Scalars['String']>;
  URL: Partial<Scalars['URL']>;
  User: Partial<User>;
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
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  spotAdd?: Resolver<ResolversTypes['SpotAddPayload'], ParentType, ContextType, RequireFields<MutationSpotAddArgs, 'input'>>;
}>;

export type NodeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Me' | 'Spot' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>;
  spot?: Resolver<ResolversTypes['Spot'], ParentType, ContextType, RequireFields<QuerySpotArgs, 'id'>>;
  spots?: Resolver<Array<ResolversTypes['Spot']>, ParentType, ContextType, RequireFields<QuerySpotsArgs, 'maxLatitude' | 'maxLongitude' | 'minLatitude' | 'minLongitude'>>;
}>;

export type ResizedSpotImageUrLsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResizedSpotImageURLs'] = ResolversParentTypes['ResizedSpotImageURLs']> = ResolversObject<{
  thumbnail?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ResizedUserProfileImageUrLsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ResizedUserProfileImageURLs'] = ResolversParentTypes['ResizedUserProfileImageURLs']> = ResolversObject<{
  thumbnail?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Spot'] = ResolversParentTypes['Spot']> = ResolversObject<{
  archivedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  authorID?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdDate?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deletedDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  geoPoint?: Resolver<ResolversTypes['GeoPoint'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageURL?: Resolver<ResolversTypes['URL'], ParentType, ContextType>;
  resizedSpotImageURLs?: Resolver<ResolversTypes['ResizedSpotImageURLs'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SpotAddPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SpotAddPayload'] = ResolversParentTypes['SpotAddPayload']> = ResolversObject<{
  spot?: Resolver<ResolversTypes['Spot'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileImageURL?: Resolver<Maybe<ResolversTypes['URL']>, ParentType, ContextType>;
  resizedProfileImageURLs?: Resolver<ResolversTypes['ResizedUserProfileImageURLs'], ParentType, ContextType>;
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
  ResizedSpotImageURLs?: ResizedSpotImageUrLsResolvers<ContextType>;
  ResizedUserProfileImageURLs?: ResizedUserProfileImageUrLsResolvers<ContextType>;
  Spot?: SpotResolvers<ContextType>;
  SpotAddPayload?: SpotAddPayloadResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
}>;

