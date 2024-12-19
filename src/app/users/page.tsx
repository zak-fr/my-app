'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Select from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface User {
  id: number
  name: string
  dateCreated: Date
  email: string
  whatsappNumber: string
  type: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', dateCreated: new Date(), email: 'john@example.com', whatsappNumber: '1234567890', type: 'Admin' },
  ])
  
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newWhatsappNumber, setNewWhatsappNumber] = useState('')
  const [newRole, setNewRole] = useState('')
  const [editingUserId, setEditingUserId] = useState<number | null>(null)

  const addUser = () => {
    if (newName.trim() !== '' && newEmail && newWhatsappNumber && newRole) {
      const newUser: User = {
        id: users.length + 1, // Simple ID generation
        name: newName,
        dateCreated: new Date(),
        email: newEmail,
        whatsappNumber: newWhatsappNumber,
        type: newRole
      };

      setUsers([...users, newUser]);
      resetForm();
    }
  };

  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  const editUser = (id: number) => {
    const userToEdit = users.find(user => user.id === id);
    if (userToEdit) {
      setNewName(userToEdit.name);
      setNewEmail(userToEdit.email);
      setNewWhatsappNumber(userToEdit.whatsappNumber);
      setNewRole(userToEdit.type);
      setEditingUserId(id);
    }
  };

  const saveChanges = () => {
    if (editingUserId !== null) {
      setUsers(users.map(user => 
        user.id === editingUserId
          ? { ...user, name: newName, email: newEmail, whatsappNumber: newWhatsappNumber, type: newRole }
          : user
      ));
      resetForm();
    }
  };

  const resetForm = () => {
    setNewName('');
    setNewEmail('');
    setNewWhatsappNumber('');
    setNewRole('');
    setEditingUserId(null);
  };

  return (
    <div className="space-y-4 pl-4">
      <h1 className="text-2xl font-bold mt-6 mb-2">Users</h1>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="New user name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="WhatsApp Number"
          value={newWhatsappNumber}
          onChange={(e) => setNewWhatsappNumber(e.target.value)}
        />
        <Select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          placeholder="Select role"
        >
          <option value="Marketer">Marketer</option>
          <option value="Video Editor">Video Editor</option>
          <option value="Videographer">Videographer</option>
          <option value="Admin">Admin</option>
        </Select>
        <Button onClick={editingUserId ? saveChanges : addUser}>
          {editingUserId ? 'Save Changes' : <><Plus className="mr-2 h-4 w-4" /> Add User</>}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>WhatsApp Number</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.dateCreated.toLocaleDateString()}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.whatsappNumber}</TableCell>
              <TableCell>{user.type}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => editUser(user.id)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeUser(user.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}