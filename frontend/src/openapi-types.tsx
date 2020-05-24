/* Generated by restful-react */

import React from "react";
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from "restful-react";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Claim {
  id: number;
  claim_text: string;
  description?: string;
  topic: Topic;
  source_of_claim: number;
}

export interface Entity {
  name: string;
  description?: string;
}

export interface Evidence {
  claim: Claim;
  source_of_evidence: Source;
  evidence_relationship: EvidenceRelationshipEnum;
  description?: string;
  is_expert_verified: boolean;
}

export interface PatchedClaim {
  id?: number;
  claim_text?: string;
  description?: string;
  topic?: Topic;
  source_of_claim?: number;
}

export interface PatchedEntity {
  name?: string;
  description?: string;
}

export interface PatchedEvidence {
  claim?: Claim;
  source_of_evidence?: Source;
  evidence_relationship?: EvidenceRelationshipEnum;
  description?: string;
  is_expert_verified?: boolean;
}

export interface PatchedSource {
  url?: string;
  description?: string;
  source_degree?: SourceDegreeEnum | null;
  authors?: Entity[];
  date_retrieved?: string;
}

export interface Source {
  url?: string;
  description?: string;
  source_degree?: SourceDegreeEnum | null;
  authors: Entity[];
  date_retrieved: string;
}

export interface Topic {
  name: string;
}

export type EvidenceRelationshipEnum = "PROVES" | "SUPPORTS" | "UNRELATED" | "INCONCLUSIVE" | "DISPUTES" | "DISPROVES";

export type SourceDegreeEnum = "ORIGINAL" | "PRIMARY" | "SECONDARY" | "TERTIARY";

export type ApiClaimsRetrieveProps = Omit<GetProps<Claim, unknown, void>, "path">;

/**
 * REST endpoints for viewing and submitting claims
 */
export const ApiClaimsRetrieve = (props: ApiClaimsRetrieveProps) => (
  <Get<Claim, unknown, void>
    path={`/api/claims/`}
    {...props}
  />
);

export type UseApiClaimsRetrieveProps = Omit<UseGetProps<Claim, void>, "path">;

/**
 * REST endpoints for viewing and submitting claims
 */
export const useApiClaimsRetrieve = (props: UseApiClaimsRetrieveProps) => useGet<Claim, unknown, void>(`/api/claims/`, props);


export type ApiClaimsCreateProps = Omit<MutateProps<Claim, unknown, void, Claim>, "path" | "verb">;

/**
 * REST endpoints for viewing and submitting claims
 */
export const ApiClaimsCreate = (props: ApiClaimsCreateProps) => (
  <Mutate<Claim, unknown, void, Claim>
    verb="POST"
    path={`/api/claims/`}
    {...props}
  />
);

export type UseApiClaimsCreateProps = Omit<UseMutateProps<Claim, void, Claim>, "path" | "verb">;

/**
 * REST endpoints for viewing and submitting claims
 */
export const useApiClaimsCreate = (props: UseApiClaimsCreateProps) => useMutate<Claim, unknown, void, Claim>("POST", `/api/claims/`, props);


export type ApiClaimDetailProps = Omit<GetProps<Claim, unknown, void>, "path"> & {id: number};

export const ApiClaimDetail = ({id, ...props}: ApiClaimDetailProps) => (
  <Get<Claim, unknown, void>
    path={`/api/claims/${id}`}
    {...props}
  />
);

export type UseApiClaimDetailProps = Omit<UseGetProps<Claim, void>, "path"> & {id: number};

export const useApiClaimDetail = ({id, ...props}: UseApiClaimDetailProps) => useGet<Claim, unknown, void>(`/api/claims/${id}`, props);


export type ApiClaimsUpdateProps = Omit<MutateProps<Claim, unknown, void, Claim>, "path" | "verb"> & {id: number};

export const ApiClaimsUpdate = ({id, ...props}: ApiClaimsUpdateProps) => (
  <Mutate<Claim, unknown, void, Claim>
    verb="PUT"
    path={`/api/claims/${id}`}
    {...props}
  />
);

