import { supabase } from "./supabaseClient";

export async function uploadDocument(file: File, projectId: number) {
  const filePath = `projects/${projectId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(filePath, file);

  if (error) throw error;

  return filePath;
}
