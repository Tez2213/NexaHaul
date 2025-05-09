import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('nexahaul_token');
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('nexahaul_token');
  if (!token) return false;
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return !!payload;
  } catch {
    return false;
  }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
  } catch {
    return null;
  }
}

export function getUser() {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('nexahaul_user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

export function setAuth(token: string, user: any) {
  localStorage.setItem('nexahaul_token', token);
  localStorage.setItem('nexahaul_user', JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem('nexahaul_token');
  localStorage.removeItem('nexahaul_user');
}