export type UseApiClaimsUpdateProps = Omit<UseMutateProps<Claim, void, Claim>, "path" | "verb"> & {id: number};

export const useApiClaimsUpdate = ({id, ...props}: UseApiClaimsUpdateProps) => useMutate<Claim, unknown, void, Claim>("PUT", `/api/claims/${id}`, props);


export type ApiClaimsPartialUpdateProps = Omit<MutateProps<Claim, unknown, void, PatchedClaim>, "path" | "verb"> & {id: number};

export const ApiClaimsPartialUpdate = ({id, ...props}: ApiClaimsPartialUpdateProps) => (
  <Mutate<Claim, unknown, void, PatchedClaim>
    verb="PATCH"
    path={`/api/claims/${id}`}
    {...props}
  />
);

export type UseApiClaimsPartialUpdateProps = Omit<UseMutateProps<Claim, void, PatchedClaim>, "path" | "verb"> & {id: number};

export const useApiClaimsPartialUpdate = ({id, ...props}: UseApiClaimsPartialUpdateProps) => useMutate<Claim, unknown, void, PatchedClaim>("PATCH", `/api/claims/${id}`, props);


export type ApiEntitiesRetrieveProps = Omit<GetProps<Entity, unknown, void>, "path">;

/**
 * REST endpoints for viewing and submitting entities
 */
export const ApiEntitiesRetrieve = (props: ApiEntitiesRetrieveProps) => (
  <Get<Entity, unknown, void>
    path={`/api/entities/`}
    {...props}
  />
);

export type UseApiEntitiesRetrieveProps = Omit<UseGetProps<Entity, void>, "path">;

/**
 * REST endpoints for viewing and submitting entities
 */
export const useApiEntitiesRetrieve = (props: UseApiEntitiesRetrieveProps) => useGet<Entity, unknown, void>(`/api/entities/`, props);


export type ApiEntitiesCreateProps = Omit<MutateProps<Entity, unknown, void, Entity>, "path" | "verb">;

/**
 * REST endpoints for viewing and submitting entities
 */
export const ApiEntitiesCreate = (props: ApiEntitiesCreateProps) => (
  <Mutate<Entity, unknown, void, Entity>
    verb="POST"
    path={`/api/entities/`}
    {...props}
  />
);

export type UseApiEntitiesCreateProps = Omit<UseMutateProps<Entity, void, Entity>, "path" | "verb">;

/**
 * REST endpoints for viewing and submitting entities
 */
export const useApiEntitiesCreate = (props: UseApiEntitiesCreateProps) => useMutate<Entity, unknown, void, Entity>("POST", `/api/entities/`, props);


export type ApiEntityDetailProps = Omit<GetProps<Entity, unknown, void>, "path"> & {id: number};

export const ApiEntityDetail = ({id, ...props}: ApiEntityDetailProps) => (
  <Get<Entity, unknown, void>
    path={`/api/entities/${id}`}
    {...props}
  />
);

export type UseApiEntityDetailProps = Omit<UseGetProps<Entity, void>, "path"> & {id: number};

export const useApiEntityDetail = ({id, ...props}: UseApiEntityDetailProps) => useGet<Entity, unknown, void>(`/api/entities/${id}`, props);


export type ApiEntitiesUpdateProps = Omit<MutateProps<Entity, unknown, void, Entity>, "path" | "verb"> & {id: number};

export const ApiEntitiesUpdate = ({id, ...props}: ApiEntitiesUpdateProps) => (
  <Mutate<Entity, unknown, void, Entity>
    verb="PUT"
    path={`/api/entities/${id}`}
    {...props}
  />
);

export type UseApiEntitiesUpdateProps = Omit<UseMutateProps<Entity, void, Entity>, "path" | "verb"> & {id: number};

export const useApiEntitiesUpdate = ({id, ...props}: UseApiEntitiesUpdateProps) => useMutate<Entity, unknown, void, Entity>("PUT", `/api/entities/${id}`, props);


export type ApiEntitiesPartialUpdateProps = Omit<MutateProps<Entity, unknown, void, PatchedEntity>, "path" | "verb"> & {id: number};

