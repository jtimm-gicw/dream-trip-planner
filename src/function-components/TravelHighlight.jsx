// CLASS 26 REVIEW: One reusable component used with different props.
// text is given to us by the parent; this component only displays it.
export default function TravelHighlight({ text }) {
  return <span className="travel-highlight">{text}</span>;
}
