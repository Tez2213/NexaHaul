import AuthGuard from '@/components/AuthGuard';

export default function ShipperLayout({ children }) {
  return (
    <AuthGuard requiredRole="shipper">
      {children}
    </AuthGuard>
  );
}