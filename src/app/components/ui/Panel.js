export default function Panel({ children, className = '' }) {
  return (
    <div className={`panel-base panel-theme ${className}`}>
      {children}
    </div>
  );
}
