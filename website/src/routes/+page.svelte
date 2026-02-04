<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription,
	} from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import { Separator } from "$lib/components/ui/separator";
	import {
		Github,
		Package,
		Star,
		Download,
		Palette,
		Smartphone,
		Zap,
		Code,
		Image,
		QrCode,
		Share2,
		ExternalLink,
		Leaf,
		Command,
		Eye,
		CheckCircle2,
		ArrowRight,
		Sparkles,
		Copy,
		Check,
	} from "@lucide/svelte";

	import {
		Tooltip,
		TooltipContent,
		TooltipProvider,
		TooltipTrigger,
	} from "$lib/components/ui/tooltip";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	let copied = $state(false);

	const installCommand = "npx opentwig --init";

	function copyCommand() {
		navigator.clipboard.writeText(installCommand);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	const features = [
		{
			icon: Palette,
			title: "4 Beautiful Themes",
			description:
				"Choose from default, dark, minimal, and colorful themes. Each crafted with attention to detail.",
		},
		{
			icon: Smartphone,
			title: "Mobile First",
			description:
				"Perfectly responsive design that looks stunning on any device, from phones to desktops.",
		},
		{
			icon: Zap,
			title: "Lightning Fast",
			description:
				"Generates static HTML/CSS with zero JavaScript dependencies. Instant page loads.",
		},
		{
			icon: Eye,
			title: "Live Preview Mode",
			description:
				"Interactive editor with real-time preview. Edit config, see changes instantly.",
		},
		{
			icon: Image,
			title: "Social Previews",
			description:
				"Auto-generated Open Graph images for perfect sharing on social media platforms.",
		},
		{
			icon: QrCode,
			title: "QR Code Built-in",
			description:
				"Every page includes a QR code for easy mobile sharing and offline distribution.",
		},
	];

	const themes = [
		{
			name: "Default",
			description: "Clean & Modern",
			style: "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200",
		},
		{
			name: "Dark",
			description: "Elegant & Sophisticated",
			style: "bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700",
		},
		{
			name: "Minimal",
			description: "Simple & Focused",
			style: "bg-gradient-to-br from-gray-50 to-white border-gray-200",
		},
		{
			name: "Colorful",
			description: "Vibrant & Bold",
			style: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
		},
	];
</script>

<TooltipProvider>
	<div class="min-h-screen bg-background leaf-pattern">
		<!-- Navigation -->
		<nav
			class="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md"
		>
			<div
				class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
			>
				<div class="flex items-center gap-2">
					<Leaf class="h-6 w-6 text-primary" />
					<span class="text-xl font-bold tracking-tight"
						>OpenTwig</span
					>
				</div>
				<div class="flex items-center gap-4">
					<a
						href="https://github.com/tufantunc/opentwig"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						<Github class="h-4 w-4" />
						<span class="hidden sm:inline">GitHub</span>
					</a>
					<a
						href="https://www.npmjs.com/package/opentwig"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						<Package class="h-4 w-4" />
						<span class="hidden sm:inline">NPM</span>
					</a>
				</div>
			</div>
		</nav>

		<!-- Hero Section -->
		<section
			class="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-8"
		>
			<div class="mx-auto max-w-4xl text-center">
				<!-- Badge -->
				<div class="mb-8 flex justify-center">
					<Badge
						variant="secondary"
						class="gap-1.5 px-3 py-1.5 text-sm font-medium"
					>
						<Sparkles class="h-3.5 w-3.5" />
						<span>100% Free & Open Source</span>
					</Badge>
				</div>

				<!-- Headline -->
				<h1
					class="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
				>
					Create Your
					<span class="gradient-text">Link in Bio</span>
					Page
				</h1>

				<!-- Subheadline -->
				<p
					class="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl"
				>
					A beautiful, customizable link page generator that puts you
					in control. No third-party services. No tracking. Just you
					and your links.
				</p>

				<!-- CTAs -->
				<div
					class="flex flex-col items-center justify-center gap-4 sm:flex-row"
				>
					<Tooltip>
						<TooltipTrigger>
							<Button
								size="lg"
								class="gap-2 px-8"
								href="https://github.com/tufantunc/opentwig"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Github class="h-5 w-5" />
								<span>Star on GitHub</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Show your support!</p>
						</TooltipContent>
					</Tooltip>

					<Button
						variant="outline"
						size="lg"
						class="gap-2 px-8"
						href="#get-started"
					>
						<Command class="h-5 w-5" />
						<span>Get Started</span>
					</Button>
				</div>

				<!-- Stats Bar -->
				<div
					class="mt-16 grid grid-cols-2 gap-8 border-y border-border/50 py-8 sm:grid-cols-4"
				>
					<div class="text-center">
						<div
							class="flex items-center justify-center gap-1.5 text-3xl font-bold text-foreground"
						>
							<Download class="h-6 w-6 text-primary" />
							<span>{data.stats.formattedNpmDownloads}</span>
						</div>
						<p class="mt-1 text-sm text-muted-foreground">
							NPM Downloads
						</p>
					</div>
					<div class="text-center">
						<div
							class="flex items-center justify-center gap-1.5 text-3xl font-bold text-foreground"
						>
							<Star class="h-6 w-6 text-primary" />
							<span>{data.stats.formattedGithubStars}</span>
						</div>
						<p class="mt-1 text-sm text-muted-foreground">
							GitHub Stars
						</p>
					</div>
					<div class="text-center">
						<div
							class="flex items-center justify-center gap-1.5 text-3xl font-bold text-foreground"
						>
							<Palette class="h-6 w-6 text-primary" />
							<span>4</span>
						</div>
						<p class="mt-1 text-sm text-muted-foreground">Themes</p>
					</div>
					<div class="text-center">
						<div
							class="flex items-center justify-center gap-1.5 text-3xl font-bold text-foreground"
						>
							<CheckCircle2 class="h-6 w-6 text-primary" />
							<span>MIT</span>
						</div>
						<p class="mt-1 text-sm text-muted-foreground">
							License
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section id="features" class="px-4 py-20 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-7xl">
				<div class="mb-16 text-center">
					<h2
						class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
					>
						Everything You Need
					</h2>
					<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
						Powerful features packed into a simple CLI tool. No
						bloat, no dependencies, just results.
					</p>
				</div>

				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each features as feature}
						<Card
							class="group relative overflow-hidden transition-all hover:shadow-lg hover:border-primary/20"
						>
							<CardHeader>
								<div
									class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
								>
									<feature.icon class="h-6 w-6" />
								</div>
								<CardTitle class="text-xl"
									>{feature.title}</CardTitle
								>
								<CardDescription class="text-base">
									{feature.description}
								</CardDescription>
							</CardHeader>
						</Card>
					{/each}
				</div>
			</div>
		</section>

		<Separator class="mx-auto max-w-7xl" />

		<!-- Live Preview Demo Section -->
		<section class="px-4 py-20 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-7xl">
				<div class="mb-12 text-center">
					<h2
						class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
					>
						Live Preview Mode
					</h2>
					<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
						Edit your configuration in real-time with our built-in
						live editor. See changes instantly.
					</p>
				</div>

				<!-- Screenshot Placeholder -->
				<div class="relative mx-auto max-w-5xl">
					<div
						class="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
					>
						<!-- Browser Chrome -->
						<div
							class="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3"
						>
							<div class="flex gap-1.5">
								<div
									class="h-3 w-3 rounded-full bg-red-400"
								></div>
								<div
									class="h-3 w-3 rounded-full bg-yellow-400"
								></div>
								<div
									class="h-3 w-3 rounded-full bg-green-400"
								></div>
							</div>
							<div
								class="ml-4 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted-foreground"
							>
								localhost:3000
							</div>
						</div>

						<!-- Placeholder Content -->
						<div
							class="relative overflow-hidden rounded-lg border border-border bg-background shadow-2xl"
						>
							<img
								src="/live-editor.png"
								alt="OpenTwig Live Editor Interface"
								class="w-full h-auto object-cover"
								loading="lazy"
							/>
						</div>
					</div>

					<!-- Floating Features -->
					<div
						class="absolute -right-4 top-1/4 hidden lg:block animate-float"
					>
						<div
							class="rounded-xl border border-border bg-card p-4 shadow-lg"
						>
							<div class="flex items-center gap-2 text-sm">
								<Palette class="h-4 w-4 text-primary" />
								<span>Theme switcher</span>
							</div>
						</div>
					</div>

					<div
						class="absolute -left-4 bottom-1/4 hidden lg:block animate-float-delayed"
					>
						<div
							class="rounded-xl border border-border bg-card p-4 shadow-lg"
						>
							<div class="flex items-center gap-2 text-sm">
								<Eye class="h-4 w-4 text-primary" />
								<span>Live Preview</span>
							</div>
						</div>
					</div>

					<div
						class="absolute -right-4 bottom-8 hidden lg:block animate-float"
					>
						<div
							class="rounded-xl border border-border bg-card p-4 shadow-lg"
						>
							<div class="flex items-center gap-3">
								<div
									class="h-2 w-2 rounded-full bg-green-500 animate-pulse"
								></div>
								<span class="text-sm font-medium"
									>Auto-save enabled</span
								>
							</div>
						</div>
					</div>
				</div>

				<!-- Feature List -->
				<div class="mt-12 grid gap-6 sm:grid-cols-3">
					<div class="flex items-start gap-3">
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<CheckCircle2 class="h-4 w-4" />
						</div>
						<div>
							<h4 class="font-semibold text-foreground">
								Real-time Updates
							</h4>
							<p class="text-sm text-muted-foreground">
								See changes as you type with WebSocket-powered
								live reload
							</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<CheckCircle2 class="h-4 w-4" />
						</div>
						<div>
							<h4 class="font-semibold text-foreground">
								Drag & Drop
							</h4>
							<p class="text-sm text-muted-foreground">
								Easily reorder your links with intuitive drag
								and drop
							</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div
							class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<CheckCircle2 class="h-4 w-4" />
						</div>
						<div>
							<h4 class="font-semibold text-foreground">
								Avatar Upload
							</h4>
							<p class="text-sm text-muted-foreground">
								Upload and preview profile pictures directly in
								the editor
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<Separator class="mx-auto max-w-7xl" />

		<!-- Themes Showcase -->
		<section id="themes" class="px-4 py-20 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-7xl">
				<div class="mb-12 text-center">
					<h2
						class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
					>
						Choose Your Style
					</h2>
					<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
						Four carefully crafted themes to match your personality
						and brand.
					</p>
				</div>

				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{#each themes as theme}
						<Card
							class="group overflow-hidden transition-all hover:shadow-lg"
						>
							<!-- Theme Preview -->
							<div
								class="relative aspect-[4/3] overflow-hidden border-b"
							>
								<img
									src="/theme-{theme.name.toLowerCase()}.png"
									alt="{theme.name} theme preview"
									class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
									loading="lazy"
								/>
							</div>
							<CardHeader class="text-center">
								<CardTitle class="text-lg"
									>{theme.name}</CardTitle
								>
								<CardDescription
									>{theme.description}</CardDescription
								>
							</CardHeader>
						</Card>
					{/each}
				</div>

				<!-- Theme Preview Screenshots Row -->
				<div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{#each themes as theme, i}
						<div
							class="relative aspect-[9/16] overflow-hidden rounded-xl border border-border bg-card shadow-lg"
						>
							<img
								src="/theme-{theme.name.toLowerCase()}.png"
								alt="{theme.name} theme preview"
								class="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
								loading="lazy"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
							></div>
							<div
								class="absolute bottom-0 left-0 right-0 p-4 text-white"
							>
								<p class="text-sm font-semibold">
									{theme.name}
								</p>
								<p class="text-xs text-white/80">
									{theme.description}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<Separator class="mx-auto max-w-7xl" />

		<!-- Quick Start Section -->
		<section id="get-started" class="px-4 py-20 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl">
				<div class="mb-12 text-center">
					<h2
						class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
					>
						Get Started in Seconds
					</h2>
					<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
						No complex setup. Just run one command and you're ready
						to go.
					</p>
				</div>

				<!-- Installation Card -->
				<Card class="overflow-hidden">
					<CardHeader class="bg-muted/50">
						<CardTitle class="flex items-center gap-2 text-lg">
							<Command class="h-5 w-5 text-primary" />
							Installation
						</CardTitle>
					</CardHeader>
					<CardContent class="p-6">
						<div class="relative">
							<pre
								class="relative overflow-x-auto rounded-lg bg-[#1a3320] p-4 text-sm text-[#e8f0e8]"><code
									>{installCommand}</code
								></pre>
							<Button
								variant="ghost"
								size="sm"
								class="absolute right-2 top-2 gap-1.5 text-[#e8f0e8] hover:bg-[#2d4a35] hover:text-[#e8f0e8]"
								onclick={copyCommand}
							>
								{#if copied}
									<Check class="h-4 w-4" />
									<span>Copied!</span>
								{:else}
									<Copy class="h-4 w-4" />
									<span>Copy</span>
								{/if}
							</Button>
						</div>
					</CardContent>
				</Card>

				<!-- Steps -->
				<div class="mt-8 space-y-4">
					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold"
						>
							1
						</div>
						<div class="flex-1 pt-2">
							<h4 class="font-semibold text-foreground">
								Initialize your project
							</h4>
							<p class="text-sm text-muted-foreground">
								Run the command above to create a sample
								config.json file
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold"
						>
							2
						</div>
						<div class="flex-1 pt-2">
							<h4 class="font-semibold text-foreground">
								Edit your configuration
							</h4>
							<p class="text-sm text-muted-foreground">
								Customize your links, bio, theme, and avatar in
								config.json
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold"
						>
							3
						</div>
						<div class="flex-1 pt-2">
							<h4 class="font-semibold text-foreground">
								Generate your page
							</h4>
							<p class="text-sm text-muted-foreground">
								Run <code
									class="rounded bg-muted px-1.5 py-0.5 text-xs font-mono"
									>npx opentwig</code
								> to build your static site
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold"
						>
							4
						</div>
						<div class="flex-1 pt-2">
							<h4 class="font-semibold text-foreground">
								Deploy anywhere
							</h4>
							<p class="text-sm text-muted-foreground">
								Upload the dist/ folder to GitHub Pages,
								Netlify, Vercel, or any static host
							</p>
						</div>
					</div>
				</div>

				<!-- Live Mode CTA -->
				<Card class="mt-8 border-primary/20 bg-primary/5">
					<CardContent
						class="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left"
					>
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
						>
							<Zap class="h-6 w-6" />
						</div>
						<div class="flex-1">
							<h4 class="font-semibold text-foreground">
								Prefer a visual editor?
							</h4>
							<p class="text-sm text-muted-foreground">
								Use our live preview mode with real-time editing
								and auto-save
							</p>
						</div>
						<Button variant="outline" class="gap-2">
							<span>npx opentwig --live</span>
							<ArrowRight class="h-4 w-4" />
						</Button>
					</CardContent>
				</Card>
			</div>
		</section>

		<Separator class="mx-auto max-w-7xl" />

		<!-- Open Source Banner -->
		<section class="px-4 py-20 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-4xl text-center">
				<div
					class="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
				>
					<svg
						class="h-10 w-10 text-primary"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path
							d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
						/>
					</svg>
				</div>
				<h2
					class="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
				>
					Built with Love, Free Forever
				</h2>
				<p class="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
					OpenTwig is and always will be 100% free and open source. No
					hidden fees, no premium tiers, no tracking. Just a tool
					built by the community, for the community.
				</p>
				<div class="flex flex-wrap items-center justify-center gap-4">
					<Badge
						variant="secondary"
						class="gap-1.5 px-4 py-2 text-sm"
					>
						<CheckCircle2 class="h-4 w-4" />
						<span>MIT Licensed</span>
					</Badge>
					<Badge
						variant="secondary"
						class="gap-1.5 px-4 py-2 text-sm"
					>
						<CheckCircle2 class="h-4 w-4" />
						<span>No Tracking</span>
					</Badge>
					<Badge
						variant="secondary"
						class="gap-1.5 px-4 py-2 text-sm"
					>
						<CheckCircle2 class="h-4 w-4" />
						<span>No Vendor Lock-in</span>
					</Badge>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer
			class="border-t border-border bg-muted/30 px-4 py-12 sm:px-6 lg:px-8"
		>
			<div class="mx-auto max-w-7xl">
				<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div>
						<div class="flex items-center gap-2 mb-4">
							<Leaf class="h-5 w-5 text-primary" />
							<span class="font-bold">OpenTwig</span>
						</div>
						<p class="text-sm text-muted-foreground">
							Free and open source link in bio page generator.
						</p>
					</div>

					<div>
						<h4 class="mb-4 font-semibold text-foreground">
							Product
						</h4>
						<ul class="space-y-2 text-sm">
							<li>
								<a
									href="#features"
									class="text-muted-foreground transition-colors hover:text-foreground"
									>Features</a
								>
							</li>
							<li>
								<a
									href="#themes"
									class="text-muted-foreground transition-colors hover:text-foreground"
									>Themes</a
								>
							</li>
							<li>
								<a
									href="#get-started"
									class="text-muted-foreground transition-colors hover:text-foreground"
									>Documentation</a
								>
							</li>
						</ul>
					</div>

					<div>
						<h4 class="mb-4 font-semibold text-foreground">
							Resources
						</h4>
						<ul class="space-y-2 text-sm">
							<li>
								<a
									href="https://github.com/tufantunc/opentwig"
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
								>
									GitHub
									<ExternalLink class="h-3 w-3" />
								</a>
							</li>
							<li>
								<a
									href="https://www.npmjs.com/package/opentwig"
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
								>
									NPM Package
									<ExternalLink class="h-3 w-3" />
								</a>
							</li>
							<li>
								<a
									href="https://github.com/tufantunc/opentwig/issues"
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
								>
									Issues
									<ExternalLink class="h-3 w-3" />
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 class="mb-4 font-semibold text-foreground">
							Legal
						</h4>
						<ul class="space-y-2 text-sm">
							<li>
								<a
									href="https://github.com/tufantunc/opentwig/blob/main/LICENSE"
									target="_blank"
									rel="noopener noreferrer"
									class="text-muted-foreground transition-colors hover:text-foreground"
								>
									MIT License
								</a>
							</li>
							<li>
								<span class="text-muted-foreground"
									>© 2025 OpenTwig</span
								>
							</li>
						</ul>
					</div>
				</div>

				<Separator class="my-8" />

				<div
					class="flex flex-col items-center justify-between gap-4 sm:flex-row"
				>
					<p class="text-sm text-muted-foreground">
						Made with love for open source community
					</p>
					<div class="flex items-center gap-4">
						<a
							href="https://github.com/tufantunc/opentwig"
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground transition-colors hover:text-foreground"
						>
							<Github class="h-5 w-5" />
						</a>
						<a
							href="https://www.npmjs.com/package/opentwig"
							target="_blank"
							rel="noopener noreferrer"
							class="text-muted-foreground transition-colors hover:text-foreground"
						>
							<Package class="h-5 w-5" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	</div>
</TooltipProvider>
