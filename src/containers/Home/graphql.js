import gql from 'graphql-tag'

export const ALL_ADDRESSES = gql`
    query allAddresses{
        allAddresses{
            street
            city
            state
            zip
        }
    }
`

export const ADD_ADDRESS = gql`
    mutation addAddress ($input: AddressInput!){
    addAddress(input:$input){
        street
        city
        state
        zip
    }
    }
`

export const ALL_PUBLISHERS = gql`

    query allPublishers {
        allPublishers{
            company
            phoneNumber
        }
    }

`

export const ADD_PUBLISHER = gql`
  mutation addPublisher($input:PublisherInput!){
    addPublisher(input:$input){
        company
        phoneNumber
        numBooksPublished
        address{
        street
        city
        state
        zip
        }
    }
  }
`