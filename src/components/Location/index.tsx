import { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";

import styles from "./location.module.scss";

type Location = {
  country: string;
  region: string;
};

export function Location() {
  const [location, setLocation] = useState<Location>({} as Location);

  const gettingLocationByIpAddress = async () => {
    try {
      const responseNativeApi = await fetch("/api/ip-address");
      const userIp = await responseNativeApi.json();
      const responseIpApi: Response = await fetch(
        `http://ip-api.com/json/${userIp.ip}?fields=country,region`
      );
      const location = await responseIpApi.json();

      setLocation(location);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    gettingLocationByIpAddress();
  }, []);
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
        {location.region}, {location.country}
      </p>
    </div>
  );
}
