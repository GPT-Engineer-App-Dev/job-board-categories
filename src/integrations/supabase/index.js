import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

Jobs // table: jobs
    id: number
    created_at: string
    jobs_title: string
    job_type: string
    job_area: string

Events // table: events
    id: number
    created_at: string
    name: string
    date: string
    venue_id: number
    is_starred: boolean
    private: boolean
    cancelled: boolean

Comments // table: comments
    id: number
    created_at: string
    content: string
    event_id: number // foreign key to Events

Admins // table: admins
    id: number
    created_at: string
    email: string
    password: string

*/

// Hooks for Jobs table
export const useJobs = () => useQuery({
    queryKey: ['jobs'],
    queryFn: () => fromSupabase(supabase.from('jobs').select('*')),
});

export const useJob = (id) => useQuery({
    queryKey: ['jobs', id],
    queryFn: () => fromSupabase(supabase.from('jobs').select('*').eq('id', id).single()),
});

export const useAddJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newJob) => fromSupabase(supabase.from('jobs').insert([newJob])),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedJob) => fromSupabase(supabase.from('jobs').update(updatedJob).eq('id', updatedJob.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

export const useDeleteJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('jobs').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('jobs');
        },
    });
};

// Hooks for Events table
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['events', id],
    queryFn: () => fromSupabase(supabase.from('events').select('*').eq('id', id).single())),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('events').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for Comments table
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

export const useComment = (id) => useQuery({
    queryKey: ['comments', id],
    queryFn: () => fromSupabase(supabase.from('comments').select('*').eq('id', id).single())),
});

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedComment) => fromSupabase(supabase.from('comments').update(updatedComment).eq('id', updatedComment.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('comments').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Hooks for Admins table
export const useAdmins = () => useQuery({
    queryKey: ['admins'],
    queryFn: () => fromSupabase(supabase.from('admins').select('*')),
});

export const useAdmin = (id) => useQuery({
    queryKey: ['admins', id],
    queryFn: () => fromSupabase(supabase.from('admins').select('*').eq('id', id).single())),
});

export const useAddAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newAdmin) => fromSupabase(supabase.from('admins').insert([newAdmin])),
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
        },
    });
};

export const useUpdateAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedAdmin) => fromSupabase(supabase.from('admins').update(updatedAdmin).eq('id', updatedAdmin.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
        },
    });
};

export const useDeleteAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('admins').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('admins');
        },
    });
};