import { gql } from "@apollo/client"

export const QueryLaunches = gql`
query queryLaunches($year: String, $type: String, $orbit: String, $name: String) {
  launchesPastResult(find: {launch_year: $year, regime: $orbit, rocket_type: $type, mission_name: $name}) {
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