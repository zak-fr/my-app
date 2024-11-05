import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Film, Plus } from "lucide-react"

export default function VideosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Videos</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input placeholder="Search videos..." className="w-64" />
          <Button>Search</Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Video
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Introduction to Marketing</TableCell>
            <TableCell>10:30</TableCell>
            <TableCell>2023-05-15</TableCell>
            <TableCell>1,234</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Social Media Strategies</TableCell>
            <TableCell>15:45</TableCell>
            <TableCell>2023-05-20</TableCell>
            <TableCell>2,567</TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </div>
  )
}