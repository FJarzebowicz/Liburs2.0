export default function LuckyNumberModal() {
  const theRandomNumber = Math.floor(Math.random() * 35) + 1;
  return (
    <div className="luckyNumber__container">
      <div className="luckyNumber__text ">
        Szczęśliwy
        <br /> numerek
      </div>
      <div className="luckyNumber__number">{theRandomNumber}</div>
    </div>
  );
}
