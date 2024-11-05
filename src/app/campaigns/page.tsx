'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Campaign {
  id: number
  name: string
  status: string
  link?: string
  comments?: string
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Summer Sale', status: 'Active' },
    { id: 2, name: 'Winter Promo', status: 'Planned' },
  ])
  const [newCampaign, setNewCampaign] = useState('')
  const [newLink, setNewLink] = useState('')
  const [newComment, setNewComment] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  const addCampaign = () => {
    if (newCampaign.trim() !== '') {
      const newId = campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1
      setCampaigns([...campaigns, { id: newId, name: newCampaign, status: 'Planned', link: newLink, comments: newComment }])
      resetForm()
    }
  }

  const editCampaign = (campaign: Campaign) => {
    setEditingId(campaign.id)
    setNewCampaign(campaign.name)
    setNewLink(campaign.link || '')
    setNewComment(campaign.comments || '')
  }

  const updateCampaign = () => {
    if (editingId !== null) {
      setCampaigns(campaigns.map(campaign => 
        campaign.id === editingId 
          ? { ...campaign, name: newCampaign, link: newLink, comments: newComment } 
          : campaign
      ))
      resetForm()
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    resetForm()
    setEditingId(null)
  }

  const removeCampaign = (id: number) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id))
  }

  const resetForm = () => {
    setNewCampaign('')
    setNewLink('')
    setNewComment('')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Campaigns</h1>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="New campaign name"
          value={newCampaign}
          onChange={(e) => setNewCampaign(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Add link"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Add comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={editingId ? updateCampaign : addCampaign}>
          <Plus className="mr-2 h-4 w-4" /> {editingId ? 'Update Campaign' : 'Add Campaign'}
        </Button>
        {editingId && (
          <Button variant="ghost" size="sm" onClick={cancelEdit}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>
                {campaign.link ? <a href={campaign.link} target="_blank" rel="noopener noreferrer">{campaign.link}</a> : 'No link'}
              </TableCell>
              <TableCell>{campaign.comments || 'No comments'}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => editCampaign(campaign)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeCampaign(campaign.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}