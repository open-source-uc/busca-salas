type CardData = { name: string, img: string }

import { useAppDispatch } from "../lib/redux/hooks"
import { search } from "../lib/redux/main/slice"

function Card({ name, img }: CardData) {
  // Note: nextjs/Image in this context does not work
  const dispatch = useAppDispatch()

  return (
    <li className="card" onClick={() => dispatch(search(name))}>
      <div className="content">
        <p>{name}</p>
      </div>
      <img src={img} alt={name} />
    </li>
  )
}

export default function CardContainer({ cards, }: { cards: Array<CardData> }) {
  return (
    <ul className="card-container">
      {cards.map((card, index) => <Card {...card} key={index} />)}
    </ul >
  )
}
