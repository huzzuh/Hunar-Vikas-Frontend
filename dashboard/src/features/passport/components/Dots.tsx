export default function Dots({ level }: { level: number }) {
  return (
    <span className="dots" aria-label={`Level ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`dot ${i <= level ? 'on' : ''}`} />
      ))}
    </span>
  );
}
