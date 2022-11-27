import { gql } from "@apollo/client"

export const GetLaunches = gql`
query launches($offset: Int, $year: String, $type: String, $orbit: String, $name: String) {
  launchesPastResult(limit: 12, offset: $offset, find: {launch_year: $year, regime: $orbit, rocket_type: $type, mission_name: $name}) {
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