import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Navbar() {
  return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link href="/">
          <a className={"navbar-brand " + styles.marginleft} >Shopping Cart</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link href="/">
                <a className="nav-link" >Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/costumer">
                <a className="nav-link" >Costumer</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/product">
                <a className="nav-link" >Product</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/cart">
                <a className="nav-link" >Cart</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
  )
};
