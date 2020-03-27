import React, { useEffect, useState } from 'react'
import Client from '../../dist/Client'

interface Context {
  client: Client
}

export const OPCUAContext = React.createContext<Context>({} as Context)

export const OPCUAProvider: React.FunctionComponent = (props) => {
  const [client, setClient] = useState<Client | null>(null)

  const connect = async () => {
    const client = new Client('ws://localhost:1234')
    await client.open()
    await client.hello()
    await client.openSecureChannel()
    await client.createSession()
    await client.activateSession()
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
        client: client,
      }}
    >
      {props.children}
    </OPCUAContext.Provider>
  )
}
