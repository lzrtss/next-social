interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={`w-full h-full mx-auto px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}
