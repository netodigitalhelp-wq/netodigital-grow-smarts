-- Create role enum and user_roles table for proper admin access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles without triggering RLS recursion
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Drop the old overly-narrow SELECT policy on contact_submissions
DROP POLICY IF EXISTS "No public read access" ON public.contact_submissions;

-- Explicit deny for anonymous users (defense in depth)
CREATE POLICY "Block anonymous read access"
ON public.contact_submissions
AS RESTRICTIVE
FOR SELECT
TO anon
USING (false);

-- Only admins can read contact submissions
CREATE POLICY "Only admins can read contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Block UPDATE and DELETE for everyone (no policy = denied, but explicit is safer)
CREATE POLICY "Block all updates"
ON public.contact_submissions
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "Block all deletes"
ON public.contact_submissions
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (false);