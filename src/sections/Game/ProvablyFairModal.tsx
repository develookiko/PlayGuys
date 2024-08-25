import { useGamba, useGambaProgram, useSendTransaction } from 'gamba-react-v2'
import { GambaPlatformContext, GambaUi } from 'gamba-react-ui-v2'
import React from 'react'
import { Icon } from '../../components/Icon'
import { Modal } from '../../components/Modal'

export function ProvablyFairModal(props: {onClose: () => void}) {
  const gamba = useGamba()
  const platform = React.useContext(GambaPlatformContext)
  const [initializing, setInitializing] = React.useState(false)
  const program = useGambaProgram()
  const sendTransaction = useSendTransaction()

  const initialize = async () => {
    try {
      setInitializing(true)
      await sendTransaction(
        program.methods
          .playerInitialize()
          .instruction(),
        { confirmation: 'confirmed' },
      )
    } finally {
      setInitializing(false)
    }
  }

return (
  <Modal onClose={() => props.onClose()}>
    <h1>Подтверждённая честность</h1>
    {!gamba.userCreated && (
      <>
        <p>
          «Подтверждённая честность» позволяет вам проверить, что результат каждой игры был случайным образом сгенерирован. Так как вы играете с этого кошелька впервые, вы можете запросить начальное хешированное зерно заранее. После этого это будет делаться автоматически для каждой игры.
        </p>
        <GambaUi.Button main disabled={initializing} onClick={initialize}>
          Получить хешированное зерно
        </GambaUi.Button>
      </>
    )}
    {gamba.userCreated && (
      <>
        <p>
          Ваше клиентское зерно повлияет на результат следующей игры, в которую вы сыграете.
        </p>
        <div style={{ display: 'grid', gap: '10px', width: '100%', padding: '20px' }}>
          <div>Следующее зерно ГСЧ (sha256)</div>
          <GambaUi.TextInput
            value={gamba.nextRngSeedHashed ?? ''}
            disabled
          />
          <div>Клиентское зерно</div>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <GambaUi.TextInput
              style={{ flexGrow: '1' }}
              value={platform.clientSeed}
              disabled={gamba.isPlaying}
              maxLength={32}
              onChange={platform.setClientSeed}
            />
            <GambaUi.Button
              disabled={gamba.isPlaying}
              onClick={() => platform.setClientSeed(String(Math.random() * 1e9 | 0))}
            >
              <Icon.Shuffle />
            </GambaUi.Button>
          </div>
        </div>
      </>
    )}
  </Modal>
)
}
