// lib/data/googleReviews.js — the Google reviews offer page, one entry per niche.
// /google-reviews renders `general`; /google-reviews/[niche] renders every other key.
// Copy is v2d (landing-pages/gbp-reviews/v2d.html, fact check v2d-factcheck-2026-10-13.md).
// Shared facts live in SHARED and are the same on every niche: never re-cut a number per niche.
//
// To add electricians: copy the `jiu-jitsu` entry, key it `electricians`, re-cut the strings.
// Draft strings to start from: landing-pages/gbp-reviews/assets/uc.js, IND.electricians.
// The route, the form and the tracking pick the new key up with no other change.
//
// Wording rules (01-discovery, fact checks): maps and reviews "helped" (Q5); IH in % and counts only,
// no IH dollars (Q16); Vildan is he/him; no GST added; no ranking promise; no Google logos.

export const SHARED = {
  price: { monthly: 'A$97', setup: 'A$297', yearOne: 'A$1,164' },
  // Sources: 6× = 1 new client from Google search in the 90 days to 12 May 2026 (GHL) vs 8 from Google
  // search + his profile Jun to Sep 2026 (IH Sep report). Suburb counts 11 / 21 / 29 of 66: Sep report :222-224.
  ih: { mult: '6×', subs: [['Jun', 11], ['Jul', 21], ['Sep', 29]], of: 66 },
  // BrightLocal Local Consumer Review Survey 2026 (US, n=1,002).
  stats: [
    ['97%', 'read reviews before they pick a local business'],
    ['47%', 'skip you if you have fewer than 20 reviews'],
    ['68%', 'won\'t pick you under 4 stars'],
    ['74%', 'want reviews from the last 3 months'],
  ],
}

