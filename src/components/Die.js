export default function Die(props) {
  return (
    <div
      onClick={props.holdDie}
      className={props.isHeld ? "held die-component" : "die-component"}
    >
      <h2 className="die-face">{props.value}</h2>
    </div>
  )
}
