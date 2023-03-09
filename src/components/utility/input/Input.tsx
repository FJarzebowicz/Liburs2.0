import * as React from "react";

type props = {
  data: obj[];
  label: string;
};
type obj = {
  label: string;
};

export default function Input({ data, label }: props) {
  return (
    <select className="select">
      {data.map((obj) => (
        <option>{obj.label}</option>
      ))}
    </select>
  );
}
