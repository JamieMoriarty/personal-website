/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "query GetContent {\n    heroCollection {\n      items {\n        title\n        description\n        shortDescription\n        linksCollection {\n          items {\n            label\n            url\n          }\n        }\n        squareImage {\n          url\n        }\n        landscapeImage {\n            url\n          }\n      }\n    }\n  }": types.GetContentDocument,
    "query GetExperience {\n    positionCollection {\n        items {\n        sys {\n            id\n        }\n        title\n        team\n        additionalSpecifier\n        startDate\n        endDate\n        keyResponsibilities\n        description {\n            json\n        }\n        employer {\n            sys {\n            id\n            }\n            name\n            logo {\n            url\n            }\n            homepageUrl\n        }\n        skillsCollection {\n            items {\n            sys {\n                id\n            }\n            }\n        }\n        \n        }\n    }\n}": types.GetExperienceDocument,
    "\n  query GetSkills { \n    skillCollection (limit: 200) {\n      items {\n        sys {\n          id\n        }\n        name\n        category {\n          sys {\n            id\n          }\n          name\n        }\n        area {\n          sys {\n            id\n          }\n          name\n        }\n      }\n    }\n  }\n": types.GetSkillsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetContent {\n    heroCollection {\n      items {\n        title\n        description\n        shortDescription\n        linksCollection {\n          items {\n            label\n            url\n          }\n        }\n        squareImage {\n          url\n        }\n        landscapeImage {\n            url\n          }\n      }\n    }\n  }"): (typeof documents)["query GetContent {\n    heroCollection {\n      items {\n        title\n        description\n        shortDescription\n        linksCollection {\n          items {\n            label\n            url\n          }\n        }\n        squareImage {\n          url\n        }\n        landscapeImage {\n            url\n          }\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetExperience {\n    positionCollection {\n        items {\n        sys {\n            id\n        }\n        title\n        team\n        additionalSpecifier\n        startDate\n        endDate\n        keyResponsibilities\n        description {\n            json\n        }\n        employer {\n            sys {\n            id\n            }\n            name\n            logo {\n            url\n            }\n            homepageUrl\n        }\n        skillsCollection {\n            items {\n            sys {\n                id\n            }\n            }\n        }\n        \n        }\n    }\n}"): (typeof documents)["query GetExperience {\n    positionCollection {\n        items {\n        sys {\n            id\n        }\n        title\n        team\n        additionalSpecifier\n        startDate\n        endDate\n        keyResponsibilities\n        description {\n            json\n        }\n        employer {\n            sys {\n            id\n            }\n            name\n            logo {\n            url\n            }\n            homepageUrl\n        }\n        skillsCollection {\n            items {\n            sys {\n                id\n            }\n            }\n        }\n        \n        }\n    }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSkills { \n    skillCollection (limit: 200) {\n      items {\n        sys {\n          id\n        }\n        name\n        category {\n          sys {\n            id\n          }\n          name\n        }\n        area {\n          sys {\n            id\n          }\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSkills { \n    skillCollection (limit: 200) {\n      items {\n        sys {\n          id\n        }\n        name\n        category {\n          sys {\n            id\n          }\n          name\n        }\n        area {\n          sys {\n            id\n          }\n          name\n        }\n      }\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;