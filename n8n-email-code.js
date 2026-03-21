const raw = $input.first().json;
const contact = raw.body.contact;
const benchmark = raw.body.benchmark;

if (!contact || !benchmark) {
  throw new Error('Invalid payload: missing contact or benchmark');
}
if (!contact.email) {
  throw new Error('Invalid payload: missing contact email');
}

const firstName = (contact.full_name || '').split(' ')[0] || 'there';

const PILLAR_COPY = {
  customer_experience: {
    label: 'Customer Experience',
    headline: "A lead messaged you at 9pm. By morning they'd booked someone else.",
    fix: "We set up an instant response system that replies, qualifies, and books, while you sleep.",
  },
  sales: {
    label: 'Sales',
    headline: "Your best lead this month replied to your quote. Then went quiet. You followed up two weeks later.",
    fix: "We build a follow up sequence that stays on them for 30 days without you touching it.",
  },
  content_design: {
    label: 'Content & Design',
    headline: "You know you need to post. You just never have time to sit down and do it.",
    fix: "One piece of content gets turned into a week of posts, captions, and emails, automatically.",
  },
  personal_systems: {
    label: 'Personal Systems',
    headline: "You're running the business and doing the admin of a business. That's two full time jobs.",
    fix: "We take the second one off your plate, inbox, scheduling, meeting notes, reporting.",
  },
  finance: {
    label: 'Finance',
    headline: "You did the work. Getting paid for it is somehow still your problem.",
    fix: "Invoices go out the moment a job is marked complete. Overdue reminders run on autopilot.",
  },
};

const pillars = benchmark.pillars || {};
let biggestLeak = null;
let biggestLoss = 0;

for (const [key, pillar] of Object.entries(pillars)) {
  const loss = (pillar.hours_per_week || 0) * (benchmark.hourly_rate || 0) * 4.33;
  if (loss > biggestLoss && PILLAR_COPY[key]) {
    biggestLoss = loss;
    biggestLeak = { key, ...pillar, loss, copy: PILLAR_COPY[key] };
  }
}

const monthlyLoss = benchmark.total_monthly_loss || 0;
const yearlyLoss = monthlyLoss * 12;

function fmtMoney(n) {
  if (!n || n <= 0) return '$0';
  return '$' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const reportData = {
  n: contact.full_name,
  b: contact.business_name,
  i: benchmark.industry,
  r: benchmark.hourly_rate,
  p: pillars,
};
const encoded = encodeURIComponent(btoa(JSON.stringify(reportData)));
const reportUrl = 'https://www.undercurrentautomations.com/report?d=' + encoded;
const calUrl = 'https://cal.com/luke-marinovic-aqeosc/30min';

const leakBlock = biggestLeak ? `
  <div style="background: #f0f7f3; border: 1.5px solid #c8ddd0; border-radius: 14px; padding: 24px 28px; margin: 28px 0;">
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #6a9a7d; margin: 0 0 8px; font-weight: 600;">YOUR BIGGEST LEAK &mdash; ${biggestLeak.copy.label.toUpperCase()}</p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 700; color: #1a1a1a; margin: 0 0 12px; line-height: 1.5;">${biggestLeak.copy.headline}</p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #6b6b6b; margin: 0 0 14px; line-height: 1.6;">${biggestLeak.copy.fix}</p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #6a9a7d; font-weight: 600; margin: 0;">~${biggestLeak.hours_per_week} hrs/week &middot; ${fmtMoney(biggestLeak.loss)}/month</p>
  </div>
` : '';

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"></head>
<body style="margin: 0; padding: 0; background: #f5f2ed; font-family: Arial, Helvetica, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    <div style="background: #ffffff; border-radius: 18px; padding: 40px 32px;">

      <h1 style="font-family: Arial, Helvetica, sans-serif; font-size: 26px; font-weight: 700; color: #1a1a1a; margin: 0 0 12px; line-height: 1.3;">Hey ${firstName}, your audit results are ready.</h1>
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #6b6b6b; margin: 0 0 32px; line-height: 1.6;">We've finished analysing how <strong style="color: #1a1a1a;">${contact.business_name}</strong> is spending its time &mdash; and where that time is quietly costing you money.</p>

      <div style="background: #f7f7f7; border: 1px solid #e5e5e5; border-radius: 14px; padding: 28px 28px 24px; text-align: center;">
        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #888; margin: 0 0 8px; font-weight: 600;">ESTIMATED MONTHLY LOSS</p>
        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 42px; font-weight: 700; color: #a52a2a; margin: 0 0 4px; line-height: 1;">${fmtMoney(monthlyLoss)}</p>
        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #999; margin: 0 0 20px;">in unbilled time, missed leads & manual work</p>

        <div style="height: 1px; background: #e0e0e0; margin: 0 0 20px;"></div>

        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #888; margin: 0 0 8px; font-weight: 600;">THAT'S PER YEAR</p>
        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 42px; font-weight: 700; color: #a52a2a; margin: 0; line-height: 1;">${fmtMoney(yearlyLoss)}</p>
      </div>

      ${leakBlock}

      <div style="text-align: center; margin: 32px 0 16px;">
        <a href="${reportUrl}" style="display: inline-block; background: #8FAF9F; color: #ffffff; font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; padding: 18px 60px; border-radius: 9999px; text-decoration: none; letter-spacing: 0.01em; width: 80%; text-align: center;">View Your Full Report &rarr;</a>
      </div>

      <div style="text-align: center; margin: 0 0 8px;">
        <a href="${calUrl}" style="display: inline-block; background: transparent; color: #6a9a7d; font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 600; padding: 16px 60px; border-radius: 9999px; text-decoration: none; border: 1.5px solid #c8ddd0; width: 80%; text-align: center;">Book a Free Strategy Call</a>
      </div>

    </div>

    <div style="background: #1a1a1a; border-radius: 14px; padding: 28px 32px; margin-top: 16px;">
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 700; color: #ffffff; margin: 0 0 8px;">Undercurrent Automations</p>
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #888; margin: 0 0 4px;">You're receiving this because you completed the Undercurrent business audit.</p>
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #888; margin: 0;">&copy; 2026 Undercurrent Automations &middot; Australia</p>
    </div>
  </div>
</body>
</html>`;

return [{ json: {
  html,
  recipientEmail: contact.email,
  subjectLine: firstName + ", here's your business audit results",
} }];
