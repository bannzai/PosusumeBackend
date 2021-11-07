import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type GeoPointKeySpecifier = ('latitude' | 'longitude' | GeoPointKeySpecifier)[];
export type GeoPointFieldPolicy = {
	latitude?: FieldPolicy<any> | FieldReadFunction<any>,
	longitude?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MeKeySpecifier = ('id' | 'spots' | MeKeySpecifier)[];
export type MeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	spots?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('spotAdd' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	spotAdd?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('me' | 'spot' | 'spots' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	spot?: FieldPolicy<any> | FieldReadFunction<any>,
	spots?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ResizedSpotImageURLsKeySpecifier = ('thumbnail' | ResizedSpotImageURLsKeySpecifier)[];
export type ResizedSpotImageURLsFieldPolicy = {
	thumbnail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpotKeySpecifier = ('archivedDate' | 'author' | 'authorID' | 'createdDate' | 'deletedDate' | 'geoPoint' | 'id' | 'imageURL' | 'resizedSpotImageURLs' | 'title' | SpotKeySpecifier)[];
export type SpotFieldPolicy = {
	archivedDate?: FieldPolicy<any> | FieldReadFunction<any>,
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	authorID?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	deletedDate?: FieldPolicy<any> | FieldReadFunction<any>,
	geoPoint?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	imageURL?: FieldPolicy<any> | FieldReadFunction<any>,
	resizedSpotImageURLs?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpotAddPayloadKeySpecifier = ('spot' | SpotAddPayloadKeySpecifier)[];
export type SpotAddPayloadFieldPolicy = {
	spot?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	GeoPoint?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GeoPointKeySpecifier | (() => undefined | GeoPointKeySpecifier),
		fields?: GeoPointFieldPolicy,
	},
	Me?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MeKeySpecifier | (() => undefined | MeKeySpecifier),
		fields?: MeFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	ResizedSpotImageURLs?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResizedSpotImageURLsKeySpecifier | (() => undefined | ResizedSpotImageURLsKeySpecifier),
		fields?: ResizedSpotImageURLsFieldPolicy,
	},
	Spot?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotKeySpecifier | (() => undefined | SpotKeySpecifier),
		fields?: SpotFieldPolicy,
	},
	SpotAddPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpotAddPayloadKeySpecifier | (() => undefined | SpotAddPayloadKeySpecifier),
		fields?: SpotAddPayloadFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;