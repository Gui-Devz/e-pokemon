import Image from "next/image";

import logoImg from "../../assets/logo.png";

import { FiMapPin } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

import styles from "./header.module.scss";

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <Image src={logoImg} alt="IZA logo" />
      </div>

      <div className={styles.searchBar}>
        <form>
          <div className={styles.input}>
            <input type="text" placeholder="Search for your pokemón" />
            <button type="submit">
              <FiSearch color="#adadad" size="1.5em" />
            </button>
          </div>
        </form>
      </div>

      <div className={styles.cartFavs}>
        <nav>
          <ul>
            <li className={styles.cart}>
              My cart <span>1</span>
            </li>
            <li>Favorites</li>
          </ul>
        </nav>
      </div>
      <div className={styles.location}>
        <p>
          Location{" "}
          <span>
            <FiMapPin color="#ff5048" />
          </span>{" "}
          :
        </p>
        <p className={styles.name}>SP, Brazil</p>
      </div>
    </div>
  );
}
