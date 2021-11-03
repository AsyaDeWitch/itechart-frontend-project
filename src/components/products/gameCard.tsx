export default function GameCard(props: { productItem: string }): JSX.Element {
  return (
    <div onClick={() => alert("got product!")}>
      <h2>Game {props.productItem}</h2>
    </div>
  );
}
