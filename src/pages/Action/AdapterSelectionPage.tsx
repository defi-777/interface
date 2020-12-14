import React from 'react'
import AppBody from '../AppBody'
import { Action } from '../../state/actions/types'
import { AutoColumn } from '../../components/Column'
import { Token } from '../../state/tokens/types'
import AdapterRow from './AdapterRow'
import { CardHeader } from '../../components/NavigationTabs'

interface AdapterSelectionPageProps {
  action: Action
  token: Token
}

const AdapterSelectionPage: React.FC<AdapterSelectionPageProps> = ({ action, token }) => {
  return (
    <AppBody>
      <CardHeader back={`/token/${token.address}`} title={action.name} help=" " />

      <AutoColumn gap={'md'}>
        {action.adapters.map(adapter => (
          <AdapterRow action={action} adapter={adapter} token={token} key={adapter.address} />
        ))}
      </AutoColumn>
    </AppBody>
  )
}

export default AdapterSelectionPage
