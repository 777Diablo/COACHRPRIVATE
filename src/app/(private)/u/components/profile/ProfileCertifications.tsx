'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { api } from '@/trpc/react';
import { type GetOneUserResponse } from '@/types';
import { HiSkeleton } from '@hidstech/common_components';

// Certification Schema
const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  issueDate: z.string().min(1, 'Issue date is required'),
  expiration: z.string().optional(),
});

// Project Schema
const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

type CertificationFormValues = z.infer<typeof certificationSchema>;
type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProfileCertificationsProps {
  isLoading: boolean;
  data: GetOneUserResponse;
}


type CertificationType = {
  name: string;
  issuer: string;
  issueDate: Date;
  expiration?: Date; 
};

export default function ProfileCertifications({ isLoading, data }: ProfileCertificationsProps) {
  // Certifications state
  const [certifications, setCertifications] = useState<CertificationType[]>([]);
  const {
    register: certRegister,
    handleSubmit: handleCertSubmit,
    reset: resetCertForm,
    formState: { errors: certErrors, isSubmitting: isCertSubmitting },
  } = useForm<CertificationFormValues>({
    resolver: zodResolver(certificationSchema),
  });

  // Projects state
  const [projects, setProjects] = useState<Array<{ title: string; description: string }>>([]);
  const {
    register: projectRegister,
    handleSubmit: handleProjectSubmit,
    reset: resetProjectForm,
    formState: { errors: projectErrors, isSubmitting: isProjectSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const utils = api.useUtils();
  const updateMutation = api.user.update.useMutation({
    onSuccess: () => {
      toast.success('Profile updated successfully');
      void utils.user.getOne.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update profile');
    },
  });

  
useEffect(() => {
  if (!isLoading && data) {
    const certs = (data.certifications ?? []).map(c => ({
      ...c,
      issueDate: new Date(c.issueDate),
      expiration: c.expiration ? new Date(c.expiration) : undefined, 
    }));
    
    setCertifications(certs);
    setProjects(data.projects ?? []);
  }
}, [data, isLoading]);

  

const handleAddCertification = async (values: CertificationFormValues) => {
  if (!data?.id) return;

  const newCert = {
    name: values.name,
    issuer: values.issuer,
    issueDate: new Date(values.issueDate),
    expiration: values.expiration ? new Date(values.expiration) : undefined, 
  };

  const updatedCerts = [...certifications, newCert];
 
  try {
    await updateMutation.mutateAsync({
      id: data.id,
      certifications: updatedCerts,
    });
    resetCertForm();
  } catch (error) {
    console.error(error);
  }
};

const handleRemoveCertification = async (index: number) => {
  if (!data?.id) return;

  const updatedCerts = certifications.filter((_, i) => i !== index);
  try {
    await updateMutation.mutateAsync({
      id: data.id,
      certifications: updatedCerts,
    });
  } catch (error) {
    console.error(error);
  }
};


  // Project Handlers
  const handleAddProject = async (values: ProjectFormValues) => {
    if (!data?.id) return;
  
    const updatedProjects = [...projects, values];
   
    try {
      await updateMutation.mutateAsync({
        id: data.id,
        projects: updatedProjects,
      });
      resetProjectForm();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleRemoveProject = async (index: number) => {
    if (!data?.id) return;
  
    const updatedProjects = projects.filter((_, i) => i !== index);
    try {
      await updateMutation.mutateAsync({
        id: data.id,
        projects: updatedProjects,
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Certifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <HiSkeleton className="h-4 w-1/3" />
                  <HiSkeleton className="h-10 w-full" />
                </div>
              ))}
              <HiSkeleton className="h-10 w-[160px]" />
            </div>
          ) : (
            <form onSubmit={handleCertSubmit(handleAddCertification)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Certification Name</Label>
                  <Input
                    id="name"
                    {...certRegister('name')}
                    className={certErrors.name ? 'border-destructive' : ''}
                    disabled={isCertSubmitting}
                  />
                  {certErrors.name && (
                    <p className="text-sm text-destructive">{certErrors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issuer">Issuing Organization</Label>
                  <Input
                    id="issuer"
                    {...certRegister('issuer')}
                    className={certErrors.issuer ? 'border-destructive' : ''}
                    disabled={isCertSubmitting}
                  />
                  {certErrors.issuer && (
                    <p className="text-sm text-destructive">{certErrors.issuer.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issueDate">Issue Date</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    {...certRegister('issueDate')}
                    className={certErrors.issueDate ? 'border-destructive' : ''}
                    disabled={isCertSubmitting}
                  />
                  {certErrors.issueDate && (
                    <p className="text-sm text-destructive">{certErrors.issueDate.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiration">Expiration Date (optional)</Label>
                  <Input
                    id="expiration"
                    type="date"
                    {...certRegister('expiration')}
                    className={certErrors.expiration ? 'border-destructive' : ''}
                    disabled={isCertSubmitting}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isCertSubmitting || updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Certification
                  </>
                )}
              </Button>
            </form>
          )}

          <AnimatePresence>
            {certifications.map((certification, index) => (
              <motion.div
                key={`${certification.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
                  <div>
                    <h3 className="font-medium">{certification.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {certification.issuer} • 
                      Issued: {certification.issueDate.toLocaleDateString()}
                      {certification.expiration && ` • Expires: ${certification.expiration.toLocaleDateString()}`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveCertification(index)}
                    disabled={updateMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <CardTitle>Projects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <HiSkeleton className="h-4 w-1/3" />
                  <HiSkeleton className={i === 0 ? 'h-10 w-full' : 'h-20 w-full'} />
                </div>
              ))}
              <HiSkeleton className="h-10 w-[160px]" />
            </div>
          ) : (
            <form onSubmit={handleProjectSubmit(handleAddProject)} className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    {...projectRegister('title')}
                    className={projectErrors.title ? 'border-destructive' : ''}
                    disabled={isProjectSubmitting}
                  />
                  {projectErrors.title && (
                    <p className="text-sm text-destructive">{projectErrors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    {...projectRegister('description')}
                    className={projectErrors.description ? 'border-destructive' : ''}
                    disabled={isProjectSubmitting}
                    rows={4}
                  />
                  {projectErrors.description && (
                    <p className="text-sm text-destructive">{projectErrors.description.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProjectSubmitting || updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </>
                )}
              </Button>
            </form>
          )}

          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProject(index)}
                    disabled={updateMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}