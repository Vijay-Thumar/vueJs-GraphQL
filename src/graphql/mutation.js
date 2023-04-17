import { gql } from '@apollo/client'

export const DEL_PROJECT = gql`
    mutation delProject($id: ID!) {
        deleteProject(id: $id) {
            id
            name
            description
        }
    }
`
