export function createWelcomeEmailTemplate(name, clientURL) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Messenger</title>
</head>

<body style="
  margin:0;
  padding:40px 20px;
  background:#09090f;
  font-family: Inter,Segoe UI,Arial,sans-serif;
  color:#ffffff;
">

<div style="
  max-width:650px;
  margin:auto;
">

  <!-- Main Card -->
  <div style="
    background:linear-gradient(
      145deg,
      rgba(25,25,35,0.95),
      rgba(15,15,25,0.95)
    );
    border:1px solid rgba(255,255,255,0.08);
    border-radius:30px;
    overflow:hidden;
    box-shadow:
      0 0 40px rgba(91,134,229,0.15),
      0 0 80px rgba(54,209,220,0.08);
  ">

    <!-- Hero Section -->
    <div style="
      padding:60px 40px;
      text-align:center;
      background:
      radial-gradient(circle at top left,#36D1DC40,transparent 40%),
      radial-gradient(circle at top right,#8B5CF640,transparent 40%);
    ">

      <img
        src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
        alt="Messenger Logo"
        style="
          width:90px;
          height:90px;
          padding:18px;
          border-radius:24px;
          background:rgba(255,255,255,0.08);
          backdrop-filter:blur(10px);
          margin-bottom:25px;
        "
      />

      <h1 style="
        margin:0;
        font-size:42px;
        font-weight:800;
        letter-spacing:-1px;
        color:white;
      ">
        Welcome Aboard 🚀
      </h1>

      <p style="
        margin-top:18px;
        color:#a1a1aa;
        font-size:18px;
        line-height:1.7;
      ">
        Experience a new generation of communication with
        lightning-fast messaging and beautiful conversations.
      </p>

    </div>

    <!-- Content -->
    <div style="padding:0 40px 45px;">

      <p style="
        font-size:22px;
        font-weight:600;
        margin-bottom:25px;
      ">
        Hey ${name},
      </p>

      <p style="
        color:#cfcfd4;
        line-height:1.9;
        font-size:16px;
      ">
        We're thrilled to have you join Messenger.
        Connect instantly with people who matter, share moments,
        and collaborate effortlessly in a sleek and secure environment.
      </p>

      <!-- Features -->
      <div style="
        margin:35px 0;
        padding:25px;
        background:rgba(255,255,255,0.04);
        border:1px solid rgba(255,255,255,0.08);
        border-radius:20px;
      ">

        <h3 style="
          margin-top:0;
          margin-bottom:18px;
          color:#36D1DC;
        ">
          ✨ What's waiting for you
        </h3>

        <div style="margin-bottom:12px;">
          📸 Personalize your profile
        </div>

        <div style="margin-bottom:12px;">
          👥 Discover and connect with friends
        </div>

        <div style="margin-bottom:12px;">
          💬 Enjoy real-time conversations
        </div>

        <div>
          🚀 Share media instantly and securely
        </div>

      </div>

      <!-- CTA -->
      <div style="text-align:center; margin:45px 0;">

        <a
          href="${clientURL}"
          style="
            display:inline-block;
            text-decoration:none;
            padding:16px 42px;
            border-radius:999px;
            background:linear-gradient(
              135deg,
              #36D1DC,
              #5B86E5,
              #8B5CF6
            );
            color:white;
            font-size:16px;
            font-weight:700;
            box-shadow:
              0 0 25px rgba(91,134,229,0.5);
          "
        >
          Open Messenger →
        </a>

      </div>

      <!-- Quote Card -->
      <div style="
        padding:20px;
        border-radius:18px;
        background:rgba(54,209,220,0.05);
        border:1px solid rgba(54,209,220,0.15);
        text-align:center;
      ">
        <p style="
          margin:0;
          color:#d4d4d8;
          font-style:italic;
        ">
          "Every conversation begins with a single message."
        </p>
      </div>

      <p style="
        margin-top:35px;
        color:#cfcfd4;
      ">
        Need help? Our team is always here to assist.
      </p>

      <p style="
        color:white;
        font-weight:600;
      ">
        — The Messenger Team
      </p>

    </div>

  </div>

  <!-- Footer -->
  <div style="
    text-align:center;
    margin-top:25px;
    color:#71717a;
    font-size:13px;
  ">

    <p>© 2026 Messenger. All rights reserved.</p>

    <p>
      <a href="#" style="color:#36D1DC;text-decoration:none;">
        Privacy
      </a>
      &nbsp; • &nbsp;
      <a href="#" style="color:#36D1DC;text-decoration:none;">
        Terms
      </a>
      &nbsp; • &nbsp;
      <a href="#" style="color:#36D1DC;text-decoration:none;">
        Support
      </a>
    </p>

  </div>

</div>

</body>
</html>
`;
}
