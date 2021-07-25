import Link from "next/link"

export default function Footer() {
  return (
    <footer>
      <div>
        Creado por Benjamín Vicente.
      </div>
      <div>
        <Link href="/about">
          <a>Más información</a>
        </Link>
      </div>
    </footer>
  )
}
