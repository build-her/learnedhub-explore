# Discover Content Guide — for Deborah

This covers the content needed for the Discover result screen. The
engine and UI are already built and working with placeholder text for
3 of 4 streams. This guide is about **replacing the placeholders with
real content** — no code changes needed on your end, just filling in
text in one file.

## Where it lives

`lib/discover-content.ts` — one object called `STREAM_CONTENT`, with
4 streams (`science`, `arts`, `commercial`, `technical`), each with 6
tabs. `science` is already done — use it as your template for tone,
length, and specificity. `arts`, `commercial`, and `technical` are
placeholders right now, clearly marked with `isPlaceholder: true`.

## What "real" means here — with the working example

Every tab has 3 fields: `headline`, `body`, `format`.

**`format` you can leave alone** — it's the interaction style (e.g.
"Data scroll with live stats"), already decided, same across all 4
streams. You only need to write `headline` and `body`.

**`headline`** — one short, specific sentence. Not "Why this matters"
— that's generic. Science's is *"Why Nigeria needs you in science"* —
specific to the stream, has a point of view.

**`body`** — 2–4 sentences, and this is the part that needs real
sourcing, not just good writing. Compare:

- ❌ Generic: "Nigeria needs more skilled workers in this field."
- ✅ Like Science's real entry: *"Nigeria produces fewer than 12
  doctors per 100,000 people — the WHO minimum is 23."* — a specific,
  checkable number, with its source implied (WHO).

If you can't find a real number or fact for a tab, it's better to
write something true but less quantified than to invent a plausible-
sounding statistic. Nothing here should be a number nobody could trace
back to a source if a school administrator asked.

## The 6 tabs, what each one is actually asking for

1. **Foundation** — What does this stream actually cover academically
   in the Nigerian SSCE system? Which subjects, which WAEC/JAMB
   combination, which university faculties does it feed into?

2. **Societal Impact** — Why does Nigeria specifically need more people
   in this field? One real, sourced stat or fact, like the doctor-ratio
   example.

3. **Evolution** — How has this field changed, roughly 1960 to now,
   and where's it heading by 2040? Doesn't need to be exhaustive — 2-3
   real inflection points.

4. **Job Roles** — 4-5 *real, specific* job titles a student could
   picture themselves doing. Not "many career options" — actual titles,
   like Science's "Clinical pharmacist, Petroleum geologist, Software
   engineer, Agricultural scientist, Public health officer."

5. **Future with AI** — Plainly: what does AI replace, what does it
   assist, what does it create, specifically for this stream. Avoid
   both extremes ("AI will take all these jobs" / "AI won't affect
   this at all") — the honest answer is usually narrower than both.

6. **Redemptive Impact** — A single reflection prompt inviting the
   student to connect the stream to someone in their own life. Science's
   is: *"Write one sentence about who in your community you could help
   with a science career."* Keep the same structure, reworded for the
   stream.

## When you're done with one stream

Open `lib/discover-content.ts`, find that stream's block, replace the
`headline` and `body` text for each of the 6 tabs, and change
`isPlaceholder: true` to `isPlaceholder: false`. That's it — the
placeholder banner disappears from the screen automatically once you
do that.

## Quiz scoring — now resolved, for reference

Earlier drafts of the quiz had some answer options that didn't cleanly
map to one stream (e.g. "Doctor/Nurse" and "Engineer/Architect" were
separate options but both meant Science). That's been fixed — every
one of the 16 answers (4 questions × 4 options) now maps to exactly
one stream. Still worth a product read-through of `lib/discover-quiz.ts`
at some point since the wording choices were my best judgment, not a
validated instrument, but it's no longer a known-broken area.