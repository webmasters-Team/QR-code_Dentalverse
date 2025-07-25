const CornerSquare = ({ color }) => (
  <svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="36" height="36" strokeWidth="6" stroke={color || "#000000"} fill="none" />
  </svg>
);

export default CornerSquare;