import axios from 'axios';
import type { NewNote, Note } from '../../types/note';
import { API_URL } from '../config/constanst';

axios.defaults.baseURL = API_URL;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  searchValue: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      ...(searchValue !== '' && { search: searchValue }),
      page,
      perPage: 12,
      ...(tag && { tag }),
    },
  });
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await axios.post<Note>('/notes', newNote, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return data;
}
