import { GameBundle } from 'gamba-react-ui-v2'
import React from 'react'

export const GAMES: GameBundle[] = [
  // {
  //   id: 'example',
  //   meta: {
  //     background: '#00ffe1',
  //     name: 'Пример',
  //     image: '#',
  //     description: '',
  //   },
  //   app: React.lazy(() => import('./ExampleGame')),
  // },
  {
    id: 'dice',
    meta: {
      background: '#ff6490',
      name: 'Кости',
      image: '/games/dice.png',
      description: `
        Кости бросают вызов игрокам, заставляя их предсказать результат броска с уникальным поворотом. Выберите число и постарайтесь выбросить меньше этого числа, чтобы выиграть. Изменение вашего выбора влияет на потенциальные выплаты, сбалансировав риск и вознаграждение для увлекательного опыта.
      `,
    },
    app: React.lazy(() => import('./Dice')),
  },
  {
    id: 'slots',
    meta: {
      background: '#5465ff',
      name: 'Слот-машина',
      image: '/games/slots.png',
      description: `
        Слот-машина — это классическая игра удачи и ожидания. Крутите барабаны и сопоставляйте символы, чтобы выиграть, с потенциальными наградами, отображенными заранее. Справедливая и захватывающая игра, Слот-машина предлагает классический казино-опыт, адаптированный для цифрового удовольствия.
      `,
    },
    app: React.lazy(() => import('./Slots')),
  },
  {
    id: 'flip',
    meta: {
      name: 'Монета',
      description: `
        Монета предлагает простую, но захватывающую ставку: выберите Орел или Решка и удвойте свои деньги или потеряйте всё. Эта простая игра с высокими ставками проверяет вашу удачу и принятие решений с каждым броском монеты.
      `,
      image: '/games/flip.png',
      background: '#ffe694',
    },
    app: React.lazy(() => import('./Flip')),
  },
  {
    id: 'hilo',
    meta: {
      name: 'HiLo',
      image: '/games/hilo.png',
      description: `
        HiLo — это игра предвидения и удачи, бросающая вызов игрокам угадать, будет ли следующая карта выше или ниже. Сделайте последовательные правильные догадки, чтобы увеличить свои выигрыши, и решите, когда выйти из игры для максимальных вознаграждений.
      `,
      background: '#ff4f4f',
    },
    props: { logo: '/logo.svg' },
    app: React.lazy(() => import('./HiLo')),
  },
  {
    id: 'mines',
    meta: {
      name: 'Мины',
      description: `
        Под квадратами скрыты деньги. Вознаграждение увеличится по мере того, как вы открываете больше квадратов, но остерегайтесь 5 скрытых мин. Коснитесь одной из них, и вы обанкротитесь. Вы можете забрать деньги в любой момент.
      `,
      image: '/games/mines.png',
      background: '#8376ff',
    },
    app: React.lazy(() => import('./Mines')),
  },
  {
    id: 'roulette',
    meta: {
      name: 'Рулетка',
      image: '/games/roulette.png',
      description: `
        Рулетка переносит классическую игру с колесом в цифровой формат. Ставьте на то, куда упадет шарик, и наблюдайте, как колесо решает вашу судьбу. С простыми правилами и возможностью крупных выигрышей, Рулетка — это вечная игра случая.
      `,
      background: '#1de87e',
    },
    app: React.lazy(() => import('./Roulette')),
  },
  {
    id: 'plinko',
    meta: {
      background: '#7272ff',
      image: '/games/plinko.png',
      name: 'Плинко',
      description: `
        Плинко играется путем сбрасывания фишек на доску с штырями, где они случайным образом попадают в ячейки с различными суммами выигрыша. Каждый сброс — это смесь ожидания и стратегии, что делает Плинко бесконечно увлекательной игрой случая.
        ⚠️ В разработке. Результаты могут быть неверными. ⚠️
      `,
    },
    app: React.lazy(() => import('./Plinko')),
  },
  {
    id: 'crash',
    meta: {
      background: '#de95e8',
      image: '/games/crash.png',
      name: 'Краш',
      description: `
      Предскажите целевой множитель и наблюдайте, как ракета пытается его достичь. Если ракета взорвется до достижения цели, игрок проигрывает; если она достигает или превышает цель, игрок выигрывает.
      `,
    },
    app: React.lazy(() => import('./CrashGame')),
  },
]
