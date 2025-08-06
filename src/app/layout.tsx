import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SMIT Placement Portal',
  description: 'Placement Portal for SMIT',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}