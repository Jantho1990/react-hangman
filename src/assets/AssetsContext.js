import React, { useState } from 'react'

const AssetsContext = React.createContext([{}, () => {}])

const AssetsProvider = (props) => {
  const [state, useState] = useState({
    'sounds': {},
    'json': {}
  })

  return (
    <AssetsContext.Provider value={[state, setState]}>
      {props.children}
    </AssetsContext.Provider>
  )
}

export default { AssetsContext, AssetsProvider }