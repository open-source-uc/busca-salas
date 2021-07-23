type CardData = { name: string, img: string }

function Card({ name, img }: CardData) {
  // nextjs/Image in this context does not work
  return (
    <li className="card">
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
