import AdminLayoutWrapper from '@/components/AdminLayoutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | UNBLOOMING',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  );
}
