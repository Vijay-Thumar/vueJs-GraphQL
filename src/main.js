import { ApolloClient, InMemoryCache } from '@apollo/client' // This is ApolloClient library
import { DefaultApolloClient } from '@vue/apollo-composable' // This help you connect apolloClient to vue
import { createApp, h, provide } from 'vue'
import App from './App.vue'
import './style.css'

// Define the backend url to ApolloClient
const defaultClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql', // https://rickandmortyapi.com/graphql - remote , http://localhost:5000/graphql - local
    cache: new InMemoryCache(), // telling apollo client to use cache for query and mutation
})

// const query = gql`
// query{
//     characters{
//         results{
//             name
//         }
//     }
// }
// `

// defaultClient.query({
//     query
// }).then(res => console.log(res))

const app = createApp({
    setup() {
        provide(DefaultApolloClient, defaultClient)
    },
    render() {
        return h(App)
    },
}).mount('#app')
