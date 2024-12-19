'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BarChart, Film, Users, MessageSquare, Home, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Campaigns', href: '/campaigns', icon: BarChart },
  { name: 'Videos', href: '/videos', icon: Film },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Comments', href: '/comments', icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the user is authenticated only on the client side
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated') // Clear authentication status
    router.push('/login') // Redirect to the login page
  }

  // If not authenticated or on the login page, return null to not render the sidebar
  if (isAuthenticated === null || !isAuthenticated || pathname === '/login') {
    return null;
  }

  return (
    <nav className="w-64 bg-white shadow-md h-screen flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Marketing Dashboard</h1>
      </div>
      <div className="p-4 border-t border-b border-gray-200 flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-gray-500">john@example.com</p>
        </div>
      </div>
      <ul className="space-y-2 py-4 flex-grow">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                pathname === item.href ? 'bg-gray-200' : ''
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-3 text-white bg-black hover:bg-gray-800 rounded-lg shadow-md transition duration-200 mt-4"
      >
        <LogOut className="mr-3 h-5 w-5" />
        Logout
      </button>
    </nav>
  )
}