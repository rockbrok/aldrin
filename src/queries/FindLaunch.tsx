
import { gql } from "@apollo/client"

export const FindLaunch = gql`
query findLaunch($id: ID!) {
  launch(id: $id) {
    id
    launch_site {
      site_name
    }
    launch_success
    launch_year
    mission_name
    rocket {
      rocket_name
      rocket_type
      second_stage {
        payloads {
          payload_mass_kg
          nationality
          orbit_params {
            regime
          }
        }
      }
    }
    details
  }
}

`