import React, { useState } from 'react'
import { loadFromManifest } from './AssetsLoader'
import AssetManifest from './AssetManifest'
import soundsList from '../config/sounds.json'
import dataList from '../config/data.json'

const AssetsContext = React.createContext([{}, () => {}])

const assetManifest = new AssetManifest(
  [ 'sound', soundsList ],
  [ 'data', dataList ]
)

/**
 * Provider for game assets.
 *
 * @param {*} props React props.
 *
 * @return {JSX} Component wrapped in AssetsContext.
 */
const AssetsProvider = (props) => {
  const [state, setState] = useState({
    'sound': {},
    'data': {}
  })

  loadFromManifest(assetManifest)
    .then(assets => {
      setState(assets)
      onLoadedCallbacks.forEach(callback => callback(assets))
    })

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