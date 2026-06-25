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

    // Send to Google Sheets Webhook
    const GOOGLE_SHEET_WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK;
    if (GOOGLE_SHEET_WEBHOOK) {
      try {
        const response = await fetch(GOOGLE_SHEET_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const resData = await response.json() as { status: string; message?: string };
          
          if (resData.status === "duplicate") {
            console.log(`[SHEET DUPLICATE] Phone ${phone} flagged as duplicate by Google Sheet`);
            // Update local memory cache too
            recentLeads.set(phone, Date.now());
            return {
              success: false,
              duplicate: true,
              message: resData.message || `Aapne already form submit kiya hai. Please 24hr wait karein, our representative will connect with you.`,
            };
          } else if (resData.status === "success") {
            console.log(`[SHEET SUCCESS] Lead saved successfully for ${phone}`);
            // Update local memory cache
            recentLeads.set(phone, Date.now());
            return { success: true, duplicate: false, message: "" };
          }
        }
      } catch (error) {
        console.error("Error sending to Google Sheet:", error);
        // Fallback to local success if sheet fails to avoid blocking users
      }
    } else {
      console.warn("GOOGLE_SHEET_WEBHOOK is not set in .env");
    }

    // Mark this phone as submitted NOW in local cache
    recentLeads.set(phone, Date.now());

    return { success: true, duplicate: false, message: "" };
  });
