import { decodeGame, getGameAddress, getPlayerUnderlyingAta, getUserUnderlyingAta } from 'gamba-core-v2'
import { GambaUi } from 'gamba-react-ui-v2'
import { useAccount, useGamba, useGambaProgram, useSendTransaction, useTransactionStore, useWalletAddress } from 'gamba-react-v2'
import React from 'react'
import { Modal } from '../../components/Modal'
import { LoadingBar, useLoadingState } from './LoadingBar'

export function TransactionModal(props: {onClose: () => void}) {
  const [closingAccount, setClosingAccount] = React.useState(false)
  const [initializing, setInitializing] = React.useState(false)
  const program = useGambaProgram()
  const sendTransaction = useSendTransaction()
  const userAddress = useWalletAddress()
  const gamba = useGamba()
  const game = useAccount(getGameAddress(userAddress), decodeGame)
  const txStore = useTransactionStore()
  const loadingState = useLoadingState()
  const status = Object.keys(game?.status ?? {})[0]

  const initialize = async () => {
    try {
      setInitializing(true)
      await sendTransaction(
        program.methods
          .playerInitialize()
          .instruction(),
        { confirmation: 'принято' },
      )
    } finally {
      setInitializing(false)
    }
  }

  const reset = async () => {
    if (!game) return
    // if (game.bonusUsed) {
    //   const bonus = getPlayerBonusAtaForPool(game.user, game.pool)
    // }

    const playerAta = getPlayerUnderlyingAta(userAddress, game.tokenMint)
    const userUnderlyingAta = getUserUnderlyingAta(userAddress, game.tokenMint)
    const ix = program.methods
      .playerClaim()
      .accounts({
        playerAta,
        underlyingTokenMint: game.tokenMint,
        userUnderlyingAta,
      })
      .instruction()

    await sendTransaction(
      ix,
      { confirmation: 'принято' },
    )
  }

  const closeAccount = async () => {
    try {
      setClosingAccount(true)
      await sendTransaction(
        program.methods
          .playerClose()
          .instruction(),
        { confirmation: 'принято' },
      )
    } finally {
      setClosingAccount(false)
    }
  }

return (
  <Modal onClose={() => props.onClose()}>
    <h1>Транзакция</h1>
    {loadingState} - {txStore.state} - {status} - {gamba.nonce.toString()}
    <div style={{ display: 'flex', gap: '10px' }}>
      <GambaUi.Button disabled={gamba.userCreated || initializing} onClick={initialize}>
        Открыть аккаунт
      </GambaUi.Button>
      <GambaUi.Button onClick={reset}>
        Сбросить аккаунт
      </GambaUi.Button>
      <GambaUi.Button disabled={!gamba.userCreated || closingAccount} onClick={closeAccount}>
        Закрыть аккаунт
      </GambaUi.Button>
      {txStore.txId && (
        <GambaUi.Button main onClick={() => window.open('https://solscan.io/tx/' + txStore.txId)}>
          Просмотр TX
        </GambaUi.Button>
      )}
    </div>
    <LoadingBar />
  </Modal>
)
}
