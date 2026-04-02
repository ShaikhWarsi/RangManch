import { Router } from "express";
import supabase from "../db";
import { DEMO_ACCOUNTS, IS_DEMO_MODE, getDemoAccountByEmail } from "../config/demoAccounts";

const router = Router();

router.post("/signup", async (req: any, res: any) => {
  try {
    const { email, password, userData } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    if (IS_DEMO_MODE) {
      const existingDemo = getDemoAccountByEmail(email);
      if (existingDemo) {
        return res.status(400).json({
          success: false,
          error: "This is a demo account and cannot be modified"
        });
      }

      return res.status(201).json({
        success: true,
        isDemoMode: true,
        user: {
          email,
          role: userData?.role || "buyer",
          displayName: userData?.name || email.split("@")[0],
          isDemoAccount: false
        },
        message: "Demo mode: Account created (not persisted)"
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: userData?.role || "buyer",
          display_name: userData?.name || email.split("@")[0]
        }
      }
    });

    if (error) throw error;

    res.status(201).json({
      success: true,
      user: data.user,
      session: data.session
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/login", async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required" });
    }

    if (IS_DEMO_MODE) {
      const demoAccount = getDemoAccountByEmail(email);

      if (demoAccount && demoAccount.password === password) {
        return res.json({
          success: true,
          isDemoMode: true,
          user: {
            email: demoAccount.email,
            role: demoAccount.role,
            displayName: demoAccount.displayName,
            isDemoAccount: true
          },
          message: "Logged in with demo account"
        });
      }

      return res.status(401).json({
        success: false,
        error: "Invalid demo credentials. Use the demo buttons below."
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    res.json({
      success: true,
      user: data.user,
      session: data.session
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/logout", async (req: any, res: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (IS_DEMO_MODE) {
      return res.json({ success: true, message: "Demo mode: Logged out" });
    }

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/session", async (req: any, res: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ success: false, error: "No authorization header" });
    }

    const token = authHeader.split(" ")[1];

    if (IS_DEMO_MODE) {
      return res.json({
        success: true,
        isDemoMode: true,
        user: null,
        message: "Demo mode: No session validation"
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error) throw error;

    res.json({
      success: true,
      user: data.user
    });
  } catch (error: any) {
    console.error("Session error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/demo-accounts", (req: any, res: any) => {
  res.json({
    success: true,
    demoAccounts: Object.entries(DEMO_ACCOUNTS).map(([role, account]) => ({
      role,
      email: account.email,
      displayName: account.displayName
    }))
  });
});

export default router;
