'use client'

import { useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Campaign {
  id: number
  name: string
  dateCreated: Date
  dateDeadline: Date
  priority: 'High' | 'Medium' | 'Low'
  addedBy: string
  status: 'Done' | 'In Progress' | 'Active' | 'Planned'
  budget: number
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Summer Sale', status: 'Active', budget: 5000, dateCreated: new Date(), dateDeadline: new Date(), priority: 'High', addedBy: 'User1' },
    { id: 2, name: 'Winter Promo', status: 'Planned', budget: 3000, dateCreated: new Date(), dateDeadline: new Date(), priority: 'Medium', addedBy: 'User2' },
  ])
  
  const [newCampaign, setNewCampaign] = useState('')
  const [dateCreated, setDateCreated] = useState('')
  const [dateDeadline, setDateDeadline] = useState('')
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('High')
  const [addedBy, setAddedBy] = useState('')
  const [status, setStatus] = useState<'Done' | 'In Progress' | 'Active' | 'Planned'>('Active')
  const [editingCampaignId, setEditingCampaignId] = useState<number | null>(null)

  // Define the resetForm function
  const resetForm = () => {
    setNewCampaign('')
    setDateCreated('')
    setDateDeadline('')
    setPriority('High')
    setAddedBy('')
    setStatus('Active')
  }

  const addCampaign = async () => {
    if (newCampaign.trim() !== '' && dateCreated && dateDeadline && priority && addedBy && status) {
      const newCampaignData: Campaign = {
        id: campaigns.length + 1, // Simple ID generation
        name: newCampaign,
        dateCreated: new Date(dateCreated),
        dateDeadline: new Date(dateDeadline),
        priority,
        addedBy,
        status,
        budget: 0, // Default budget
      }

      console.log('New Campaign Data:', newCampaignData)

      // Simulate API call
      setCampaigns([...campaigns, newCampaignData])
      resetForm() // Call resetForm to clear the input fields
    } else {
      console.error('Please fill in all fields.')
    }
  }

  const removeCampaign = (id: number) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id))
  }

  const editCampaign = (id: number) => {
    const campaignToEdit = campaigns.find(campaign => campaign.id === id)
    if (campaignToEdit) {
      setNewCampaign(campaignToEdit.name)
      setDateCreated(campaignToEdit.dateCreated.toISOString().split('T')[0])
      setDateDeadline(campaignToEdit.dateDeadline.toISOString().split('T')[0])
      setPriority(campaignToEdit.priority)
      setAddedBy(campaignToEdit.addedBy)
      setStatus(campaignToEdit.status)
      setEditingCampaignId(id)
    }
  }

  const saveCampaign = () => {
    if (editingCampaignId !== null) {
      setCampaigns(campaigns.map(campaign => 
        campaign.id === editingCampaignId
          ? { 
              ...campaign, 
              name: newCampaign, 
              dateCreated: new Date(dateCreated), 
              dateDeadline: new Date(dateDeadline), 
              priority, 
              addedBy, 
              status 
            }
          : campaign
      ))
      resetForm() // Reset the form after saving
      setEditingCampaignId(null) // Reset editing state
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold pl-4 mt-4">Campaigns</h1>
      <div className="flex space-x-2 mt-2">
        <Input
          type="text"
          placeholder="New campaign name"
          value={newCampaign}
          onChange={(e) => setNewCampaign(e.target.value)}
          className="pl-2"
        />
        <Input
          type="date"
          placeholder="Date Created"
          value={dateCreated}
          onChange={(e) => setDateCreated(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Date Deadline"
          value={dateDeadline}
          onChange={(e) => setDateDeadline(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Priority (High, Medium, Low)"
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
        />
        <Input
          type="text"
          placeholder="Added By"
          value={addedBy}
          onChange={(e) => setAddedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Status (Done, In Progress, Active, Planned)"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'Done' | 'In Progress' | 'Active' | 'Planned')}
        />
        <Button onClick={editingCampaignId ? saveCampaign : addCampaign}>
          {editingCampaignId ? 'Save Changes' : 'Add Campaign'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date Created</TableHead>
            <TableHead>Date Deadline</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Added By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.dateCreated.toLocaleDateString()}</TableCell>
              <TableCell>{campaign.dateDeadline.toLocaleDateString()}</TableCell>
              <TableCell>{campaign.priority}</TableCell>
              <TableCell>{campaign.addedBy}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => editCampaign(campaign.id)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeCampaign(campaign.id)}>
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