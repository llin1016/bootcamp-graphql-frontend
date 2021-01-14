import React from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { ADD_ADDRESS, ALL_ADDRESSES, ALL_PUBLISHERS, ADD_PUBLISHER } from './graphql'

const Home = () => {
    const {data:adrData, loading:adrLoading, error:adrError} = useQuery(ALL_ADDRESSES)
    if (error){
        throw new Error("AllAddresses failed")
    }

    const [addAddress, {error: addAddressError, loading:addAddressLoading}] = useMutation(ADD_ADDRESS,{
        variables: {
            "input":{
                "street": "hello",
                "city": "hello",
                "state": "hello",
                "zip": "hello"
              }
        },
        refetchQueries: () => [{query: ALL_ADDRESSES}]
    })
    if (addAddressError){
        throw new Error("AddAddress failed")
    }

    const {data, loading, error} = useQuery(ALL_PUBLISHERS)
    if (error){
        throw new Error("AllPublishers failed")
    }

    const [allPublishers, {data:lData, loading:lLoading, error:lError, called}] = useLazyQuery(ALL_PUBLISHERS)

    const [addPublisher, {error:addError, loading:addLoading}] = useMutation(ADD_PUBLISHER, {
        variables: {
            "input":
            {
              "company":"byebyebyebye",
              "phoneNumber":"byebyebyebye",
              "numBooksPublished":30,
              "address":{
                "street":"byebyebyebye",
                "city":"byebyebyebye",
                  "state":"byebyebyebye",
                "zip":"byebyebyebye"
              }
            }
        },
        refetchQueries: () => [{query: ALL_PUBLISHERS}]
    })
    if (addError){
        throw new Error('addPublishers failed')
    }

    return (
        <>
            <h1>useQuery Addresses List</h1>
            {loading ? "Loading" : adrData.allAddresses.map(address => (
                <p>{address.street}, {address.city}</p>
            )
            )}

            <h1>Add Address</h1>
            <button onClick={addAddress}>Add Address</button>

            <h1>useQuery Publisher List</h1>
            {loading ? "Loading" : data.allPublishers.map(publisher => (
                <p>{publisher.company}, {publisher.phoneNumber}</p>
            )
            )}

            <h1>useLazyQuery Publisher List</h1>

            <button onClick={allPublishers}>QUERY</button>
            {!called || lLoading ? "loading" : lData.allPublishers.map(publisher => (
                <>
                    <p>{publisher.company}, {publisher.phoneNumber}</p>
                </>
            ))}

            <h1>Insert New Publisher</h1>
            <button onClick={addPublisher}>Insert New Publisher</button>

        </>
    )
}


export default Home
