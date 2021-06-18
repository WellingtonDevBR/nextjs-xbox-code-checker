import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export function TextBoxComponent(props) {
  const [value, setValue] = useState(props.name);

  useEffect(() => {
    console.log(value)
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };

  return (
    <>
      <form id="noter-save-form" method="POST">
        <textarea
          id="noter-text-area"
          name="textarea"
          value={value}
          onChange={handleChange}
        />
        <input type="submit" value="Save" />
      </form>
    </>
  );
}
