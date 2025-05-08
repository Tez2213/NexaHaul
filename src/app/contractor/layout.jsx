import AuthGuard from '@/components/AuthGuard';

export default function ContractorLayout({ children }) {
  return (
    <AuthGuard requiredRole="contractor">
      {children}
    </AuthGuard>
  );
}