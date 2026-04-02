export const DEMO_ACCOUNTS = {
  buyer: {
    email: 'demo.buyer@rangmanch.in',
    password: 'demo123456',
    role: 'buyer',
    displayName: 'Demo Buyer'
  },
  artisan: {
    email: 'demo.artisan@rangmanch.in',
    password: 'demo123456',
    role: 'artisan',
    displayName: 'Demo Artisan'
  },
  ngo: {
    email: 'demo.ngo@rangmanch.in',
    password: 'demo123456',
    role: 'ngo',
    displayName: 'Demo NGO'
  }
};

export const IS_DEMO_MODE = process.env.SUPABASE_URL === undefined ||
  process.env.SUPABASE_URL === 'https://xkucnoazudwushcdiubi.supabase.co' ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY;

export const getDemoAccount = (role: 'buyer' | 'artisan' | 'ngo') => {
  return DEMO_ACCOUNTS[role];
};

export const isDemoEmail = (email: string): boolean => {
  return Object.values(DEMO_ACCOUNTS).some(account => account.email === email);
};

export const getDemoAccountByEmail = (email: string) => {
  const account = Object.values(DEMO_ACCOUNTS).find(acc => acc.email === email);
  return account || null;
};
