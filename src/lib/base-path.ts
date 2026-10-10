const normalizeBasePath = (value: string) => {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
};

export const basePath = normalizeBasePath(import.meta.env.BASE_URL ?? "/");

export const withBasePath = (path: string) => {
  if (basePath === "/") return path;
  if (path.startsWith("/")) return `${basePath}${path}`;
  return `${basePath}/${path.replace(/^\/+/, "")}`;
};
