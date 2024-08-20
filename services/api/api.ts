export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = useKeycloak().keycloak.value?.token;
  if (!token) {
    throw new Error("No keycloak access token found");
  }

  const url = new URL(path, useRuntimeConfig().public.apiUrl);

  return await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
}
