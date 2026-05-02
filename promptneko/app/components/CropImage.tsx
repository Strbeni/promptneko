export function CropImage({ className }: { className: string }) {
  return (
    <span 
      className={`block bg-no-repeat bg-[url('/image.png')] bg-[length:1536px_1024px] ${className}`} 
      aria-hidden="true" 
    />
  );
}
