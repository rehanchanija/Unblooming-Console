import AdminSidebar from '@/components/AdminSidebar';
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
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