export const NICHES = {
  general: {
    niche: 'general',
    variant: 'general-v2d',
    path: '/google-reviews',
    title: 'Google Reviews, Handled',
    description: 'Get more Google reviews and more calls, without asking a customer yourself. A$97 a month, cancel any time.',
    customer: 'customer', customers: 'customers',
    eyebrow: 'For small business owners losing calls to the business above them',
    // Message match: meta-ads sessions/2026-10-13-ads-general.md keeps v2d's H1. Ads say "free 15-minute Google check".
    h1: 'Get more Google reviews and more calls, without asking a customer yourself.',
    reassure: 'A free 15-minute call. Luke shows you where your business sits on Google against the ones near you.',
    sub: 'Every customer gets a friendly ask. Every review gets a reply in 1 business day. Better maps and reviews helped Vildan get 6× more new clients from Google.',
    problemH2: 'People check your reviews, then call the business above you.',
    problemLede: 'If your phone is quieter than it should be, this is often why. Google shows three businesses on the map, and those three get seen first. If you have 4.2 stars from 11 reviews and they have 4.8 from many more, they get the call. You never hear about it.',
    mock: {
      search: 'plumber near me',
      chips: ['Open now', 'Top rated', 'Hours', 'Online booking'],
      rivals: [['Harbour Line Plumbing', '4.9', '212', 'Closes 5 pm'], ['Northgate Plumbing Co', '4.8', '96', 'Closes 6 pm'], ['Kestrel Plumbing', '4.9', '61', 'Open 24 hours']],
    },
    fixH2: 'Every customer gets asked and every review gets answered. You don\'t do any of it.',
    fixLede: '83% of people write a review when asked, and 89% expect the owner to reply. You give us access once. We do the rest.',
    tile1: { label: 'Every customer', h3: 'One text, one reminder. Your customers never feel nagged.' },
    sms: 'Hi Sam, thanks for choosing us today. Got a minute to share your experience on Google? It helps other locals find us.',
    trigger: 'when a job is done',
    review: { text: 'Turned up on time, fixed it fast and left the place clean. Would call again.', reply: 'Thanks Jess, really glad it\'s sorted. See you next time.' },
    bad: { text: 'Good result in the end, but they ran 40 minutes late and didn\'t call.', reply: 'Thanks for being honest, Chris. You\'re right, we should have called. Sorry for the wait.' },
    proofLede: 'His kinesiology clinic was quiet on Google. Better reviews and a higher spot on the map helped change that.',
    offerH2: 'Everything done for you, for less than one new customer a month.',
    inc: [
      ['More reviews, without you asking anyone', 'After a job, a visit or a set time. QR codes if you need them.'],
      ['Every review answered in 1 business day', 'Bad ones wait for your OK.'],
      ['A profile that looks busy and up to date', 'Fixed in week 1. New photos every month.'],
      ['No wrong hours or fake listings costing you calls', 'Checked every month.'],
      ['You can see it working', 'A short monthly report against your competitors. Your map against day 1 every 3 months.'],
    ],
    // 03-math.md §4: example default, labelled "Example, change it" on the page.
    calcValue: 300,
    faq: [
      ['Is the call just a sales pitch?', 'No. Luke looks at your Google profile with you and shows you where you sit on the map. If this won\'t help you, he\'ll tell you straight.'],
      ['My customers never leave reviews.', 'A lot of owners feel that way. Usually nobody asked them at the right time. 83% of people who are asked write a review. Vildan went from 42 to 58 reviews while we looked after his profile.'],
      ['What if someone leaves a bad review?', 'It happens to everyone. You hear about it first, with a calm reply ready, and nothing goes up until you OK it.'],
      ['Is this even allowed by Google?', 'Yes. Google says you can ask customers for reviews. Everyone gets asked the same way. We never pay for reviews, never ask for 5 stars and never write fake ones.'],
      ['How long until I see it working?', 'Your review asks start within 7 days, and new reviews can follow within weeks. The map takes longer. Vildan went from 11 to 29 of 66 searches in four months. Nobody honest can promise you the top 3, so we don\'t.'],
    ],
  },

  'jiu-jitsu': {
    niche: 'jiu-jitsu',
    variant: 'jiu-jitsu-v1',
    path: '/google-reviews/jiu-jitsu',
    title: 'Google Reviews for Gyms',
    description: 'More Google reviews for your gym, without asking a single member yourself. For jiu-jitsu, MMA and boxing gyms. A$97 a month, cancel any time.',
    customer: 'member', customers: 'members',
    eyebrow: 'For jiu-jitsu, MMA and boxing gym owners',
    // Message match, word for word: meta-ads sessions/2026-10-13-ads-jiu-jitsu.md "Message match". It drops
    // "more calls" (v2d fact check #6, an outcome claim) for the stricter ad setting.
    h1: 'More Google reviews for your gym, without asking a single member yourself.',
    sub: 'Every member gets a friendly text at the right time. Every review gets a reply within 1 business day. A$97 a month, cancel any time.',
    reassure: 'A free 15-minute call. Luke shows you where your gym sits on Google against the gyms near you.',
    problemH2: 'People check your reviews, then book a trial at the gym down the road.',
    problemLede: 'If your trial classes are quieter than they should be, this is often why. Google shows three gyms on the map, and those three get seen first. If you have 4.2 stars from 11 reviews and they have 4.8 from many more, they get the trial. You never hear about it.',
    mock: {
      search: 'bjj near me',
      chips: ['Open now', 'Top rated', 'Kids classes', 'Hours'],
      rivals: [['Ironbark Jiu-Jitsu', '4.9', '184', 'Closes 9 pm'], ['Northgate MMA', '4.8', '133', 'Closes 8:30 pm'], ['Kestrel Boxing Club', '4.9', '72', 'Closes 8 pm']],
    },
    fixH2: 'Every member gets asked and every review gets answered. You don\'t do any of it.',
    fixLede: '83% of people write a review when asked, and 89% expect the owner to reply. You give us access once. We do the rest.',
    tile1: { label: 'Every member', h3: 'One text at one month, one reminder. Your members never feel nagged.' },
    // Luke, 01-discovery Q3: "if someone has been at a gym for 1 month we send a review out and ask how they've been".
    sms: 'Hi Sam, you\'ve been training with us a month now. How\'s it going? If you\'ve got a minute, would you share your experience on Google?',
    trigger: 'when a member hits one month',
    review: { text: 'Great coaches and no egos on the mats. Did one trial class and signed up that week.', reply: 'Thanks Jess, so good to have you on the mats. See you at the next class.' },
    bad: { text: 'Good classes, but the timetable changed and nobody told me.', reply: 'Thanks for being honest, Chris. You\'re right, we should have told everyone. Sorry about that.' },
    proofLede: 'Vildan runs a kinesiology clinic, not a gym, and it was quiet on Google. Better reviews and a higher spot on the map helped change that. We\'d do the same for your gym.',
    offerH2: 'Everything done for you, for less than one new member a month.',
    inc: [
      ['More reviews, without you asking anyone', 'When a member hits one month, or a time that suits you. QR codes for the front desk if you need them.'],
      ['Every review answered in 1 business day', 'Bad ones wait for your OK.'],
      ['A profile that looks busy and up to date', 'Fixed in week 1. New photos from your classes every month.'],
      ['No wrong hours or fake listings costing you trials', 'Checked every month.'],
      ['You can see it working', 'A short monthly report against the gyms near you. Your map against day 1 every 3 months.'],
    ],
    // 03-math.md §4 "Gyms and studios": a member for a year at A$25 a week. Example only.
    calcValue: 1300,
    faq: [
      ['Is the call just a sales pitch?', 'No. Luke looks at your gym\'s Google profile with you and shows you where you sit on the map. If this won\'t help you, he\'ll tell you straight.'],
      ['My members never leave reviews.', 'A lot of gym owners feel that way. Usually nobody asked them at the right time. 83% of people who are asked write a review. Vildan went from 42 to 58 reviews while we looked after his profile.'],
      ['What if someone leaves a bad review?', 'It happens to every gym. You hear about it first, with a calm reply ready, and nothing goes up until you OK it.'],
      ['Is this even allowed by Google?', 'Yes. Google says you can ask members for reviews. Everyone gets asked the same way. We never pay for reviews, never ask for 5 stars and never write fake ones.'],
      ['How long until I see it working?', 'Your review asks start within 7 days, and new reviews can follow within weeks. The map takes longer. Vildan went from 11 to 29 of 66 searches in four months. Nobody honest can promise you the top 3, so we don\'t.'],
    ],
  },
}

export const NICHE_KEYS = Object.keys(NICHES).filter(k => k !== 'general')
