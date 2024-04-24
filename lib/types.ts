import { Actor, Cast, Crew } from "@prisma/client"

export interface RouteParams {
  params: {
    id: string
  }
}

export interface CrewListProps {
  params: {
    id: string
  }
}

export interface TruncatedUser {
  name: string | null
  id: string
}

export interface CrewResponse extends Crew {
  user: TruncatedUser
}

export interface CrewCategory {
  [key: string]: ({
    user: TruncatedUser
  } & Crew)[]
}

export type CastActor = { actor: Actor } & Cast

export interface CastCategory {
  [key: string]: ({ actor: Actor } & Cast)[]
}
