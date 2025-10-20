import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Check,
  X,
  Link2,
  BarChart3,
  QrCode,
  ShieldCheck,
  Wand2,
  Globe,
  Clock,
  Tags,
  Sliders,
  Webhook,
  GitBranch,
  MousePointerClick,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Features() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-3 sm:px-6 lg:px-8 py-12 mt-20 sm:mt-24 md:mt-28 lg:mt-32 mb-16 sm:mb-20 md:mb-24 lg:mb-28 md:py-8">
      {/* Page header */}
      <header className="mb-12 text-center">
        <Badge className="mb-3" variant="secondary">
          Product
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light font-sans">
          Powerful features, simple workflow
        </h1>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-black/50 dark:text-white/60 max-w-2xl mx-auto">
          Shorten links, brand them, measure every click.
        </p>
      </header>

      {/* Category tabs */}
      <section className="mb-16">
        <Tabs defaultValue="sharing" className="w-full">
          <div className="relative">
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent rounded-l-xl" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent rounded-r-xl" />
            <TabsList className="styled-scrollbar overflow-x-auto scroll-smooth mask-fade-x w-full justify-start gap-2 rounded-xl border bg-background/50 p-1">
              <TabsTrigger value="sharing" className="whitespace-nowrap">
                Sharing
              </TabsTrigger>
              <TabsTrigger value="branding" className="whitespace-nowrap">
                Branding
              </TabsTrigger>
              <TabsTrigger value="analytics" className="whitespace-nowrap">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="security" className="whitespace-nowrap">
                Security
              </TabsTrigger>
              <TabsTrigger value="developer" className="whitespace-nowrap">
                Developer
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Sharing */}
          <TabsContent value="sharing" className="mt-6">
            <FeatureGrid
              items={[
                {
                  icon: Link2,
                  title: "1‑Click Shortening",
                  desc: "Paste a URL and get a clean short link instantly.",
                },
                {
                  icon: MousePointerClick,
                  title: "Smart Redirects",
                  desc: "Route users by device, geo, or time windows.",
                },
                {
                  icon: QrCode,
                  title: "QR Codes",
                  desc: "Generate branded, trackable QR codes in PNG.",
                },
              ]}
            />
          </TabsContent>

          {/* Branding */}
          <TabsContent value="branding" className="mt-6">
            <FeatureGrid
              items={[
                {
                  icon: Wand2,
                  title: "Custom Slugs",
                  desc: "Readable, on-brand slugs that your audience remembers.",
                },
                {
                  icon: Sliders,
                  title: "Link Preview Control",
                  desc: "Customize Open Graph title, description, and image.",
                },
              ]}
            />
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="mt-6">
            <FeatureGrid
              items={[
                {
                  icon: BarChart3,
                  title: "Clicks Data",
                  desc: "Monitor clicks as it happens across channels.",
                },
                {
                  icon: Clock,
                  title: "Time-boxed Reports",
                  desc: "Compare campaigns by day, week, or custom range.",
                },
                {
                  icon: Globe,
                  title: "Geo & Device",
                  desc: "See countries, devices, and referrers at a glance.",
                },
              ]}
            />
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="mt-6">
            <FeatureGrid
              items={[
                {
                  icon: X,
                  title: "Link Disable",
                  desc: "Kill links instantly if a campaign ends or a URL changes.",
                },
              ]}
            />
          </TabsContent>

          {/* Developer */}
          <TabsContent value="developer" className="mt-6">
            <FeatureGrid
              items={[
                {
                  icon: GitBranch,
                  title: "REST API",
                  desc: "Create, update, and manage links through dashboard.",
                },
              ]}
            />
          </TabsContent>
        </Tabs>
      </section>

      <Separator className="my-10" />

      {/* All features + sticky index */}
      <section className="mb-16 grid gap-8 md:grid-cols-4 md:items-start">
        <aside className="md:col-span-1 md:sticky md:top-24 self-start">
          <div className="rounded-xl border p-3">
            <p className="mb-2 text-sm font-medium">On this page</p>
            <nav className="grid gap-1 text-sm">
              <a
                href="#feature-sharing"
                className="rounded-lg px-2 py-1 hover:bg-muted"
              >
                Sharing
              </a>
              <a
                href="#feature-branding"
                className="rounded-lg px-2 py-1 hover:bg-muted"
              >
                Branding
              </a>
              <a
                href="#feature-analytics"
                className="rounded-lg px-2 py-1 hover:bg-muted"
              >
                Analytics
              </a>
            </nav>
          </div>
        </aside>

        <div className="md:col-span-3 grid gap-8">
          <FeatureList
            id="feature-sharing"
            title="Sharing"
            bullets={[
              "One‑click link shortening with instant copy button to clipboard.",
              "Smart redirects by device, country, or schedule.",
              "QR codes in PNG",
            ]}
          />
          <FeatureList
            id="feature-branding"
            title="Branding"
            bullets={[
              "Custom slugs to keep your brand front and center.",
              "Readable slugs for memorable, trustworthy links.",
            ]}
          />
          <FeatureList
            id="feature-analytics"
            title="Analytics"
            bullets={[
              "Click numbers with channel and referrer data.",
              "Device, geo, and time‑range breakdowns.",
            ]}
          />
        </div>
      </section>

      <Separator className="my-10" />

      {/* Comparison snapshot */}
      <section className="mb-16">
        <h2 className="text-center text-2xl sm:text-3xl font-light mb-6">
          Choose your plan
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <PlanCard
            label="Free"
            points={[
              "Unlimited basic shortening",
              "QR code generation",
              "Standard analytics",
              "1 user",
            ]}
            cta="Start free"
          />
          <PlanCard
            label="Pro"
            points={[
              "Custom domains & slugs",
              "Advanced analytics & UTM",
              "Smart redirects & webhooks",
              "Teams & roles",
            ]}
            cta="Upgrade now"
            highlight
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-20">
        <h2 className="text-center text-2xl sm:text-3xl font-light mb-6">
          Frequently asked questions
        </h2>
        <Accordion type="single" defaultValue="a1" collapsible className="mx-auto max-w-3xl">
          <AccordionItem value="a1">
            <AccordionTrigger>Is this a real product?</AccordionTrigger>
            <AccordionContent>
              No. “Notice: This is a demo application built solely for
              showcasing development skills. All data shown is fictitious and
              for illustrative purposes only.”
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="a2">
            <AccordionTrigger>Can I use my own domain?</AccordionTrigger>
            <AccordionContent>
              No. Connect your domain in settings and assign it to new links by
              default.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="a3">
            <AccordionTrigger>Do QR codes track scans?</AccordionTrigger>
            <AccordionContent>
              Yes. Scans appear alongside clicks with device and location
              insights.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="a4">
            <AccordionTrigger>Is there an API?</AccordionTrigger>
            <AccordionContent>
              Absolutely. Generate links, manage redirects, and subscribe to
              webhooks.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA */}
      <footer className="rounded-2xl border p-6 sm:p-8 flex flex-col items-center text-center">
        <h3 className="text-2xl sm:text-3xl font-light">
          Shorten links. Grow clicks.
        </h3>
        <p className="mt-2 text-black/50 dark:text-white/60">
          Create branded short links with real‑time analytics and QR codes—no
          credit card needed.
        </p>
        <div className="mt-4 flex gap-3">
          <Link to={"/dashboard"}>
            <Button size="lg">Shorten your first link</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Small composables ---------- */

