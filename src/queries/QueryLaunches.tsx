import { gql } from "@apollo/client"

export const QueryLaunches = gql`
query queryLaunches {
  launchesPastResult {
    data {
      mission_name
      id
    }
    result {
      totalCount
    }
  }
}
`