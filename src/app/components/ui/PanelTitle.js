export default function PanelTitle({ children, className = '' }) {
  return (
    <h2 className={`title-command ${className}`}>
      {children}
    </h2>
  );
}
