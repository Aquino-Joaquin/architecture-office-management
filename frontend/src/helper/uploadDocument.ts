import { supabase } from "./supabaseClient";

export async function uploadDocument(
  file: File,
  fileName: string,
  projectId: number,
) {
  const filePath = `projects/${projectId}/${Date.now()}-${fileName}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(filePath, file);

  if (error) throw error;

  return filePath;
}
