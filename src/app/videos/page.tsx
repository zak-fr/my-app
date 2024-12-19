'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Video {
  id: number
  name: string
  link: string
  priority: 'High' | 'Medium'
  addedBy: string
  status: 'Done' | 'In Progress'
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [newVideoName, setNewVideoName] = useState('')
  const [newVideoLink, setNewVideoLink] = useState('')
  const [priority, setPriority] = useState('')
  const [addedBy, setAddedBy] = useState('')
  const [status, setStatus] = useState('')
  const [editingVideoId, setEditingVideoId] = useState<number | null>(null)

  const addVideo = () => {
    if (newVideoName.trim() !== '' && isValidUrl(newVideoLink) && priority && addedBy && status) {
      const newId = videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1
      const newVideoData: Video = {
        id: newId,
        name: newVideoName,
        link: newVideoLink,
        priority: priority as 'High' | 'Medium',
        addedBy: addedBy,
        status: status as 'Done' | 'In Progress',
      }
      setVideos([...videos, newVideoData])
      resetFields()
    }
  }

  const resetFields = () => {
    setNewVideoName('')
    setNewVideoLink('')
    setPriority('')
    setAddedBy('')
    setStatus('')
    setEditingVideoId(null)
  }

  const removeVideo = (id: number) => {
    setVideos(videos.filter(video => video.id !== id))
  }

  const editVideo = (id: number) => {
    const videoToEdit = videos.find(video => video.id === id)
    if (videoToEdit) {
      setNewVideoName(videoToEdit.name)
      setNewVideoLink(videoToEdit.link)
      setPriority(videoToEdit.priority)
      setAddedBy(videoToEdit.addedBy)
      setStatus(videoToEdit.status)
      setEditingVideoId(id)
    }
  }

  const saveVideo = () => {
    if (editingVideoId !== null) {
      setVideos(videos.map(video => 
        video.id === editingVideoId
          ? { ...video, name: newVideoName, link: newVideoLink, priority, addedBy, status }
          : video
      ))
      resetFields()
    }
  }

  // Function to validate URL
  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (_) {
      return false;
    }
  }

  return (
    <div className="space-y-4 pl-4">
      <h1 className="text-2xl font-bold mt-4 mb-2">Videos</h1>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="New video name"
          value={newVideoName}
          onChange={(e) => setNewVideoName(e.target.value)}
        />
        <Input
          type="url"
          placeholder="Video Link"
          value={newVideoLink}
          onChange={(e) => setNewVideoLink(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Priority (High, Medium)"
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
        <Button onClick={editingVideoId ? saveVideo : addVideo}>
          {editingVideoId ? 'Save Changes' : 'Add Video'}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Added By</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell>{video.name}</TableCell>
              <TableCell>{video.link}</TableCell>
              <TableCell>{video.priority}</TableCell>
              <TableCell>{video.addedBy}</TableCell>
              <TableCell>{video.status}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => editVideo(video.id)}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeVideo(video.id)}>
                    Delete
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