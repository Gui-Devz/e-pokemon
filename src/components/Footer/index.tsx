import Link from "next/link";

import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";

import styles from "./footer.module.scss";

export function Footer() {
  return (
    <div className={styles.supraContainer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>&copy; 2021 IZA.com.vc</p>
        </div>

        <div className={styles.follow}>
          <span>Follow us:</span>
          <div className={styles.socialMedias}>
            <Link href="https://www.linkedin.com/company/izaseguradora/">
              <a target="_blank" rel="noopener">
                <AiFillLinkedin size="2em" />
              </a>
            </Link>
            <Link href="https://www.facebook.com/izacomvc">
              <a target="_blank" rel="noopener">
                <FaFacebookF size="1.4em" />
              </a>
            </Link>
            <Link href="https://www.instagram.com/iza.com.vc/">
              <a target="_blank" rel="noopener">
                <AiOutlineInstagram size="2em" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
