'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Campaign {
  id: number
  name: string
  status: string
  budget: number
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Summer Sale', status: 'Active', budget: 5000 },
    { id: 2, name: 'Winter Promo', status: 'Planned', budget: 3000 },
  ])
  const [newCampaign, setNewCampaign] = useState('')

  const addCampaign = () => {
    if (newCampaign.trim() !== '') {
      const newId = campaigns.length > 0 ? Math.max(...campaigns.map(c => c.id)) + 1 : 1
      setCampaigns([...campaigns, { id: newId, name: newCampaign, status: 'Planned', budget: 0 }])
      setNewCampaign('')
    }
  }

  const removeCampaign = (id: number) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id))
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
        <Button onClick={addCampaign}>
          <Plus className="mr-2 h-4 w-4" /> Add Campaign
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.status}</TableCell>
              <TableCell>${campaign.budget.toLocaleString()}</TableCell>
              <TableCell>
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