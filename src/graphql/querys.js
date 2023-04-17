import { gql } from '@apollo/client'

export const ALL_PROJECTS = gql`
    query allProjects {
        projects {
            id
            name
            description
        }
    }
`
