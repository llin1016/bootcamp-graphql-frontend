import gql from 'graphql-tag'

// Select all queries

export const ALL_AUTHORS = gql`
    query allAuthors{
        allAuthors{
            firstName
            lastName
            age
            email
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

export const ALL_BOOKS = gql`
    query allBooks{
        allBooks{
            title
            language
            numPages
            datePublished
            author{
                firstName
                lastName
            }
            publisher{
                company
            }
        }
    }
`

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

export const ALL_PUBLISHERS = gql`

    query allPublishers {
        allPublishers{
            company
            phoneNumber
        }
    }

`

// Select by ID queries

export const ADDRESS_BY_ID = gql`
    query addressById($id:ID!){
        addressById(id:$id){
            street
            city
            state
            zip
        }
    }
`

export const AUTHOR_BY_ID = gql`
    query authorById($id:ID!){
        authorById(id:$id){
            firstName
            lastName
            age
            email
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

export const BOOK_BY_ID = gql`
    query bookById($id:ID!){
        bookById(id:$id){
            title
            language
            numPages
            datePublished
            author{
            firstName
            lastName
            }
            publisher{
            company
            }
        }
    }
`

export const PUBLISHER_BY_ID = gql`
    query publisherById($id:ID!){
        publisherById(id:$id){
            company
            phoneNumber
            numBooksPublished
            address {
            street
            city
            state
            zip
            }
        }
    }
`

// Insert

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