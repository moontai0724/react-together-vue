import { request } from "../api";
import type { PaginationStat } from "~/types/api/pagination-stat";
import type { Photo } from "~/types/api/photo";

export interface PhotoListParams {
  page: number;
  size: number;
}

export interface PhotoListResponse {
  data: Photo[];
  pagination: PaginationStat;
}

export async function list({
  page,
  size,
}: PhotoListParams): Promise<PhotoListResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", page.toString());
  searchParams.set("size", size.toString());

  return await request<PhotoListResponse>(`/photos?${searchParams.toString()}`);
}