function FeatureGrid({ items }) {
  return (
    <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <Card key={i} className="border rounded-xl">
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-background">
              <it.icon className="h-5 w-5" />
            </div>
            <CardTitle className="text-base sm:text-lg font-medium">
              {it.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-black/60 dark:text-white/60">
            {it.desc}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FeatureList({ id, title, bullets }) {
  return (
    <div id={id} className="rounded-xl border bg-background/50 p-5">
      <div className="mb-3 flex items-center gap-2">
        <h3 className="text-xl sm:text-2xl font-light">{title}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="outline">Details</Badge>
            </TooltipTrigger>
            <TooltipContent>Highlights and capabilities</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ul className="grid gap-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-500" />
            <span className="text-sm text-black/70 dark:text-white/70">
              {b}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanCard({ label, points, cta, highlight }) {
  return (
    <Card
      className={`rounded-2xl ${
        highlight ? "border-emerald-300 dark:border-emerald-700" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">{label}</CardTitle>
          {highlight && <Badge variant="secondary">Recommended</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-2">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              {highlight ? (
                <Check className="mt-0.5 h-4 w-4 text-emerald-500" />
              ) : (
                <Check className="mt-0.5 h-4 w-4 text-primary" />
              )}
              <span className="text-sm text-black/70 dark:text-white/70">
                {p}
              </span>
            </li>
          ))}
        </ul>
        <Button
          className="mt-5 w-full"
          variant={highlight ? "default" : "outline"}
        >
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}
