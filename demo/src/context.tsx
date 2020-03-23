import React, { useEffect, useState } from 'react'
import Client from '../../dist/Client'

interface Context {
  client: Client
}

export const OPCUAContext = React.createContext<Context>({} as Context)

export const OPCUAProvider: React.FunctionComponent = props => {
  const [client, setClient] = useState<Client | null>(null)

  const connect = async () => {
    const client = new Client('ws://localhost:1234')

    // open socket connection
    await client.open()
    console.log('open')

    // send hello and wait for acknowledge
    const ack = await client.hello()
    console.log('ack', ack)

    // open secure channel
    const openSecureChannelResponse = await client.openSecureChannel()
    console.log('open secure channel', openSecureChannelResponse)

    // create session
    const createSessionResponse = await client.createSession()
    console.log('create session response', createSessionResponse)

    // activate session
    const activateSessionResponse = await client.activateSession()
    console.log('activate session response', activateSessionResponse)

    setClient(client)
  }

  useEffect(() => {
    connect()
  }, [])

  if (client === null) {
    return <div>loading ...</div>
  }

  return (
    <OPCUAContext.Provider
      value={{
        client: client
      }}
    >
      {props.children}
    </OPCUAContext.Provider>
  )
}
