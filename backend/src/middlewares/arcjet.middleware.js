import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  // Implementation for Arcjet protection middleware
  try {
    const decision = await aj.protect(req);
    //     console.log("Decision:", decision);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res
          .status(403)
          .json({ message: "Access denied. Bot traffic is not allowed." });
      } else {
        return res.status(403).json({
          message:
            "Access denied. Your request was blocked by Arcjet protection.",
        });
      }
    }
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Access denied. Spoofed bot traffic is not allowed.",
      });
    }
    next();
  } catch (err) {
    console.error("Error in Arcjet protection middleware:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
