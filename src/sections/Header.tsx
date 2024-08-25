import { GambaUi, TokenValue, useCurrentPool, useGambaPlatformContext, useUserBalance } from 'gamba-react-ui-v2'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from '../components/Modal'
import TokenSelect from './TokenSelect'
import { UserButton } from './UserButton'

const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #003c00;
  border-radius: 10px;
  background: #03ffa4;
  padding: 2px 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background .2s;
  &:hover {
    background: white;
  }
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  background: rgba(33, 34, 51, 0.9);
  position: fixed;
  background: #000000CC;
  backdrop-filter: blur(20px);
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
`

const Logo = styled(NavLink)`
  height: 35px;
  margin: 0 10px;
  & > img {
    height: 100%;
  }
`

export default function Header() {
  const pool = useCurrentPool()
  const context = useGambaPlatformContext()
  const balance = useUserBalance()
  const [bonusHelp, setBonusHelp] = React.useState(false)
  const [jackpotHelp, setJackpotHelp] = React.useState(false)

return (
  <>
    {bonusHelp && (
      <Modal onClose={() => setBonusHelp(false)}>
        <h1>Бонус ✨</h1>
        <p>
          У вас есть <b><TokenValue amount={balance.bonusBalance} /></b> бесплатных игр. Этот бонус будет применён автоматически при игре.
        </p>
        <p>
          Обратите внимание, что за каждую игру всё ещё требуется плата из вашего кошелька.
        </p>
      </Modal>
    )}
    {jackpotHelp && (
      <Modal onClose={() => setJackpotHelp(false)}>
        <h1>Джекпот 💰</h1>
        <p style={{ fontWeight: 'bold' }}>
          В джекпоте {TokenValue amount={pool.jackpotBalance} }.
        </p>
        <p>
          Джекпот — это призовой фонд, который растёт с каждой сделанной ставкой. По мере роста джекпота, увеличивается и ваша вероятность выигрыша. Как только будет выбран победитель, значение джекпота сбрасывается и начинает расти снова, пока не будет выбран новый победитель.
        </p>
        <p>
          Вы будете платить максимум {(context.defaultJackpotFee * 100).toLocaleString(undefined, { maximumFractionDigits: 4 })}% за каждую ставку за шанс на выигрыш.
        </p>
        <GambaUi.Switch
          checked={context.defaultJackpotFee > 0}
          onChange={(checked) => context.setDefaultJackpotFee(checked ? 0.01 : 0)}
        />
      </Modal>
    )}
    <StyledHeader>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Logo to="/">
          <img alt="Логотип Gamba" src="/logo.svg" />
        </Logo>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative' }}>
        {pool.jackpotBalance > 0 && (
          <Bonus onClick={() => setJackpotHelp(true)}>
            💰 <TokenValue amount={pool.jackpotBalance} />
          </Bonus>
        )}
        {balance.bonusBalance > 0 && (
          <Bonus onClick={() => setBonusHelp(true)}>
            ✨ <TokenValue amount={balance.bonusBalance} />
          </Bonus>
        )}
        <TokenSelect />
        <UserButton />
      </div>
    </StyledHeader>
  </>
)
}
