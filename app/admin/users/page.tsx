'use client'

import React, { useState } from 'react'
import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { authClient } from '@/lib/auth-client'
import {
  Users,
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserPlus,
  Edit,
  Save,
  Trash2,
  ExternalLink,
  Plus,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  X
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ImageUploader } from '@/components/ui/image-uploader'
import { toast } from '@/components/ui/toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export default function AdminUsersPage() {
  const session = authClient.useSession()
  const usersList = useQuery(
    api.users.list,
    session.data?.user ? {} : 'skip'
  )
  const currentUserWithProfile = useQuery(
    api.users.getCurrentUserWithProfile,
    session.data?.user ? {} : 'skip'
  )

  const updateUserRole = useMutation(api.users.updateUserRole)
  const updateProfile = useMutation(api.users.updateProfile)

  const [searchQuery, setSearchQuery] = useState('')
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const filteredUsers = (usersList || []).filter((u: any) => {
    const q = searchQuery.toLowerCase()
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.role && u.role.toLowerCase().includes(q))
    )
  })

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'user' | 'editor') => {
    try {
      await updateUserRole({ userId, role: newRole })
      toast.add({
        title: 'Role Updated',
        description: `User role has been changed to ${newRole.toUpperCase()}.`,
        type: 'success',
      })
    } catch (err: any) {
      console.error(err)
      toast.add({
        title: 'Failed to update role',
        description: err?.message || 'Permission denied',
        type: 'error',
      })
    }
  }

  const handleSaveProfile = async () => {
    if (!editingUser) return
    try {
      setIsSaving(true)
      await updateProfile({
        userId: editingUser.userId,
        name: editingUser.name,
        bio: editingUser.bio,
        phone: editingUser.phone,
        profilePic: editingUser.profilePic,
        profilePicStorageId: editingUser.profilePicStorageId,
        socials: editingUser.socials,
      })

      toast.add({
        title: 'Profile Saved',
        description: 'User profile details updated in Convex.',
        type: 'success',
      })
      setEditingUser(null)
    } catch (err: any) {
      console.error(err)
      toast.add({
        title: 'Save Failed',
        description: err?.message || 'Error updating profile',
        type: 'error',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const addSocialToEditingUser = () => {
    if (!editingUser) return
    const currentSocials = editingUser.socials || []
    setEditingUser({
      ...editingUser,
      socials: [
        ...currentSocials,
        { platform: 'github', label: 'GitHub', url: 'https://github.com/' },
      ],
    })
  }

  const removeSocialFromEditingUser = (index: number) => {
    if (!editingUser) return
    const currentSocials = [...(editingUser.socials || [])]
    currentSocials.splice(index, 1)
    setEditingUser({
      ...editingUser,
      socials: currentSocials,
    })
  }

  const updateSocialField = (index: number, field: string, value: string) => {
    if (!editingUser) return
    const currentSocials = [...(editingUser.socials || [])]
    currentSocials[index] = {
      ...currentSocials[index],
      [field]: value,
    }
    setEditingUser({
      ...editingUser,
      socials: currentSocials,
    })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/15 via-card to-card p-6 sm:p-8">
        <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="success">Convex RBAC Active</Badge>
              <span className="text-[11px] font-mono text-muted-foreground">
                Total Users: {usersList?.length ?? '...'}
              </span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
              User Management & Access Control
            </h2>
         
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                  {currentUserWithProfile?.user?.name ? currentUserWithProfile.user.name.substring(0, 1).toUpperCase() : 'ME'}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or role..."
            className="pl-9 text-xs"
          />
        </div>

        <div className="text-xs text-muted-foreground">
          Showing <strong>{filteredUsers.length}</strong> of <strong>{usersList?.length || 0}</strong> users
        </div>
      </div>

      {/* Users Grid */}
      {usersList === undefined ? (
        <div className="flex justify-center p-12">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <Card className="p-12 text-center">
          <Users className="mx-auto size-12 text-muted-foreground/50" />
          <p className="mt-4 text-base font-semibold">No users found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {searchQuery ? 'Try adjusting your search criteria' : 'Users will appear here once they register.'}
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user: any) => {
            const isAdmin = user.role === 'admin'
            return (
              <Card
                key={user._id}
                className="group relative overflow-hidden border-border/80 bg-card hover:border-primary/50 transition-all hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted/60">
                          {user.profilePic ? (
                            <img
                              src={user.profilePic}
                              alt={user.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center font-bold text-primary text-lg">
                              {(user.name || user.email || 'U').substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-bold tracking-tight">{user.name || 'Anonymous User'}</h3>
                          <p className="truncate text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Mail className="size-3" />
                            {user.email}
                          </p>
                          
                      <Badge
                        variant={isAdmin ? 'default' : 'secondary'}
                        className="shrink-0 uppercase text-[9px] mt-2"
                      >
                        {isAdmin ? (
                          <ShieldCheck className="size-3 mr-1 text-emerald-400" />
                        ) : (
                          <UserCheck className="size-3 mr-1" />
                        )}
                        {user.role}
                      </Badge>
                        </div>
                        
                      </div>

                    </div>
                  </CardHeader>

                  <CardContent className="p-5 pt-2 space-y-4">
                    {user.bio && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic">
                        &quot;{user.bio}&quot;
                      </p>
                    )}

                    {/* Socials preview */}
                    {user.socials && user.socials.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
                          Connected Socials
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {user.socials.map((s: any, idx: number) => (
                            <a
                              key={idx}
                              href={s.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-border bg-muted/40 px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            >
                              <span>{s.label || s.platform}</span>
                              <ExternalLink className="size-2.5" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active'}
                      </span>
                      {user.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="size-3" /> {user.phone}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="p-5 pt-0 border-t border-border/50 mt-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">Role:</span>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.userId, e.target.value as any)}
                      className="rounded-lg border border-border bg-background px-2 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </select>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => setEditingUser(user)}
                  >
                    <Edit className="size-3 mr-1" />
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-background p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold">Edit User Profile</h3>
                <p className="text-xs text-muted-foreground">
                  Update personal info, socials, and avatar stored in Convex.
                </p>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Avatar Upload with Convex Storage */}
              <div className="space-y-1.5">
                <Label>Profile Picture (Convex Storage)</Label>
                <ImageUploader
                  value={editingUser.profilePic}
                  onChange={(url, storageId) =>
                    setEditingUser({
                      ...editingUser,
                      profilePic: url,
                      profilePicStorageId: storageId,
                    })
                  }
                  aspectRatio="square"
                  placeholder="Upload profile photo"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Full Name</Label>
                  <Input
                    value={editingUser.name || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    placeholder="e.g. Victor Maina"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number</Label>
                  <Input
                    value={editingUser.phone || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    placeholder="+254 700 000 000"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Bio / Headline</Label>
                <Input
                  value={editingUser.bio || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, bio: e.target.value })}
                  placeholder="Full-Stack Engineer & Designer..."
                />
              </div>

              {/* Social Profiles */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label>Social Profiles</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={addSocialToEditingUser}
                  >
                    <Plus className="size-3 mr-1" /> Add Social
                  </Button>
                </div>

                <div className="space-y-2">
                  {(editingUser.socials || []).map((s: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Input
                        value={s.label || ''}
                        onChange={(e) => updateSocialField(idx, 'label', e.target.value)}
                        placeholder="Platform (e.g. GitHub)"
                        className="w-1/3 text-xs"
                      />
                      <Input
                        value={s.url || ''}
                        onChange={(e) => updateSocialField(idx, 'url', e.target.value)}
                        placeholder="https://..."
                        className="flex-1 text-xs"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="h-9 w-9 p-0"
                        onClick={() => removeSocialFromEditingUser(idx)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <Button variant="outline" onClick={() => setEditingUser(null)} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? <Loader2 className="size-4 animate-spin mr-1" /> : <Save className="size-4 mr-1" />}
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
