import React, { useState } from 'react'
import AssetManifest from 'assets/AssetManifest'
import { loadFromManifest } from 'assets/AssetsLoader'
import { createManifest } from 'assets/KojiAssets'

const AssetsContext = React.createContext([{}, () => {}])

const assetManifest = createManifest()

let loaded = false
let loading = false

/**
 * Provider for game assets.
 *
 * @param {*} props React props.
 *
 * @return {JSX} Component wrapped in AssetsContext.
 */
const AssetsProvider = (props) => {
  const [state, setState] = useState({
    sound: {},
    data: {}
  })

  if (!loaded && !loading) {
    loading = true
    loadFromManifest(assetManifest)
      .then(assets => {
        setState({
          ...assets
        })
        loaded = true
        onLoadedCallbacks.forEach(callback => callback(assets))
      })
  }

  return (
    <AssetsContext.Provider value={[state, setState]}>
      {props.children}
    </AssetsContext.Provider>
  )
}

const onLoadedCallbacks = []

/**
 * Queues a callback to run when all assets are loaded.
 *
 * @param {Function} callback A callback function.
 *
 * @return {void}
 */
const onLoaded = callback => {
  onLoadedCallbacks.push(callback)
}

export { AssetsContext, AssetsProvider, onLoaded }