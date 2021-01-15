import React from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import { ADD_ADDRESS, ALL_ADDRESSES, UPDATE_ADDRESS, ALL_PUBLISHERS, ADD_PUBLISHER } from './graphql'

const Home = () => {

    // Address Queries
    const {data:addressData, loading:addressLoading, error:addressError} = useQuery(ALL_ADDRESSES)
    if (addressError){
        throw new Error("AllAddresses failed")
    }

    const [addAddress, {error: addAddressError, loading:addAddressLoading}] = useMutation(ADD_ADDRESS,{
        update: (client, { data }) => {
            try {
                const temp = client.readQuery({ query: ALL_ADDRESSES })

                temp.allAddresses = [...temp.allAddresses,data.addAddress]

                client.writeQuery({ query: ALL_ADDRESSES, temp})
            } catch(error){
                throw new Error('update failed')
            }
        },
        variables: {
            "input":{
                "street": "merp",
                "city": "merp",
                "state": "merp",
                "zip": "merp"
              }
        },
        refetchQueries: () => [{query: ALL_ADDRESSES}]
    })
    if (addAddressError){
        throw new Error("AddAddress failed")
    }

    const [updateAddress, {error: updateAddressError, loading: updateAddressLoading}] = useMutation(UPDATE_ADDRESS, {
        update: (client, { data }) => {
            try {
                const temp = client.readQuery({ query: ALL_ADDRESSES })
                temp.allAddresses = [...temp.allAddresses, data.updateAddress]

                client.writeQuery({ query: ALL_ADDRESSES, temp})
            } catch(error){
                throw new Error("update failed")
            }
        },
        variables: {
            id: "901700e9-9383-4e0f-a957-aa0b2e74114a",
            input: {
                "street": "merp",
                "city": "merp",
                "state": "merp",
                "zip": "merp"
            }
        },
        refetchQueries: () => [{query: ALL_ADDRESSES}]
    })

    const {data:publisherData, loading:publisherLoading, error:publisherError} = useQuery(ALL_PUBLISHERS)
    if (publisherError){
        throw new Error("AllPublishers failed")
    }

    const [allPublishers, {data:lData, loading:lLoading, error:lError, called}] = useLazyQuery(ALL_PUBLISHERS)

    const [addPublisher, {error:addError, loading:addLoading}] = useMutation(ADD_PUBLISHER, {
        update: (client,{ data }) => {
            try {
                const temp = client.readQuery({ query: ALL_PUBLISHERS })
                temp.allPublishers = [...temp.allPublishers, data.addPublisher]

                client.writeQuery({ query: ALL_PUBLISHERS, temp})
            } catch(error) {
                throw new Error('update failed')
            }
        },
        variables: {
            "input":
            {
              "company":"merp",
              "phoneNumber":"merp",
              "numBooksPublished":30,
              "address":{
                "street":"merp",
                "city":"merp",
                  "state":"merp",
                "zip":"merp"
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
            {addressLoading ? "Loading" : addressData.allAddresses.map(address => (
                <p>{address.street}, {address.city}</p>
            )
            )}

            <h1>Add Address</h1>
            <button onClick={addAddress}>Add Address</button>

            <h1>Update Address</h1>
            <button onClick={updateAddress}>Update Address</button>

            <h1>useQuery Publisher List</h1>
            {publisherLoading ? "Loading" : publisherData.allPublishers.map(publisher => (
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
