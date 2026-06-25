import { createServerFn } from "@tanstack/react-start";

// In-memory store for 24-hour duplicate lead prevention
// Maps phone number → timestamp of last submission
const recentLeads = new Map<string, number>();
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // 24 hours in ms

function cleanExpiredLeads() {
  const now = Date.now();
  for (const [phone, timestamp] of recentLeads) {
    if (now - timestamp > TWENTY_FOUR_HOURS) {
      recentLeads.delete(phone);
    }
  }
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: {
    name: string;
    phone: string;
    city?: string;
    productName: string;
    price: string;
    submittedAt: string;
    address?: string;
    state?: string;
    pincode?: string;
    note?: string;
  }) => data)
  .handler(async ({ data }) => {
    // 0. Check for duplicate submission within 24 hours
    const phone = data.phone.trim();
    cleanExpiredLeads();

    const lastSubmission = recentLeads.get(phone);
    if (lastSubmission) {
      const elapsed = Date.now() - lastSubmission;
      if (elapsed < TWENTY_FOUR_HOURS) {
        const hoursLeft = Math.ceil((TWENTY_FOUR_HOURS - elapsed) / (60 * 60 * 1000));
        console.log(`[DUPLICATE] Phone ${phone} already submitted ${Math.floor(elapsed / 60000)} min ago`);
        return {
          success: false,
          duplicate: true,
          message: `Aapne already form submit kiya hai. Please 24hr wait karein, our representative will connect with you.`,
        };
      }
    }

    // Mark this phone as submitted NOW
    recentLeads.set(phone, Date.now());

    return { success: true, duplicate: false, message: "" };
  });