export const ApiEntitiesPartialUpdate = ({id, ...props}: ApiEntitiesPartialUpdateProps) => (
  <Mutate<Entity, unknown, void, PatchedEntity>
    verb="PATCH"
    path={`/api/entities/${id}`}
    {...props}
  />
);

export type UseApiEntitiesPartialUpdateProps = Omit<UseMutateProps<Entity, void, PatchedEntity>, "path" | "verb"> & {id: number};

export const useApiEntitiesPartialUpdate = ({id, ...props}: UseApiEntitiesPartialUpdateProps) => useMutate<Entity, unknown, void, PatchedEntity>("PATCH", `/api/entities/${id}`, props);


export interface ApiEvidenceRetrieveQueryParams {
  /**
   * Is this evidence expert verified?
   */
  is_expert_verified?: boolean;
}

export type ApiEvidenceRetrieveProps = Omit<GetProps<Evidence, unknown, ApiEvidenceRetrieveQueryParams>, "path">;

export const ApiEvidenceRetrieve = (props: ApiEvidenceRetrieveProps) => (
  <Get<Evidence, unknown, ApiEvidenceRetrieveQueryParams>
    path={`/api/evidence/`}
    {...props}
  />
);

export type UseApiEvidenceRetrieveProps = Omit<UseGetProps<Evidence, ApiEvidenceRetrieveQueryParams>, "path">;

export const useApiEvidenceRetrieve = (props: UseApiEvidenceRetrieveProps) => useGet<Evidence, unknown, ApiEvidenceRetrieveQueryParams>(`/api/evidence/`, props);


export interface ApiEvidenceCreateQueryParams {
  /**
   * Is this evidence expert verified?
   */
  is_expert_verified?: boolean;
}

export type ApiEvidenceCreateProps = Omit<MutateProps<Evidence, unknown, ApiEvidenceCreateQueryParams, Evidence>, "path" | "verb">;

export const ApiEvidenceCreate = (props: ApiEvidenceCreateProps) => (
  <Mutate<Evidence, unknown, ApiEvidenceCreateQueryParams, Evidence>
    verb="POST"
    path={`/api/evidence/`}
    {...props}
  />
);

export type UseApiEvidenceCreateProps = Omit<UseMutateProps<Evidence, ApiEvidenceCreateQueryParams, Evidence>, "path" | "verb">;

export const useApiEvidenceCreate = (props: UseApiEvidenceCreateProps) => useMutate<Evidence, unknown, ApiEvidenceCreateQueryParams, Evidence>("POST", `/api/evidence/`, props);


export type ApiEvidenceDetailProps = Omit<GetProps<Evidence, unknown, void>, "path"> & {id: number};

export const ApiEvidenceDetail = ({id, ...props}: ApiEvidenceDetailProps) => (
  <Get<Evidence, unknown, void>
    path={`/api/evidence/${id}`}
    {...props}
  />
);

export type UseApiEvidenceDetailProps = Omit<UseGetProps<Evidence, void>, "path"> & {id: number};

export const useApiEvidenceDetail = ({id, ...props}: UseApiEvidenceDetailProps) => useGet<Evidence, unknown, void>(`/api/evidence/${id}`, props);


export type ApiEvidenceUpdateProps = Omit<MutateProps<Evidence, unknown, void, Evidence>, "path" | "verb"> & {id: number};

export const ApiEvidenceUpdate = ({id, ...props}: ApiEvidenceUpdateProps) => (
  <Mutate<Evidence, unknown, void, Evidence>
    verb="PUT"
    path={`/api/evidence/${id}`}
    {...props}
  />
);

export type UseApiEvidenceUpdateProps = Omit<UseMutateProps<Evidence, void, Evidence>, "path" | "verb"> & {id: number};

export const useApiEvidenceUpdate = ({id, ...props}: UseApiEvidenceUpdateProps) => useMutate<Evidence, unknown, void, Evidence>("PUT", `/api/evidence/${id}`, props);


export type ApiEvidencePartialUpdateProps = Omit<MutateProps<Evidence, unknown, void, PatchedEvidence>, "path" | "verb"> & {id: number};

