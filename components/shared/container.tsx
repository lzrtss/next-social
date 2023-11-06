interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={`max-w-7xl h-full mx-auto px-6 py-3 ${className}`}>
      {children}
    </div>
  );
}
