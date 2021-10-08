import { FiMapPin } from "react-icons/fi";
import styles from "./location.module.scss";

type Location = {
  region: string;
  country: string;
};

export function Location({ region = "SP", country = "brazil" }: Location) {
  return (
    <div className={styles.container}>
      <p>
        Location{" "}
        <span>
          <FiMapPin color="#ff5048" />
        </span>{" "}
        :
      </p>
      <p className={styles.name}>
        {region}, {country}
      </p>
    </div>
  );
}