export const ApiEvidencePartialUpdate = ({id, ...props}: ApiEvidencePartialUpdateProps) => (
  <Mutate<Evidence, unknown, void, PatchedEvidence>
    verb="PATCH"
    path={`/api/evidence/${id}`}
    {...props}
  />
);

export type UseApiEvidencePartialUpdateProps = Omit<UseMutateProps<Evidence, void, PatchedEvidence>, "path" | "verb"> & {id: number};

export const useApiEvidencePartialUpdate = ({id, ...props}: UseApiEvidencePartialUpdateProps) => useMutate<Evidence, unknown, void, PatchedEvidence>("PATCH", `/api/evidence/${id}`, props);


export type ApiSourcesRetrieveProps = Omit<GetProps<Source, unknown, void>, "path">;

/**
 * REST endpoints for viewing and submitting sources
 */
export const ApiSourcesRetrieve = (props: ApiSourcesRetrieveProps) => (
  <Get<Source, unknown, void>
    path={`/api/sources/`}
    {...props}
  />
);

export type UseApiSourcesRetrieveProps = Omit<UseGetProps<Source, void>, "path">;

/**
 * REST endpoints for viewing and submitting sources
 */
export const useApiSourcesRetrieve = (props: UseApiSourcesRetrieveProps) => useGet<Source, unknown, void>(`/api/sources/`, props);


export type ApiSourcesCreateProps = Omit<MutateProps<Source, unknown, void, Source>, "path" | "verb">;

/**
 * REST endpoints for viewing and submitting sources
 */
export const ApiSourcesCreate = (props: ApiSourcesCreateProps) => (
  <Mutate<Source, unknown, void, Source>
    verb="POST"
    path={`/api/sources/`}
    {...props}
  />
);

export type UseApiSourcesCreateProps = Omit<UseMutateProps<Source, void, Source>, "path" | "verb">;

/**
 * REST endpoints for viewing and submitting sources
 */
export const useApiSourcesCreate = (props: UseApiSourcesCreateProps) => useMutate<Source, unknown, void, Source>("POST", `/api/sources/`, props);


export type ApiSourceDetailProps = Omit<GetProps<Source, unknown, void>, "path"> & {id: number};

export const ApiSourceDetail = ({id, ...props}: ApiSourceDetailProps) => (
  <Get<Source, unknown, void>
    path={`/api/sources/${id}`}
    {...props}
  />
);

export type UseApiSourceDetailProps = Omit<UseGetProps<Source, void>, "path"> & {id: number};

export const useApiSourceDetail = ({id, ...props}: UseApiSourceDetailProps) => useGet<Source, unknown, void>(`/api/sources/${id}`, props);


export type ApiSourcesUpdateProps = Omit<MutateProps<Source, unknown, void, Source>, "path" | "verb"> & {id: number};

export const ApiSourcesUpdate = ({id, ...props}: ApiSourcesUpdateProps) => (
  <Mutate<Source, unknown, void, Source>
    verb="PUT"
    path={`/api/sources/${id}`}
    {...props}
  />
);

export type UseApiSourcesUpdateProps = Omit<UseMutateProps<Source, void, Source>, "path" | "verb"> & {id: number};

export const useApiSourcesUpdate = ({id, ...props}: UseApiSourcesUpdateProps) => useMutate<Source, unknown, void, Source>("PUT", `/api/sources/${id}`, props);


export type ApiSourcesPartialUpdateProps = Omit<MutateProps<Source, unknown, void, PatchedSource>, "path" | "verb"> & {id: number};

export const ApiSourcesPartialUpdate = ({id, ...props}: ApiSourcesPartialUpdateProps) => (
  <Mutate<Source, unknown, void, PatchedSource>
    verb="PATCH"
    path={`/api/sources/${id}`}
    {...props}
  />
);

export type UseApiSourcesPartialUpdateProps = Omit<UseMutateProps<Source, void, PatchedSource>, "path" | "verb"> & {id: number};

export const useApiSourcesPartialUpdate = ({id, ...props}: UseApiSourcesPartialUpdateProps) => useMutate<Source, unknown, void, PatchedSource>("PATCH", `/api/sources/${id}`, props);

