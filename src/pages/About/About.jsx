import { aboutData } from "./constants";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Globe, MapPin, Check } from "lucide-react";

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-3 sm:px-6 lg:px-8 mt-20 sm:mt-24 md:mt-28 lg:mt-32 mb-16 sm:mb-20 md:mb-24 lg:mb-28 md:py-8">
      {/* Specialty */}
      <section className="mb-12 grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-base font-medium">What I do</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {aboutData.specialty.stack.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-base font-medium">Style</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {aboutData.specialty.style.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-base font-medium">Focus</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {aboutData.specialty.focus.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Journey */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl sm:text-3xl font-light">
          Professional journey
        </h2>
        <Card className="rounded-2xl border">
          <CardContent className="p-5">
            <ol className="relative border-l pl-6">
              {aboutData.journey.map((j, i) => (
                <li key={i} className="mb-6 last:mb-0">
                  <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full border bg-background" />
                  <p className="text-xs uppercase tracking-wide text-black/50 dark:text-white/50">
                    {j.year}
                  </p>
                  <h3 className="mt-1 text-base sm:text-lg font-medium">
                    {j.title}
                    {j.org ? ` — ${j.org}` : ""}
                  </h3>
                  <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                    {j.summary}
                  </p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* Process */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl sm:text-3xl font-light">How I work</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {aboutData.process.map((p) => (
            <Card key={p.phase} className="rounded-2xl border">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  {p.phase}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="grid gap-2">
                  {p.points.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-black/70 dark:text-white/70"
                    >
                      <Check className="mt-0.5 h-4 w-4 text-emerald-500" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl sm:text-3xl font-light">Achievements</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutData.achievements.map((a, idx) => (
            <Card key={idx} className="rounded-2xl border">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  {a.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-black/70 dark:text-white/70">
                {a.detail}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl sm:text-3xl font-light">
          Skills & tech stack
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <SkillCard title="Expert" items={aboutData.skills.expert} />
          <SkillCard
            title="Intermediate"
            items={aboutData.skills.intermediate}
          />
          <SkillCard title="Learning" items={aboutData.skills.learning} />
        </div>
      </section>

      {/* Story */}
      <section className="mb-12">
        <h2 className="mb-3 text-2xl sm:text-3xl font-light">Personal story</h2>
        <Card className="rounded-2xl border">
          <CardContent className="p-5 text-sm sm:text-base text-black/70 dark:text-white/70">
            {aboutData.story}
          </CardContent>
        </Card>
      </section>

      {/* Values & Preferences */}
      <section className="mb-12 grid gap-4 md:grid-cols-2">
        <Card className="rounded-2xl border">
          <CardHeader>
            <CardTitle className="text-base font-medium">Values</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {aboutData.values.map((v) => (
                <Badge key={v} variant="outline">
                  {v}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        {aboutData.preferences && (
          <Card className="rounded-2xl border">
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Working preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {aboutData.preferences.map((p) => (
                  <Badge key={p} variant="secondary">
                    {p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Contact */}
      <section className="mb-4">
        <Separator className="my-8" />
        <div className="rounded-2xl border p-6 sm:p-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-light">
            Let’s build something useful
          </h3>
          <p className="mt-2 text-sm sm:text-base text-black/60 dark:text-white/60">
            Open to frontend or full‑stack internships and junior roles.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg">
              <a
                href={aboutData.contacts.github}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github-icon lucide-github mr-2 h-4 w-4"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={aboutData.contacts.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin mr-2 h-4 w-4"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>{" "}
                LinkedIn
              </a>
            </Button>
            {aboutData.contacts.website && (
              <Button asChild variant="outline" size="lg">
                <a
                  href={aboutData.contacts.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe className="mr-2 h-4 w-4" /> Portfolio
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function SkillCard({ title, items }) {
  return (
    <Card className="rounded-2xl border">
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {items.map((t) => (
            <Badge key={t} variant={title === "Expert" ? "default" : "outline"}>
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
