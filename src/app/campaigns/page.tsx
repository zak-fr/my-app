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
  status: 'Done' | 'In Progress'
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: 'Summer Sale', status: 'Active', budget: 5000 },
    { id: 2, name: 'Winter Promo', status: 'Planned', budget: 3000 },
  ])
  const [newCampaign, setNewCampaign] = useState('')
  const [filterName, setFilterName] = useState('');
  const [filterDateCreated, setFilterDateCreated] = useState('');
  const [filterDateDeadline, setFilterDateDeadline] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterAddedBy, setFilterAddedBy] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [dateCreated, setDateCreated] = useState('');
  const [dateDeadline, setDateDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [status, setStatus] = useState('');
  const [editingCampaignId, setEditingCampaignId] = useState<number | null>(null);

  const addCampaign = async () => {
    if (newCampaign.trim() !== '' && dateCreated && dateDeadline && priority && addedBy && status) {
      const newCampaignData = {
        name: newCampaign,
        dateCreated: new Date(dateCreated),
        dateDeadline: new Date(dateDeadline),
        priority,
        addedBy,
        status,
      };

      console.log('New Campaign Data:', newCampaignData);

      const response = await fetch('http://localhost:1337/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCampaignData),
      });

      if (response.ok) {
        const savedCampaign = await response.json();
        setCampaigns([...campaigns, savedCampaign]);
        resetForm();
      } else {
        console.error('Error adding campaign:', response.statusText);
      }
    }
  };

  const removeCampaign = (id: number) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id))
  }

  // Function to sort campaigns based on the selected field
  const sortCampaigns = (field: keyof Campaign) => {
    const sortedCampaigns = [...campaigns].sort((a, b) => {
      if (typeof a[field] === 'string' && typeof b[field] === 'string') {
        return a[field].localeCompare(b[field]);
      }
      return (a[field] as any) - (b[field] as any);
    });
    setCampaigns(sortedCampaigns);
  }

  // Function to filter campaigns based on the input fields
  const filteredCampaigns = campaigns.filter(campaign => {
    return (
      (filterName === '' || campaign.name.toLowerCase().includes(filterName.toLowerCase())) &&
      (filterDateCreated === '' || campaign.dateCreated.toLocaleDateString() === filterDateCreated) &&
      (filterDateDeadline === '' || campaign.dateDeadline.toLocaleDateString() === filterDateDeadline) &&
      (filterPriority === '' || campaign.priority === filterPriority) &&
      (filterAddedBy === '' || campaign.addedBy.toLowerCase().includes(filterAddedBy.toLowerCase())) &&
      (filterStatus === '' || campaign.status === filterStatus)
    );
  });

  // Function to handle editing a campaign
  const editCampaign = (id: number) => {
    const campaignToEdit = campaigns.find(campaign => campaign.id === id);
    if (campaignToEdit) {
      setNewCampaign(campaignToEdit.name);
      setDateCreated(campaignToEdit.dateCreated ? campaignToEdit.dateCreated.toISOString().split('T')[0] : '');
      setDateDeadline(campaignToEdit.dateDeadline ? campaignToEdit.dateDeadline.toISOString().split('T')[0] : '');
      setPriority(campaignToEdit.priority);
      setAddedBy(campaignToEdit.addedBy);
      setStatus(campaignToEdit.status);
      setEditingCampaignId(id); // Set the ID of the campaign being edited
    }
  };

  // Function to save the edited campaign
  const saveCampaign = () => {
    if (editingCampaignId !== null) {
      setCampaigns(campaigns.map(campaign => 
        campaign.id === editingCampaignId
          ? { ...campaign, name: newCampaign, dateCreated: new Date(dateCreated), dateDeadline: new Date(dateDeadline), priority, addedBy, status }
          : campaign
      ));
      // Reset the input fields
      setNewCampaign('');
      setDateCreated('');
      setDateDeadline('');
      setPriority('');
      setAddedBy('');
      setStatus('');
      setEditingCampaignId(null); // Reset editing state
    }
  };

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
          onChange={(e) => setPriority(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Added By"
          value={addedBy}
          onChange={(e) => setAddedBy(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Status (Done, In Progress)"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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
          {filteredCampaigns.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.dateCreated ? campaign.dateCreated.toLocaleDateString() : 'N/A'}</TableCell>
              <TableCell>{campaign.dateDeadline ? campaign.dateDeadline.toLocaleDateString() : 'N/A'}</TableCell>
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